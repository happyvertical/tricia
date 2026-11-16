// Regenerates the README screenshots from a running smrt app shell.
// See README.md in this folder for the full steps.
import { mkdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const here = dirname(fileURLToPath(import.meta.url));
const appUrl = (process.env.APP_URL ?? 'http://127.0.0.1:4796').replace(/\/$/, '');
// The script writes seed data into the app, so it only talks to a local app unless told otherwise.
const { hostname } = new URL(appUrl);
if (
  !['localhost', '127.0.0.1', '[::1]'].includes(hostname) &&
  process.env.ALLOW_REMOTE_APP !== '1'
) {
  console.error(
    `Refusing to seed ${hostname}: APP_URL must be localhost or 127.0.0.1. ` +
      'Set ALLOW_REMOTE_APP=1 only for a throwaway app that you own.',
  );
  process.exit(1);
}
const outDir = process.env.OUT_DIR ?? join(here, '../../docs/screenshots');
const only = process.env.ONLY?.split(',');

// The one-time owner setup link: pass it as SETUP_URL, or point STATE_DIR at the app's state
// folder (the "state" path that `smrt app doctor` prints) and it is read from there.
async function readSetupUrl() {
  if (process.env.SETUP_URL) return process.env.SETUP_URL;
  if (!process.env.STATE_DIR) return undefined;
  const html = await readFile(join(process.env.STATE_DIR, 'onboarding-launch.html'), 'utf8');
  return html.replaceAll('&amp;', '&').match(/https?:\/\/[^"'\s<>]*\/setup\?token=[\w%.-]+/)?.[0];
}
const setupUrl = await readSetupUrl();

if (!setupUrl) {
  console.error('Set SETUP_URL (or STATE_DIR) for a freshly set up app. See README.md.');
  process.exit(1);
}

const seed = JSON.parse(await readFile(join(here, 'seed.json'), 'utf8'));
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
  colorScheme: 'light',
  reducedMotion: 'reduce',
});
const page = await context.newPage();

async function api(method, path, body) {
  return page.evaluate(
    async ({ method, path, body }) => {
      const res = await fetch(path, {
        method,
        headers: { 'content-type': 'application/json' },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      return { status: res.status, body: await res.json().catch(() => null) };
    },
    { method, path, body },
  );
}

async function shot(name, fn) {
  if (only && !only.includes(name)) return;
  if (fn) await fn();
  await page.waitForTimeout(400);
  await page.screenshot({ path: join(outDir, `${name}.png`) });
  console.log('wrote', `${name}.png`);
}

// 1. Owner setup with an invented owner, then skip connecting an AI.
await page.goto(setupUrl);
await page.getByRole('textbox').first().fill('Alex Example');
await page.locator('input[type=email]').fill('alex@example.com');
await page.locator('button[type=submit]').click();
await page.waitForURL('**/welcome');
await page.getByRole('button', { name: 'Skip for now' }).click({ timeout: 15000 });
await page.waitForURL(`${appUrl}/`);

// 2. Seed an invented bakery with orders, a calculated total and two reports.
const imported = await api('POST', '/api/apps/importTemplate', { data: seed.data });
console.log('import', imported.status);
await page.goto(`${appUrl}/`);

// The assistant dock is open on first run. Hide it for the data screens, show it where it matters.
async function dock(open) {
  const isOpen = (await page.getByRole('button', { name: 'New chat' }).count()) > 0;
  if (isOpen !== open)
    await page.getByRole('button', { name: 'Assistant', exact: true }).first().click();
  await page.waitForTimeout(300);
}

await shot('01-home', () => dock(true));

await dock(false);
await shot('02-orders-list', () => page.goto(`${appUrl}/m/Order`));

await shot('03-order-form', async () => {
  const { body } = await api('GET', '/api/shell/records/Order?limit=1');
  await page.goto(`${appUrl}/m/Order/${body.records[0].id}`);
});

await shot('04-report', () => page.goto(`${appUrl}/reports/salesByCustomer`));

// Draft: change the app in a test copy, review it, publish it.
await page.goto(`${appUrl}/m/Customer`);
await page.getByRole('button', { name: 'Start draft' }).click();
await page.getByRole('link', { name: 'Review and publish' }).waitFor();
await api('POST', '/api/apps/addField?target=draft', {
  model: 'Customer',
  field: 'phone',
  definition: { type: 'text', label: 'Phone' },
});
await api('POST', '/api/apps/addField?target=draft', {
  model: 'Order',
  field: 'dueDate',
  definition: { type: 'date', label: 'Due date' },
});
await shot('05-draft-review', async () => {
  await page.goto(`${appUrl}/draft/review`);
  await page.waitForTimeout(800);
});
// Publishing is a risky change, so it waits in Approvals until the owner approves it.
await page
  .getByRole('button', { name: /^Publish/ })
  .first()
  .click();
await page.waitForTimeout(1500);
await shot('06-approval', () => page.goto(`${appUrl}/approvals`));
await page
  .locator('button:visible', { hasText: /^Approve$/ })
  .first()
  .click();
await page.waitForTimeout(2500);

// The published changes are now in the history, each with an undo.
await shot('07-history', () => page.goto(`${appUrl}/history`));

await browser.close();

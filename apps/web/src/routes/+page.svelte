<script lang="ts">
  import Sketch from '../lib/Sketch.svelte';

  const repo = 'https://github.com/happyvertical/tricia';
  const smrt = 'https://github.com/happyvertical/smrt';
</script>

<svelte:head>
  <title>Tricia: an app that builds itself from your spreadsheets (in development)</title>
  <meta
    name="description"
    content="Tricia is an open source desktop app for one person. She is being built to turn the spreadsheets a business runs on into an app, one conversation at a time. In development: not released yet, nothing to download."
  />
</svelte:head>

<a class="skip" href="#main">Skip to content</a>

<header class="top">
  <div class="wrap bar">
    <span class="mark">Tricia</span>
    <a href={repo}>Source on GitHub</a>
  </div>
</header>

<main id="main">
  <section class="hero">
    <div class="wrap">
      <h1>Tricia builds herself from the spreadsheets you already run on.</h1>
      <p class="lede">
        That is what she is being built to do. You say what you want in plain words, she makes the
        change, and you approve anything risky.
      </p>
      <p class="status">
        <strong>Not released yet.</strong> There is nothing to download today. Spreadsheet import is
        still being built.
      </p>
    </div>
  </section>

  <section class="band" aria-labelledby="sketch-h">
    <div class="wrap">
      <h2 id="sketch-h">The idea in four pictures</h2>
      <Sketch />
    </div>
  </section>

  <section class="wrap prose" aria-labelledby="what-h">
    <h2 id="what-h">What Tricia is</h2>
    <p>
      A desktop app for one person: the owner. It holds the lists, fields and screens a small
      business needs, and the owner shapes them by talking to a built-in assistant instead of
      learning database tools.
    </p>
    <p>
      She is for someone whose business lives in spreadsheets and who wants real forms and reports
      without hiring a developer.
    </p>
  </section>

  <section class="wrap prose" aria-labelledby="how-h">
    <h2 id="how-h">How it works</h2>
    <ol class="steps">
      <li>
        <h3>Start from your spreadsheets</h3>
        <p>
          Give Tricia a workbook. She is being built to make the database from it and load the data.
          <em>Not available yet.</em>
        </p>
      </li>
      <li>
        <h3>Talk to the assistant</h3>
        <p>
          Ask for a new list, a new field or a changed screen. The assistant makes the change.
          Building and changing an app this way is already how the underlying app shell works.
        </p>
      </li>
      <li>
        <h3>Approve risky changes</h3>
        <p>
          Changes that could lose or overwrite data wait until you press Approve. The assistant
          does not get to decide that.
        </p>
      </li>
      <li>
        <h3>Undo</h3>
        <p>Changes are versioned and can usually be undone.</p>
      </li>
    </ol>
    <p>
      So Tricia builds herself, but you steer. Risky changes wait for your approval.
    </p>
  </section>

  <section class="wrap prose" aria-labelledby="yours-h">
    <h2 id="yours-h">Your data, your AI account</h2>
    <ul>
      <li>Your data stays in a local database on your own machine.</li>
      <li>
        The assistant runs on your own AI account: your Claude Code or ChatGPT plan, or an API
        key from Anthropic, OpenAI or Gemini. Tricia does not supply one.
      </li>
      <li>
        What the assistant needs to answer you, including your data, goes to the AI provider you
        chose.
      </li>
    </ul>
  </section>

  <section class="band" aria-labelledby="status-h">
    <div class="wrap">
      <h2 id="status-h">Where things stand</h2>
      <div class="cols">
        <div>
          <h3>Works in the app shell today</h3>
          <ul>
            <li>Building and changing lists and fields by conversation</li>
            <li>Approval for risky changes</li>
            <li>Versioned changes, and undo</li>
          </ul>
        </div>
        <div>
          <h3>Being built for Tricia</h3>
          <ul>
            <li>Spreadsheet import. It is required before Tricia ships.</li>
            <li>Calculated fields</li>
            <li>Reports</li>
            <li>Loading data in bulk</li>
          </ul>
        </div>
        <div>
          <h3>Not there yet</h3>
          <ul>
            <li>A release or an installer</li>
            <li>macOS and Linux only so far</li>
            <li>Optional cloud services are planned</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="wrap prose" aria-labelledby="open-h">
    <h2 id="open-h">Open source, built on smrt</h2>
    <p>
      Tricia is open source. She is the
      <a href={smrt}>smrt</a> app shell with its built-in assistant, packaged as a desktop app. The
      shared code lives in smrt, so what improves there improves Tricia.
    </p>
    <p>
      <a href={repo}>Tricia on GitHub</a> is where releases and the update feed will appear when
      there is something to release.
    </p>
  </section>
</main>

<footer class="foot">
  <div class="wrap">
    <p>
      Tricia by HappyVertical. This page has no trackers, analytics or sign-up form. The wording is
      a draft.
    </p>
  </div>
</footer>

<style>
  .wrap {
    width: min(100% - 2rem, 62rem);
    margin-inline: auto;
  }
  .skip {
    position: absolute;
    left: 1rem;
    top: -4rem;
    background: var(--ink);
    color: var(--bg);
    padding: 0.5rem 0.9rem;
    z-index: 10;
  }
  .skip:focus {
    top: 0.5rem;
  }
  .top {
    padding-block: 1rem;
  }
  .bar {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
  }
  .mark {
    font-family: var(--serif);
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: 0.01em;
  }

  .hero {
    padding-block: clamp(2rem, 7vw, 5rem) clamp(2.5rem, 6vw, 4rem);
    background-image:
      linear-gradient(var(--grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid) 1px, transparent 1px);
    background-size: 2rem 2rem;
    border-block: 1px solid var(--rule);
  }
  h1 {
    font-family: var(--serif);
    font-size: clamp(2.1rem, 6.5vw, 4rem);
    line-height: 1.08;
    letter-spacing: -0.015em;
    margin: 0 0 1.25rem;
    max-width: 18ch;
    text-wrap: balance;
  }
  .lede {
    font-size: clamp(1.1rem, 2.6vw, 1.35rem);
    max-width: 38rem;
    margin: 0 0 1.25rem;
  }
  .status {
    display: inline-block;
    margin: 0;
    padding: 0.6rem 0.9rem;
    max-width: 38rem;
    background: var(--mark);
    color: var(--mark-ink);
    border-left: 4px solid var(--mark-edge);
  }

  h2 {
    font-family: var(--serif);
    font-size: clamp(1.5rem, 4vw, 2rem);
    line-height: 1.2;
    margin: 0 0 1rem;
  }
  h3 {
    font-size: 1.05rem;
    margin: 0 0 0.35rem;
  }
  .band {
    padding-block: clamp(2rem, 5vw, 3.5rem);
    background: var(--paper);
    border-bottom: 1px solid var(--rule);
  }
  .prose {
    padding-block: clamp(1.75rem, 4vw, 2.75rem);
  }
  .prose > p,
  .prose > ul {
    max-width: 40rem;
  }
  .prose p {
    margin: 0 0 1rem;
  }
  .steps {
    list-style: none;
    margin: 0 0 1.25rem;
    padding: 0;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
    counter-reset: step;
  }
  .steps li {
    counter-increment: step;
    border-top: 3px solid var(--ink);
    padding-top: 0.6rem;
  }
  .steps li::before {
    content: counter(step);
    font-family: var(--mono);
    color: var(--accent);
    font-weight: 700;
  }
  .steps p {
    margin: 0;
    font-size: 0.98rem;
  }
  .cols {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  }
  .cols ul {
    margin: 0;
    padding-left: 1.2rem;
  }
  .foot {
    padding-block: 2rem;
    color: var(--muted);
    font-size: 0.92rem;
  }
  .foot p {
    margin: 0;
  }
</style>

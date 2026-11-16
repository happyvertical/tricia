<svelte:head>
  <title>Download Tricia (not released yet)</title>
  <meta
    name="description"
    content="There is no Tricia installer yet. This page explains what exists today and how to run the app shell Tricia is built on from source."
  />
</svelte:head>

<main id="main" class="wrap page">
  <h1>Download</h1>

  <p class="note">
    <strong>There is nothing to download yet.</strong> Tricia has no release and no installer.
    Signing is not done. When a signed release exists, this page will list installers for each
    platform. Only macOS and Linux are planned so far.
  </p>

  <h2 id="run">Run the app shell from source</h2>
  <p>
    Tricia is the <a href="https://github.com/happyvertical/smrt">smrt</a> app shell with its
    built-in assistant, packaged as a desktop app. You can run the app shell today. It is not
    branded Tricia yet, and spreadsheet import is not in it. You build it yourself, and that takes a
    while.
  </p>
  <p>You need Node 26, pnpm 11 and git. The commands below use smrt release 0.62.0.</p>

  <h3>Build</h3>
  <pre><code>git clone https://github.com/happyvertical/smrt
cd smrt
git checkout v0.62.0
pnpm install
pnpm turbo run build \
  --filter='@happyvertical/smrt-app-shell...' \
  --filter='@happyvertical/smrt-cli...' \
  --filter='@happyvertical/smrt-app-cli...'</code></pre>

  <h3>Set up and start</h3>
  <p>
    Choose a new, empty folder outside the checkout for your data, and make it private to you
    (<code>chmod 700</code>). Use the same <code>PORT</code> for setup and start.
  </p>
  <pre><code>cd packages/app-shell
export SMRT_DATA_DIR=/path/to/your/private/data-folder
export PORT=4796 HOST=127.0.0.1 ORIGIN=http://127.0.0.1:4796
node ../cli/bin/smrt.js app setup
node build</code></pre>
  <p>In a second terminal, with the same variables set, open the one-time setup link:</p>
  <pre><code>node ../cli/bin/smrt.js app open</code></pre>
  <p>
    The link works once, on this computer only. Do not share it. Create the owner and follow the
    welcome steps. The <a href="/docs/#start">getting started</a> page shows what you will see.
  </p>

  <h2 id="later">When a release exists</h2>
  <p>
    Releases and the update feed will be published on
    <a href="https://github.com/happyvertical/tricia/releases">GitHub</a>. Optional cloud services
    are planned and not built.
  </p>
</main>

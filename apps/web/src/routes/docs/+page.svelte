<svelte:head>
  <title>Tricia documentation</title>
  <meta
    name="description"
    content="How the Tricia app shell works today: getting started, drafts and publishing, the assistant, approvals and undo, calculated fields and reports."
  />
</svelte:head>

<main id="main" class="wrap page">
  <h1>Documentation</h1>
  <p>
    This describes the app shell that Tricia is built on, as it works today. Tricia has no release
    yet, and spreadsheet import is not in it. The screenshots in the
    <a href="https://github.com/happyvertical/tricia#readme">README</a> show the same screens.
  </p>

  <nav aria-label="On this page">
    <ul class="toc">
      <li><a href="#start">Getting started</a></li>
      <li><a href="#import">Importing a spreadsheet</a></li>
      <li><a href="#draft">Reviewing and publishing</a></li>
      <li><a href="#assistant">Changing your app with the assistant</a></li>
      <li><a href="#approvals">Approvals and undo</a></li>
      <li><a href="#calculated">Calculated fields</a></li>
      <li><a href="#reports">Reports</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
  </nav>

  <h2 id="start">Getting started</h2>
  <p>
    There is no installer yet. To run the app shell yourself, follow the steps on the
    <a href="/download/#run">download page</a>. Then:
  </p>
  <ol>
    <li>Open the one-time setup link and enter your name and email to create the owner. You are the only user.</li>
    <li>
      The welcome page asks you to connect an AI: Claude Code, a ChatGPT sign-in, Codex, or an API
      key under Advanced. You can skip it. Without one the assistant stays off, and the rest of the
      app works.
    </li>
    <li>
      A new app is empty. Ask the assistant to build what you need. That needs the AI connection
      from the previous step.
    </li>
  </ol>
  <p>
    Your data is stored in a local database in the data folder you chose when you set the app up.
  </p>

  <h2 id="import">Importing a spreadsheet</h2>
  <p>
    <strong>Not available yet.</strong> Building an app from a spreadsheet is what Tricia is being
    built for, and it is required before she ships. When it is released, this section will explain
    how to choose a workbook, review the app Tricia proposes, and what the size limits are.
  </p>

  <h2 id="draft">Reviewing and publishing</h2>
  <p>
    <strong>Start draft</strong> makes a test copy of your app. Changes you make in the draft do not
    touch the live app. Use the <strong>Live</strong> and <strong>Draft</strong> switch at the top to
    move between them.
  </p>
  <p>
    <strong>Review and publish</strong> lists what the draft would add, remove, change and archive.
    Publishing is a risky change, so it waits for your approval (see below). Records you add in a
    draft are thrown away when you publish. <strong>Discard</strong> drops the draft.
  </p>

  <h2 id="assistant">Changing your app with the assistant</h2>
  <p>
    The assistant sits beside your app. You ask in plain words, for example for a new list or a new
    field, and it makes the change. It runs on your own AI account, so it needs the connection from
    the welcome page. While a draft is open it shows <em>Building in draft</em>.
  </p>

  <h2 id="approvals">Approvals and undo</h2>
  <p>
    Risky changes wait on the <strong>Approvals</strong> page until you press <strong>Approve</strong>
    or <strong>Deny</strong>. Each card says what would change. Removing a field, changing a
    field's type, deleting a record and publishing a draft are all risky.
  </p>
  <p>
    The <strong>History</strong> page lists every change to your app, newest first. You can undo
    the latest change from there with <strong>Undo this change</strong>. When a field is removed its stored values are archived, and undo
    restores them until old archives are cleaned up.
  </p>

  <h2 id="calculated">Calculated fields</h2>
  <p>
    A calculated field works out its value from other fields in the same list, for example
    <em>Total</em> as <em>Quantity × Unit price</em>. It is marked <em>calculated</em> on the form,
    shows its formula, and cannot be edited by hand. You can use it in reports.
  </p>

  <h2 id="reports">Reports</h2>
  <p>
    Reports appear under <strong>Reports</strong> in the menu. A report shows totals from a list,
    grouped by something such as a customer or a month. Switch between <strong>Chart</strong> and
    <strong>Table</strong>, choose <strong>Run again</strong> to refresh it, or
    <strong>Download CSV</strong>.
  </p>

  <h2 id="faq">FAQ</h2>
  <h3>Can I download Tricia?</h3>
  <p>No. There is no release or installer yet. See the <a href="/download/">download page</a>.</p>
  <h3>Where is my data?</h3>
  <p>In a local database on your own computer, in the data folder you chose.</p>
  <h3>Whose AI account does the assistant use?</h3>
  <p>
    Yours. Tricia does not supply one. What the assistant needs to answer you, including your data,
    goes to the AI provider you chose.
  </p>
  <h3>Do I need an AI account to use the app?</h3>
  <p>
    No. Without one the assistant is off, and you can still use your lists, forms and reports.
  </p>
  <h3>Which systems does it run on?</h3>
  <p>macOS and Linux only so far.</p>
  <h3>Are there cloud services?</h3>
  <p>Optional cloud services are planned. None are built.</p>
</main>

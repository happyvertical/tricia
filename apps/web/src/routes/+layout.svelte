<script lang="ts">
  import '../app.css';

  let { children } = $props();

  const repo = 'https://github.com/happyvertical/tricia';
</script>

<a class="skip" href="#main">Skip to content</a>

<header class="top">
  <div class="wrap bar">
    <a class="mark" href="/">Tricia</a>
    <nav aria-label="Site">
      <a href="/download/">Download</a>
      <a href="/docs/">Documentation</a>
      <a href={repo}>Source on GitHub</a>
    </nav>
  </div>
</header>

{@render children()}

<footer class="foot">
  <div class="wrap">
    <p>Tricia by HappyVertical. This site has no trackers, analytics or sign-up form.</p>
  </div>
</footer>

<style>
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
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem 1rem;
  }
  .mark {
    font-family: var(--serif);
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: var(--ink);
    text-decoration: none;
  }
  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1.25rem;
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

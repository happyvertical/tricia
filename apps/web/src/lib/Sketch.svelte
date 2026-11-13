<script lang="ts">
  import { onMount } from 'svelte';

  const frames = [
    { id: 'sheet', tab: 'Spreadsheet', title: 'You start with a spreadsheet' },
    { id: 'list', tab: 'List', title: 'It becomes a list with typed fields' },
    { id: 'ask', tab: 'Ask', title: 'You type a request' },
    { id: 'approve', tab: 'Approve', title: 'You approve the risky part' },
  ] as const;

  const STEP_MS = 4600;

  // Without script, or with reduced motion, all four frames are shown at once.
  let mode = $state<'all' | 'player'>('all');
  let step = $state(0);
  let paused = $state(false);
  let hovering = $state(false);
  let timer: ReturnType<typeof setInterval> | undefined;

  function stop() {
    if (timer) clearInterval(timer);
    timer = undefined;
  }

  function start() {
    stop();
    timer = setInterval(() => {
      if (!paused && !hovering) step = (step + 1) % frames.length;
    }, STEP_MS);
  }

  onMount(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      if (query.matches) {
        stop();
        mode = 'all';
      } else {
        mode = 'player';
        start();
      }
    };
    apply();
    query.addEventListener('change', apply);
    return () => {
      query.removeEventListener('change', apply);
      stop();
    };
  });

  function go(i: number) {
    step = i;
    paused = true;
  }
</script>

<section
  class="sketch"
  data-mode={mode}
  aria-label="Illustration: a spreadsheet becomes an app"
  onmouseenter={() => (hovering = true)}
  onmouseleave={() => (hovering = false)}
>
  <p class="note">
    An illustration of the idea, made of plain HTML. It is not a recording of the product, and the
    spreadsheet step is not built yet.
  </p>

  {#if mode === 'player'}
    <div class="controls">
      <ol class="tabs">
        {#each frames as f, i (f.id)}
          <li>
            <button type="button" aria-pressed={step === i} onclick={() => go(i)}>
              <span class="n">{i + 1}</span>{f.tab}
            </button>
          </li>
        {/each}
      </ol>
      <button type="button" class="pause" onclick={() => (paused = !paused)}>
        {paused ? 'Play' : 'Pause'}
      </button>
    </div>
  {/if}

  <div class="stage">
    {#each frames as f, i (f.id)}
      <figure class="frame" data-active={mode === 'all' || step === i} aria-hidden={mode === 'player' && step !== i}>
        <figcaption>
          {#if mode === 'all'}<span class="n">{i + 1}</span>{/if}
          {f.title}
        </figcaption>

        <div class="window">
          {#if f.id === 'sheet'}
            <table class="grid messy">
              <caption class="sr">A spreadsheet with inconsistent values</caption>
              <thead>
                <tr><th scope="col">Client</th><th scope="col">Qty</th><th scope="col">Due</th><th scope="col">Paid</th></tr>
              </thead>
              <tbody>
                <tr><td>Acme Ltd</td><td>3</td><td class="bad">12/3</td><td>y</td></tr>
                <tr><td>Birch &amp; Co</td><td class="bad">three</td><td class="bad">March 3</td><td>yes</td></tr>
                <tr><td>Cole Farm</td><td>7</td><td class="bad">1.4</td><td class="bad">N</td></tr>
              </tbody>
            </table>
            <p class="hint">Paid is written y, yes and N. A date like 12/3 could mean two things.</p>
          {:else if f.id === 'list'}
            <table class="grid">
              <caption class="sr">A list with a type on every field</caption>
              <thead>
                <tr>
                  <th scope="col">Client<span class="type">text</span></th>
                  <th scope="col">Qty<span class="type">number</span></th>
                  <th scope="col">Due<span class="type">date</span></th>
                  <th scope="col">Paid<span class="type">yes / no</span></th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Acme Ltd</td><td>3</td><td>12 Mar</td><td>Yes</td></tr>
                <tr><td>Birch &amp; Co</td><td>3</td><td>3 Mar</td><td>Yes</td></tr>
                <tr><td>Cole Farm</td><td>7</td><td>1 Apr</td><td>No</td></tr>
              </tbody>
            </table>
            <p class="hint">Each column now has a type. The owner checks it before anything is kept.</p>
          {:else if f.id === 'ask'}
            <div class="chat">
              <p class="bubble you"><span class="who">You</span>Make Paid a choice: unpaid, part paid, paid.</p>
              <p class="bubble bot">
                <span class="who">Assistant</span>I can change Paid from yes / no to a choice. Three
                existing values would be converted. That needs your approval.
              </p>
            </div>
            <table class="grid small">
              <caption class="sr">The Paid field, before the change</caption>
              <thead><tr><th scope="col">Client</th><th scope="col">Paid<span class="type">yes / no</span></th></tr></thead>
              <tbody>
                <tr><td>Acme Ltd</td><td>Yes</td></tr>
                <tr><td>Birch &amp; Co</td><td>Yes</td></tr>
                <tr><td>Cole Farm</td><td>No</td></tr>
              </tbody>
            </table>
          {:else}
            <div class="approval">
              <p class="wait">Waiting for you</p>
              <p class="what">Change Paid from yes / no to choice</p>
              <p class="map">Yes becomes paid. No becomes unpaid.</p>
              <div class="actions" aria-hidden="true"><span class="btn go">Approve</span><span class="btn">Deny</span></div>
            </div>
            <p class="hint">Once approved, the change goes in the history, and it can be undone.</p>
          {/if}
        </div>
      </figure>
    {/each}
  </div>
</section>

<style>
  .sketch {
    display: grid;
    gap: 1rem;
  }
  .note {
    margin: 0;
    max-width: 62ch;
    color: var(--muted);
    font-size: 0.9rem;
  }
  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    justify-content: space-between;
  }
  .tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  button {
    font: inherit;
    font-size: 0.9rem;
    color: var(--ink);
    background: transparent;
    border: 1px solid var(--rule);
    border-radius: 999px;
    padding: 0.4rem 0.85rem;
    min-height: 2.5rem;
    cursor: pointer;
  }
  button:hover {
    border-color: var(--ink);
  }
  button[aria-pressed='true'] {
    background: var(--ink);
    color: var(--bg);
    border-color: var(--ink);
  }
  .n {
    display: inline-block;
    min-width: 1.2em;
    margin-right: 0.4em;
    font-variant-numeric: tabular-nums;
  }

  .stage {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 19rem), 1fr));
  }
  [data-mode='player'] .stage {
    grid-template-columns: 1fr;
  }
  [data-mode='player'] .frame {
    grid-area: 1 / 1;
    visibility: hidden;
    opacity: 0;
    transition:
      opacity 0.5s ease,
      visibility 0s linear 0.5s;
  }
  [data-mode='player'] .frame[data-active='true'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.5s ease;
  }
  .frame {
    margin: 0;
    display: grid;
    gap: 0.6rem;
    align-content: start;
  }
  figcaption {
    font-weight: 600;
  }
  .window {
    background: var(--paper);
    border: 1px solid var(--rule);
    border-radius: 0.5rem;
    padding: 1rem;
    display: grid;
    gap: 0.9rem;
    min-height: 12rem;
    align-content: start;
    overflow-x: auto;
  }

  .grid {
    border-collapse: collapse;
    font-family: var(--mono);
    font-size: 0.86rem;
    width: 100%;
  }
  .grid th,
  .grid td {
    border: 1px solid var(--rule);
    padding: 0.4rem 0.55rem;
    text-align: left;
    white-space: nowrap;
  }
  .grid thead th {
    background: var(--head);
    font-weight: 600;
  }
  .type {
    display: block;
    font-weight: 400;
    font-size: 0.74rem;
    color: var(--accent);
  }
  .bad {
    background: var(--mark);
    color: var(--mark-ink);
  }
  .hint {
    margin: 0;
    font-size: 0.88rem;
    color: var(--muted);
  }
  .chat {
    display: grid;
    gap: 0.5rem;
  }
  .bubble {
    margin: 0;
    padding: 0.55rem 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.92rem;
    max-width: 34ch;
  }
  .who {
    display: block;
    font-size: 0.78rem;
    color: var(--muted);
  }
  .you {
    justify-self: end;
    background: var(--head);
  }
  .bot {
    border: 1px solid var(--rule);
  }
  .small {
    max-width: 18rem;
  }
  .approval {
    border: 2px solid var(--mark-edge);
    background: var(--mark);
    color: var(--mark-ink);
    border-radius: 0.5rem;
    padding: 0.9rem 1rem;
    display: grid;
    gap: 0.4rem;
  }
  .approval p {
    margin: 0;
  }
  .wait {
    font-size: 0.82rem;
    font-weight: 600;
  }
  .what {
    font-weight: 600;
    font-size: 1.02rem;
  }
  .actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.4rem;
  }
  .btn {
    border: 1px solid var(--mark-ink);
    border-radius: 0.35rem;
    padding: 0.3rem 0.8rem;
    font-size: 0.9rem;
  }
  .btn.go {
    background: var(--mark-ink);
    color: var(--mark);
  }
  @media (prefers-reduced-motion: reduce) {
    [data-mode='player'] .frame,
    [data-mode='player'] .frame[data-active='true'] {
      transition: none;
    }
  }
</style>

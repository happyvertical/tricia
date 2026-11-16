# Screenshots

Regenerates the README screenshots in `docs/screenshots` from a running smrt app shell. The data is
invented (a made-up bakery, see `seed.json`), the browser is headless Chrome at 1280 by 800 in the
light theme, and the owner is a made-up person with an example.com address.

The script does not connect an AI account. The assistant shows as off in every screenshot.

## Steps

1. Build and set up the app shell from a smrt checkout, as on the
   [download page](https://tricia.happyvertical.com/download), with a new, empty, private data
   folder. Run `node ../cli/bin/smrt.js app setup` and start it with `node build`, but do not open
   the setup link yourself: the script uses it.
2. Run `node ../cli/bin/smrt.js app doctor` and note the `state` path it prints.
3. Install and capture, from the root of this repository (Chrome must be installed):

   ```sh
   pnpm install
   STATE_DIR=<the state path> pnpm --filter @tricia/screenshots capture
   ```

   Set `APP_URL` if the app is not on `http://127.0.0.1:4796`, `OUT_DIR` to write somewhere other
   than `docs/screenshots`, `ONLY=01-home,04-report` to capture some of them, or `SETUP_URL` to
   pass the one-time link directly.

The script refuses an `APP_URL` that is not localhost or 127.0.0.1, because it writes seed data into
the app. Set `ALLOW_REMOTE_APP=1` only for a throwaway app that you own.

The setup link works once, so each run needs a freshly set up app with an empty data folder. Do not
commit or share the link. Look at every image before committing it.

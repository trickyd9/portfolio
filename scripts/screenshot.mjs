#!/usr/bin/env node
// Screenshots the running dev server so a change can actually be looked at
// rather than just type-checked. Also reports console errors and failed
// requests, since "builds clean" and "renders clean" are different claims.
//
// Requires the dev server to already be running (`npm run dev`) — this script
// deliberately doesn't start one, so it can't leave a stray server behind.
//
//   node scripts/screenshot.mjs                      # home, desktop
//   node scripts/screenshot.mjs /projects            # one route
//   node scripts/screenshot.mjs / /projects --mobile # several routes, 390px
//   node scripts/screenshot.mjs / --both             # desktop + mobile
//   node scripts/screenshot.mjs /projects --tab='Platform Launches'
//
// Routes are the app's hash routes written without the '#' ('/', '/projects').
// `--tab` clicks a tab by its visible label before shooting — several pages here
// are tabbed and the active tab isn't in the URL, so it's the only way to see
// anything but the first one.
// PNGs land in .screenshots/ (git-ignored), named after route and width.

import { mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { chromium } from 'playwright';

const BASE = process.env.PREVIEW_URL ?? 'http://localhost:5173/portfolio/';
// A plain string path, not a URL — page.screenshot()'s `path` only takes strings.
const OUT_DIR = fileURLToPath(new URL('../.screenshots/', import.meta.url));

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const routes = args.filter((a) => !a.startsWith('--'));
if (routes.length === 0) routes.push('/');

const tabArg = args.find((a) => a.startsWith('--tab='));
const tabLabel = tabArg?.slice('--tab='.length);
// Only the bare toggles belong in the flag set; --tab= carries a value.
flags.delete(tabArg);

const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const viewports = flags.has('--both')
  ? [DESKTOP, MOBILE]
  : flags.has('--mobile')
    ? [MOBILE]
    : [DESKTOP];

// '/' -> 'home'; '/career-persona-research/hiring-manager' -> nested name
const fileNameFor = (route, width) => {
  const base = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
  return `${base}${tabLabel ? `-${slug(tabLabel)}` : ''}-${width}.png`;
};

const browser = await chromium.launch();
let problems = 0;

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 2 });
    const page = await context.newPage();

    // Collected per page load below, but wired once per context.
    const messages = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') messages.push(`console error: ${msg.text()}`);
    });
    page.on('pageerror', (err) => messages.push(`page error: ${err.message}`));
    page.on('requestfailed', (req) => {
      // Favicon noise isn't worth failing a visual check over.
      if (!req.url().endsWith('favicon.svg')) {
        messages.push(`request failed: ${req.url()} (${req.failure()?.errorText})`);
      }
    });

    for (const route of routes) {
      messages.length = 0;
      const url = `${BASE}#${route}`;
      await page.goto(url, { waitUntil: 'networkidle' });

      if (tabLabel) {
        // Fail loudly rather than silently shooting the default tab, which
        // would look like a passing check of something never actually seen.
        const tab = page.getByRole('tab', { name: tabLabel, exact: true });
        if ((await tab.count()) === 0) {
          const available = await page.getByRole('tab').allInnerTexts();
          throw new Error(`No tab "${tabLabel}" on ${route}. Tabs here: ${available.join(' | ') || '(none)'}`);
        }
        await tab.click();
        await page.waitForTimeout(250); // let the panel swap settle before shooting
      }

      await mkdir(OUT_DIR, { recursive: true });
      await page.screenshot({ path: join(OUT_DIR, fileNameFor(route, viewport.width)), fullPage: true });

      console.log(`${route} @ ${viewport.width}px -> .screenshots/${fileNameFor(route, viewport.width)}`);
      for (const message of messages) {
        problems += 1;
        console.log(`  ! ${message}`);
      }

      // A horizontally scrolling body is the failure this catches most often,
      // and it's invisible in a screenshot that's already been clipped.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      if (overflow > 0) {
        problems += 1;
        console.log(`  ! horizontal overflow: ${overflow}px wider than the viewport`);
      }
    }

    await context.close();
  }
} finally {
  await browser.close();
}

console.log(problems === 0 ? '\nNo console errors, failed requests, or overflow.' : `\n${problems} problem(s) above.`);
console.log(`Files: ${(await readdir(OUT_DIR)).join(', ')}`);

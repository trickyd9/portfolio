# David Trick — portfolio site

Source for [trickyd9.github.io/portfolio](https://trickyd9.github.io/portfolio).

React 19 + TypeScript + Vite, built on the [Cloudscape](https://cloudscape.design/)
design system. Entirely static — no backend, no CMS, no database. Every word of
content is a TypeScript file under `src/content/`.

## Run it

```bash
npm install   # first time only
npm run dev
```

Open the URL it prints — note the **`/portfolio/` base path**
(`http://localhost:5173/portfolio/`), which matches the GitHub Pages deploy path.

| Script | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Type-check (`tsc -b`) then build to `dist/` |
| `npm run lint` | `oxlint` |
| `npm run deploy` | Build, then publish `dist/` to the `gh-pages` branch — **this is what makes changes public** |
| `npm run shot -- /projects` | Screenshot the running dev server (see below) |

Commits to `main` change the source. Only `npm run deploy` changes what a
visitor sees.

## Looking at a change

`scripts/screenshot.mjs` drives headless Chromium (Playwright) against the
**already-running** dev server, so a change can be looked at rather than only
type-checked. It doesn't start a server itself, so it can't leave one behind.

```bash
npm run dev                              # in one terminal
npm run shot -- / /projects              # desktop
npm run shot -- / --both                 # desktop + mobile (390px)
```

PNGs land in `.screenshots/` (git-ignored). Alongside the images it reports
**console errors, failed requests, and horizontal overflow** — the last of which
a screenshot can't show you, and which is the most common mobile regression here.

## Layout

```
src/
├── App.tsx        app shell — top nav, side nav, breadcrumbs, search, routes, theming
├── index.css      the only hand-written CSS (mostly the custom top nav bar)
├── pages/         one file per route
├── content/       all words and facts
│   ├── widgets.ts       registry: which content pieces exist, their titles and routes
│   ├── widgetContent.ts card copy, written as content blocks
│   ├── data/            long-form content by subject (experience, schooling, projects, research…)
│   └── jobMarket/       dormant — see below
├── widgets/       Widget.tsx (renders any block) + blocks.ts (the block schema)
├── components/    shared render helpers (EntrySection, ArtworkCarousel, …)
└── hooks/         useDisplaySettings — light/dark and density, persisted to localStorage
```

Routing is `react-router-dom` in **hash mode** (`#/projects`), which is what lets
a static host serve deep links without server-side rewrites.

## Where to make changes

| To change… | Edit |
|---|---|
| A fact about a job, degree, or project | the matching file in `src/content/data/` |
| Copy on a dashboard card | `src/content/widgetContent.ts` |
| How a *kind* of content looks everywhere (quotes, tags, stats…) | `src/widgets/Widget.tsx` |
| Which pages exist, nav, breadcrumbs, search | `src/App.tsx` + `src/content/widgets.ts` |
| What each persona's dashboard starts with | the per-persona `weight` in `src/content/data/personaDashboard.ts` |
| Anything visual | prefer Cloudscape components and design tokens over new CSS |

**Colours must come from `@cloudscape-design/design-tokens`** — never hand-picked
hex values. Tokens carry their own light and dark values, which is what makes
dark mode work without a second set of rules. The `design-tokens` package is
pinned to an exact version so its hashed CSS variables match the components
package.

## Dormant code

The **Job Market Explorer** (`src/pages/JobMarketPage.tsx`, `src/content/jobMarket/`,
`JobListingCard.tsx`, `SearchSettingsModal.tsx`) was built and then unlinked from
the site on 2026-08-12 while the idea is still being worked out. It's kept, not
deleted, so it can come back.

Its data refresh (`.github/workflows/refresh-uw-jobs.yml` →
`scripts/refresh-uw-jobs.mjs` → `data/uw-jobs.json`) is **manual-dispatch only**
as of 2026-08-13; the daily schedule was removed while nothing reads the data.

`src/content/personas.ts` is likewise retired-but-kept — the live persona model
is the six research personas in `src/content/data/careerPersonaResearch.ts`.

## Fuller documentation

`CodebaseArchitecture.md` in the project folder **above this repo** (not in git)
covers the architecture, the content layering, conventions, and the working
process in depth. `WIDGET-TRACKER.md`, alongside it, carries per-widget status
and the running decision log.

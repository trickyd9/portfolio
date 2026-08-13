# on-hold

Content modules that are **not wired into the site** but are deliberately kept,
because the idea behind them may come back.

Nothing in here is imported by anything. That's the defining property of the
folder — if a file here gains an importer, it isn't on hold any more and should
move back out to `src/content/`.

| File | Why it's here |
|---|---|
| `personas.ts` | The original 5-persona list (recruiter, hiring manager, UX professional, technical peer, other) from `PersonaWidgetSpec.md` §1, which drove the first persona-switching dashboard. The live persona model is now the 6 research personas in `../data/careerPersonaResearch.ts` |

Two things to know before touching anything here:

- **These files are still type-checked.** `tsc -b` covers them, so they have to
  keep compiling. They just aren't bundled — Vite only includes modules that are
  actually imported, so nothing here ships to visitors.
- **Don't rewire a file here to "use it up."** It's on hold on purpose. If the
  idea is coming back, that's a decision to make deliberately, with David, not a
  side effect of finding an unused export and reaching for it.

Separate from this folder, the **Job Market Explorer** is dormant in the same
spirit but left in place (`../jobMarket/`, `../../pages/JobMarketPage.tsx`, and
its two components) — it's a whole feature rather than a single module, so
moving it would churn a lot of paths for no gain. See the project's
`CodebaseArchitecture.md` §9.

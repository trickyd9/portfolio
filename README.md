# site/ — local dashboard preview

Frontend-only preview of the persona/widget dashboard concept from
[PersonaWidgetSpec.md](../PersonaWidgetSpec.md). React + TypeScript + Vite +
[Cloudscape](https://cloudscape.design/) (board-components for the drag/resize
dashboard). No AWS needed to run this — it's local-only until Phase 1 infra
(WebsiteArchitecture.md §5) stands up hosting.

## Run it

```bash
cd site
npm install   # first time only
npm run dev
```

Open the URL it prints (note the `/portfolio/` base path — e.g.
`http://localhost:5173/portfolio/`).

## What's here

- Switch persona via the dropdown top-right — the dashboard resets to that
  persona's default widget set and order (`src/content/widgets.ts`,
  `PERSONA_DEFAULT_LAYOUT`).
- Every card is draggable/resizable/removable (Cloudscape Board). Widgets not on
  the current dashboard are listed under "More widgets available to add."
- Card content is still placeholder text from the spec — see
  [../WIDGET-TRACKER.md](../WIDGET-TRACKER.md) for the widget-by-widget refinement
  checklist and current status of each.

## Where to make changes

- **Widget content/copy/persona-weighting:** `src/content/widgets.ts`
- **Persona list:** `src/content/personas.ts`
- **Default per-persona layout order:** `PERSONA_DEFAULT_LAYOUT` in
  `src/content/widgets.ts`
- **Dashboard shell / card rendering:** `src/App.tsx`
- **A widget outgrowing the generic placeholder card** (e.g. Featured Projects'
  filter dropdown): give it its own component and swap it in via the `renderItem`
  callback in `src/App.tsx`, keyed off `item.data.widgetId`.

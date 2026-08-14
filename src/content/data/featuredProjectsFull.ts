// Featured Projects full page — the categories that don't have their own
// dedicated page (Design Systems, Persona Research, and AI-Augmented Build
// projects are detailed on their own full pages instead — see
// src/pages/FeaturedProjectsPage.tsx and WIDGET-TRACKER.md for why). Fuller
// descriptions sourced verbatim from References/David Trick - Project List.md.

export interface Launch {
  id: string;
  title: string;
  period: string;
  description: string;
}

// Title, period, and description only. Each launch used to carry a `stats`
// array rendered as a StatGrid row (85ms p50 latency, 72% adoption, 10× query
// performance, and so on) — removed 2026-08-13 on David's direction, along
// with the same figures in experience.ts and in the downloadable resume and
// project list. The launches themselves stay; the numbers don't.
//
// Two launches, not three: the Mobile Beta entry was dropped 2026-08-13 when
// the updated project list stopped listing it, and both surviving descriptions
// were rewritten to match that doc — the v2 migration's "zero-downtime, 6-month
// phased rollout" framing is gone from the source and so is gone from here.
// Don't restore either from memory of an older draft.
export const LAUNCHES: Launch[] = [
  {
    id: 'full-text-search-ga',
    title: 'Full-Text Search GA',
    period: 'Sep 2025',
    description:
      'Full-text search added to the platform’s inventory system, covering devices, sites, alarms, and docs.',
  },
  {
    id: 'v2-platform-migration',
    title: 'V2 Platform Migration',
    period: 'Jun 2025',
    description:
      'The platform’s v1 → v2 generation shift, spanning both the underlying data-structure migration and the metric-organization tooling that gave users a materially better way to interact with configurations.',
  },
];

// Both launches were primarily back-end initiatives; David's involvement was
// heavier on the configuration-tooling migration, which carried the UX
// interactions. Stated on the page below the list rather than folded into a
// launch description, because it qualifies both of them.
export const LAUNCHES_INVOLVEMENT_NOTE =
  'Both were primarily back-end initiatives; my involvement was heavier on the configuration-tooling migration, which carried the UX interactions.';

export interface ControlsProject {
  title: string;
  description: string;
}

// Rendered the same way as the Featured Projects tab's category lists — bold
// title, description below, no accordion. Descriptions expanded from the one-liners
// this file used to carry using the fuller, already-written bullets on the
// About page's Work Experience tab (experience.ts's "Controls Design
// Engineer" entry) rather than inventing new detail — every added sentence
// here has a real bullet behind it there.
export const EARLIER_CONTROLS_PROJECTS: ControlsProject[] = [
  {
    title: 'Global Automation Controls Graphics Deployment Program',
    description:
      'Built the global cross-team workflow for creating, reviewing, and deploying SVG artwork for AWS data center HMIs worldwide, from the ground up — 3 ticketing templates still in active use. Also established the centralized Graphics Repository for completed artwork across all sites, authored the definitive SVG floorplan annotation runbook (shared 7+ times to onboard new team members), and automated the floorplan creation pipeline itself, replacing the PDF-based workflow with direct CAD file processing — self-teaching the CAD toolchain to do it — for a 60% reduction in average generation time.',
  },
  {
    title: 'Controls GUI Style Guide',
    description:
      'Co-created the grayscale graphics standards package that established visual consistency across all AWS data centers globally — still in active use 8+ years later. Audited BMS graphics across every legacy US data center against 62 graphical standard elements, scoring every site against the current standard and writing a one-pager per site, then produced an ROI-ranked 3-phase remediation plan sized at a multi-work-year effort and pitched it to senior leadership with a test-site proposal. Also reviewed BMS/power-monitoring vendor graphic submittals for global sites (US, Europe, Asia-Pacific) against the same standards.',
  },
  {
    title: 'Modular EPMS Graphical Interface',
    description:
      'Designed the graphical interface for a modular electrical distribution system with a 10-inch touchscreen EPMS — submitted to the manufacturer for global production reproduction.',
  },
  {
    title: '7-Page Colocation HMI Template',
    description: 'Designed and built a 7-page colocation HMI template adopted for international colocation site deployments.',
  },
];

// A "Personal" export used to live here too (Hovercraft/Hyperloop/EcoCar) —
// removed, not renamed: those three now have their own real write-ups and
// thumbnails on the About page's Schooling tab, and this was a thinner,
// duplicate copy of the same three projects.

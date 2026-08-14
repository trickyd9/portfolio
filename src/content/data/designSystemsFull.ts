// Sourced verbatim from References/David Trick - Project List.md — "UX Vision,
// Standards & Design Systems" section. Grouped into the Design Systems full
// page's tabs (see src/pages/DesignSystemsPage.tsx).
import type { Entry } from './entry';

export const TENETS_AUDIT: Entry[] = [
  {
    id: 'ux-tenets-standards',
    title: 'UX Tenets & Standards Document',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Authored a 3-layer reference for how the platform should look, behave, and evolve: 15 design tenets (the philosophy — start from the job, the system knows you, filter don\'t flood, progressive disclosure) → 19 standard tenets (navigation, visual language, data states, writing, permissions, data visualization, architecture) → 17 component specs across all page types. Built on top of Cloudscape, AWS\'s open-source design system, so the standards extend an established component library rather than replacing it. Every component rule traces back through a standard to a design tenet.',
      },
    ],
  },
  {
    id: 'ux-audit-program',
    title: 'UX Audit Program — Tenet-Based Schema V2',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Audited the platform against a tenet-based audit schema developed in parallel — schema v2.5.1 with 103 machine-checkable rules (31 high · 48 medium · 18 low · 6 advisory) across 13 page types + 15 documented page-type exceptions, each rule traceable to a specific design tenet. Covered design system compliance, accessibility, data state handling, interaction safety, and visual consistency. Full platform coverage: all 42 pages audited, then re-audited end to end against the current schema — ~112 findings across 28 pages, 14 pages clean. 6 rules recommended for promotion to CI enforcement (pending).',
      },
    ],
  },
  {
    id: 'drift-notification-standard',
    title: 'Drift Notification UX Standard',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Defined the UX standard for drift/deviation notifications in data tables to include accessibility concerns regarding color-only signaling — moving to color + icon. Reviewed iterations with the implementing developer and approved the final version.',
      },
    ],
  },
];

// The wiki superseded the standalone website as the thing the team maintains,
// so the two render together in one "Standards Reference" tab, current first and
// its predecessor second — they're one story (a reference that moved homes), not
// two unrelated projects, and splitting them across tabs would read as though the
// website simply died. Order matters here: don't re-sort this array.
export const STANDARDS_WIKI: Entry = {
  id: 'ux-standards-wiki',
  title: 'UX Standards & Requirements Wiki',
  period: 'Owner, 2026',
  sections: [
    {
      intro:
        "Consolidated the platform's UX guidance into a single maintained entry point for the team: the standards, the audit rules, the audit results, page types and components, accessibility requirements, and mockup summaries. Replaced a purpose-built standalone site as the thing the team maintains — same reference content, no separate application to own.",
    },
  ],
};

export const STANDARDS_WEBSITE: Entry = {
  id: 'ux-standards-website',
  title: 'UX Standards Website',
  period: 'Owner, 2026 — content since consolidated into the wiki',
  sections: [
    {
      intro:
        "Standalone reference site (non-production sandbox) that served a dual purpose: documented the platform's UX standards (page types, components, audit rules, accessibility requirements) and provided a customer-interactive, customizable mockup for persona-based landing-page dashboards. Used internally as a demoable artifact for the persona vision and data collection — the interactive sandbox is what let the persona vision be clicked through rather than read about, and it carried that work through its review period. Its documentation content now lives on the wiki.",
    },
  ],
};

export const ROADMAP_ENABLEMENT: Entry[] = [
  {
    id: 'ux-roadmap',
    title: 'UX Roadmap & Task Hierarchy',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Defined and documented the full UX roadmap: 5 workstreams (UX Vision & Standards, Persona-Based Interaction Design, Mockups & Design Deliverables, Scaling & Tooling, Training & Enablement). Produced a manager-facing framework doc and 5 initiative 1-pagers. Presented to skip-level and direct manager; secured Q2 direction with persona-driven design as the execution focus.',
      },
    ],
  },
  {
    id: 'terminology-standardization',
    title: 'Cross-Org Terminology Standardization',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Led a terminology standardization effort across 4 organizations for verification/validation UI labels. Coordinated meetings, surfaced naming conflicts, and produced 6 naming decisions adopted platform-wide. Established a repeatable process for future terminology questions.',
      },
    ],
  },
  {
    id: 'code-review-gatekeeper',
    title: 'UI Code Review Gatekeeper',
    period: 'Ongoing role contribution',
    sections: [
      {
        intro:
          'De facto UI/UX approval authority for the platform team. 200+ design-feedback messages across cross-team code reviews — design-system compliance checks, usability callouts, persona-impact flags. Codified into the AI-augmented build-step model.',
      },
    ],
  },
  {
    id: 'real-time-guidance',
    title: 'Real-Time UX Guidance',
    period: 'Ongoing role contribution',
    sections: [
      {
        intro:
          'Provides on-demand UX direction via asynchronous chat and via code-review comments for in-progress work. Examples include container consistency on monitoring pages, primary-button placement, and table-cell formatting decisions. Decisions are captured back into the standards document where pattern-worthy.',
      },
    ],
  },
];

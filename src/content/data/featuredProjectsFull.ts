// Featured Projects full page — the categories that don't have their own
// dedicated page (Design Systems, Persona Research, and AI-Augmented Build
// projects are detailed on their own full pages instead — see
// src/pages/FeaturedProjectsPage.tsx and WIDGET-TRACKER.md for why). Fuller
// descriptions sourced verbatim from References/David Trick - Project List.md.
import type { Entry } from './entry';

export interface Launch {
  id: string;
  title: string;
  period: string;
  description: string;
  stats: Array<{ value: string; label: string }>;
}

// Rendered as a StatGrid per launch (FeaturedProjectsPage.tsx) instead of a
// bullet list — same numbers, laid out as key-value pairs rather than
// buried mid-sentence.
export const LAUNCHES: Launch[] = [
  {
    id: 'full-text-search-ga',
    title: 'Full-Text Search GA',
    period: 'Sep 2025',
    description: 'Search across devices, sites, alarms, and docs.',
    stats: [
      { value: '85ms', label: 'p50 latency' },
      { value: '72%', label: 'adoption' },
      { value: '94%', label: 'accuracy' },
      { value: '4.2%', label: 'zero-result rate' },
    ],
  },
  {
    id: 'v2-platform-migration',
    title: 'V2 Platform Migration',
    period: 'Jun 2025',
    description: 'Zero-downtime migration over a 6-month phased rollout.',
    stats: [
      { value: '10×', label: 'query performance (500ms → 50ms)' },
      { value: '35%', label: 'infra cost reduction' },
      { value: '99.99%', label: 'availability (up from 99.95%)' },
      { value: 'Zero', label: 'data loss' },
    ],
  },
  {
    id: 'mobile-beta',
    title: 'Mobile Beta',
    period: 'Nov 2025',
    description: 'iOS/Android via React Native for AWS field technicians.',
    stats: [
      { value: '78', label: 'beta users (target 50)' },
      { value: '0.3%', label: 'crash rate' },
      { value: '4.2★', label: 'rating' },
    ],
  },
];

export const EARLIER_CONTROLS_PROJECTS: Entry[] = [
  {
    id: 'controls-graphics-deployment-program',
    title: 'Global Automation Controls Graphics Deployment Program',
    period: 'Owner, 2017 – 2022',
    sections: [
      {
        intro:
          'Built the global cross-team workflow for creating, reviewing, and deploying artwork for data center HMIs worldwide from the ground up. 3 ticketing templates still in active use.',
      },
    ],
  },
  {
    id: 'controls-gui-style-guide',
    title: 'Controls GUI Style Guide',
    period: 'Co-author, 2017 – 2022',
    sections: [
      {
        intro:
          'Co-created the graphics standards package that established visual consistency across all AWS data centers globally. Still in active use 8+ years later.',
      },
    ],
  },
  {
    id: 'modular-epms-interface',
    title: 'Modular EPMS Graphical Interface',
    period: 'Owner, 2017 – 2022',
    sections: [
      {
        intro:
          'Designed the graphical interface for a modular electrical distribution system with a 10-inch touchscreen EPMS. Submitted to the manufacturer for global production reproduction.',
      },
    ],
  },
];

// A "Personal" export used to live here too (Hovercraft/Hyperloop/EcoCar) —
// removed, not renamed: those three now have their own real write-ups and
// thumbnails on the About page's Schooling tab, and this was a thinner,
// duplicate copy of the same three projects.

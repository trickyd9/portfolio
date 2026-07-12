// Featured Projects full page — the categories that don't have their own
// dedicated page (Design Systems, Persona Research, and AI-Augmented Build
// projects are detailed on their own full pages instead — see
// src/pages/FeaturedProjectsPage.tsx and WIDGET-TRACKER.md for why). Fuller
// descriptions sourced verbatim from References/David Trick - Project List.md.
import type { Entry } from './entry';

export const LAUNCHES_PROJECTS: Entry[] = [
  {
    id: '2025-platform-launches',
    title: '2025 Platform Launches',
    period: 'Team member, 2025',
    sections: [
      {
        intro: 'Contributed as a team member to three 2025 launches:',
        bullets: [
          'Full-text search GA (Sep 2025) — search across devices, sites, alarms, and docs. 85ms p50 latency, 72% adoption, 94% accuracy, 4.2% zero-result rate.',
          'v2 platform migration (Jun 2025) — zero downtime over a 6-month phased rollout. 10× query performance (500ms → 50ms), 35% infrastructure cost reduction, 99.99% availability (up from 99.95%), zero data loss.',
          'Mobile beta (Nov 2025) — iOS/Android via React Native for AWS field technicians. 78 beta users (target 50), 0.3% crash rate, 4.2★ rating.',
        ],
      },
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

export const PERSONAL_PROJECTS_FULL: Entry[] = [
  {
    id: 'hovercraft-prototype',
    title: '3D-Printed Hovercraft Prototype',
    period: 'Personal, 2015 – 2017',
    sections: [
      {
        intro:
          'Personal additive-manufacturing project iterated through V1, V2, and V2.5. Iteration approach: prove viability with a deliberately rough V1, capture lessons, redesign smaller and lighter for V2, refine clip-fit tolerances and add directional motors with safety cages for V2.5. Demonstrates rapid prototyping methodology and an iterate-from-evidence design approach.',
      },
    ],
  },
  {
    id: 'uw-hyperloop-test-cell',
    title: 'UW Hyperloop Test Cell',
    period: 'University Research, 2016',
    sections: [
      {
        intro:
          'Designed test cell apparatus for magnetic-levitation thrust vector measurement using strain gauges; one of two members on the project. Created CAD models and engineering drawings; collaborated on conceptual design for the Hyperloop transportation system.',
      },
    ],
  },
  {
    id: 'ecocar-capstone',
    title: 'EcoCar Capstone',
    period: 'University, 2015 – 2016',
    sections: [
      {
        intro:
          'University of Washington capstone — machined connective components used throughout the EcoCar (brackets, mounts, gears, cradles, crossbars, frames). SolidWorks drawings, NX programming. Brief membership on the engine-frame coupling team.',
      },
    ],
  },
];

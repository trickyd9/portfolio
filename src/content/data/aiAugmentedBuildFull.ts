// Sourced verbatim from References/David Trick - Project List.md — "AI-Augmented
// Design-to-Build" section. Grouped into the AI-Augmented Build full page's tabs
// (see src/pages/AiAugmentedBuildPage.tsx).
import type { Entry } from './entry';

export const AGENTS_AUDITING: Entry[] = [
  {
    id: 'ai-agents-package',
    title: 'AI Development Agents Package',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Built an internal AI development agents package with 39 validated capabilities (16 skills, 1 agent, 3 SOPs, 19 context files) approved by the team. Audit skill available for on-demand UX review during development. Page-creation skill generates standards-compliant shells so new pages pass the audit schema on first run. Two workflow modes: interactive + persona-aware for local development, deterministic for the CI pipeline. Standards violations now affect code reviews while persona feedback ships as non-blocking advisory cards.',
      },
    ],
  },
  {
    id: 'audit-aware-page-generator',
    title: 'Unified Audit-Aware Page Generator',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Consolidated two earlier page-generation tools into a single audit-aware generator. A clarification phase identifies the page type from the audit-schema taxonomy, loads required/forbidden components and v2 rules before generating, and produces standards-compliant output from natural-language descriptions. Published as a shared team resource.',
      },
    ],
  },
  {
    id: 'ai-reference-doc',
    title: '"How to Make a Platform Page" AI Reference',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Authored a single-document reference for AI mockup-generation tools and AI assistants to produce platform-compliant page designs. Covers the page-type taxonomy, required/forbidden components, quality rules by severity, component mapping, and an audit-validation checklist. Audited against authoritative sources.',
      },
    ],
  },
  {
    id: 'ai-page-auditing-agent',
    title: 'AI-Powered Page Auditing Agent',
    period: 'Owner, 2024 – Present',
    sections: [
      {
        intro:
          'Original custom AI agent for automated platform-page auditing — predecessor to the agents package above. Started in 2024, established the audit-as-CI pattern that the broader agents package now extends and operationalizes.',
      },
    ],
  },
];

export const PROTOTYPING_PIPELINE: Entry = {
  id: 'figma-make-react-pipeline',
  title: 'Figma Make → React Rapid Prototyping Pipeline',
  period: 'Owner, 2026',
  sections: [
    {
      intro:
        'Pioneered an AI-assisted prototyping flow: 6 AI-generated mockups → 4 interactive persona dashboard implementations in React. First concrete visual artifacts for the persona-driven UX direction — closes the gap between design exploration and interactive visualization without stopping at static mockups.',
    },
  ],
};

export const AUTOMATION_TOOLS: Entry[] = [
  {
    id: 'ai-sprint-management',
    title: 'AI-Powered Sprint Management System',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Designed and documented a sprint management system operated through AI agents — sprint structure (numbered sprints for active work, backlog sprint for epics), punt pattern, and rules. AI agents manage sprint boards, create punt clones, and track velocity; human-in-the-loop confirmation on agent-generated comments keeps oversight in place. Documented as reusable configuration.',
      },
    ],
  },
  {
    id: 'design-activity-detection',
    title: 'Design Activity Detection Automation',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          "Built auto-discovery tooling that detects AI-generated design files in the team's design-tool project and includes them in daily activity reports. Eliminated manual file registration across 17 scanned projects.",
      },
    ],
  },
];

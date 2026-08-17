// Full project detail behind the AI-Augmented Build page's two project tabs
// (see src/pages/AiAugmentedBuildPage.tsx).
//
// Sourced from References/David Trick - Project List.md, "AI-Augmented
// Design-to-Build". Not *verbatim*: em dashes are replaced with colons or second
// sentences per David's rule of 2026-08-16. No fact differs, only punctuation.
//
// History worth knowing: this file fed a four-tab version of the page, was parked
// in content/on-hold/ on 2026-08-17 when the page became a layered stack, and came
// straight back out the same day when David asked for the projects to be shown in
// tabs alongside the stack. Per the on-hold README, a file there that gains an
// importer isn't on hold any more and moves back to content/.
//
// Two groups, not the previous three. The Figma Make pipeline used to have a tab
// to itself; David capped the page at three tabs, so it sits with the other two
// non-audit-path tools.
//
// **The stack's popovers are not a second copy of this.** content/data/aiBuildStack.ts
// carries a short identifying blurb per project and points here by tab name. If a
// fact changes, it changes in both — they are different lengths of the same claim,
// deliberately, so the lead tab can name a project without reprinting it.
import type { Entry } from './entry';

export const AGENTS_AUDITING: Entry[] = [
  {
    id: 'ai-agents-package',
    title: 'AI Development Agents Package',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          "Built an internal AI development agents package on Kiro, AWS's agentic IDE, with 39 validated capabilities (16 skills, 1 agent, 3 SOPs, 19 context files) approved by the team. Audit skill available for on-demand UX review during development. Page-creation skill generates standards-compliant shells so new pages pass the audit schema on first run. Two workflow modes: interactive and persona-aware for local development, deterministic for the CI pipeline. Standards violations now affect code reviews while persona feedback ships as non-blocking advisory cards.",
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
    id: 'cr-review-skill',
    title: 'CR Review Skill',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Skill that runs the audit against a change and posts the results into the code review, putting findings in front of reviewers without anyone having to run the audit by hand. Built as the interim path until the CR AutoSDE inclusion integration is live. The review decision stays with the human reviewer: the skill supplies evidence, not approval.',
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
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Original custom AI agent for automated platform-page auditing, and the predecessor to the AI Development Agents Package above. Established the audit-as-CI pattern that the broader agents package now extends and operationalizes.',
      },
    ],
  },
];

export const PROTOTYPING_AUTOMATION: Entry[] = [
  {
    id: 'figma-make-react-pipeline',
    title: 'Figma Make → React Rapid Prototyping Pipeline',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Pioneered an AI-assisted prototyping flow: 6 AI-generated mockups became 4 interactive persona dashboard implementations in React. First concrete visual artifacts for the persona-driven UX direction, closing the gap between design exploration and interactive visualization without stopping at static mockups.',
      },
    ],
  },
  {
    id: 'ai-sprint-management',
    title: 'AI-Powered Sprint Management System',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Designed and documented a sprint management system operated through AI agents, covering sprint structure (numbered sprints for active work, backlog sprint for epics), the punt pattern, and the rules. AI agents manage sprint boards, create punt clones, and track velocity; human-in-the-loop confirmation on agent-generated comments keeps oversight in place. Documented as reusable configuration.',
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

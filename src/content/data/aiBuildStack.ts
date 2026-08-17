// The AI-Augmented Build page restructured as a layered stack (2026-08-16).
//
// Content is the same "AI-Augmented Design-to-Build" material as
// aiAugmentedBuildFull.ts, sourced from References/David Trick - Project List.md,
// re-cut from four tabs into five layers, bottom to top, so the page leads with how
// the pieces derive from each other rather than with a category list.
//
// Five layers, not six: an earlier drawing of this stack split the 19 context
// files out as their own layer, which then needed a "counted within the 39 above"
// footnote, because the context files *are* part of the 39-capability package.
// Folding them into Capabilities removes the footnote and the double count.
//
// Layer 01 is the standards work, not the AI work. It links out to the Design
// Systems & Standards page rather than restating it: that page is the full
// treatment, and the two must not describe the same schema differently.
//
// Each layer's detail is `points`, not a paragraph (David, 2026-08-16): expanded
// bands were readable but the prose blocks were hard to scan. One claim per bullet,
// counts kept inside the bullet that earns them.
//
// FOUR HOUSE RULES FOR THE COPY IN THIS FILE (all David, 2026-08-16):
//  1. No em dashes. Where one introduced an explanation or a list, use a colon;
//     where it was parenthetical, use a second sentence. This is why some blurbs
//     below differ in punctuation from the project list, which uses em dashes
//     freely. No fact differs, only the punctuation.
//  2. Layer 05 is human-led. David is the UI code reviewer on cross-team CRs. The
//     CR review skill posts audit results into the review; it does not make the
//     call, and copy here must not imply an agent approves anything.
//  3. `*asterisks*` mark the emphasis in a bullet, rendered as italics by the page.
//     **At most one per bullet, and it must be a short term of two to four words,
//     not a whole clause** (David, 2026-08-16): "UI code reviewer", not "I am the
//     UI code reviewer". Emphasize the thing being named, not the sentence about
//     it. Bullets that are already all numbers carry none.
//  4. `stat` is the band's headline callout. It must be the strongest *shipped*
//     claim for that layer, and must not restate `detail`. Nothing pending or
//     recommended should lead a callout: layer 05 used to headline "6 rules
//     recommended, pending", which advertised the one thing that had not happened.

import type { PopoverProject } from './entry';

/** A link out of the stack to a design-adjacent page on this site. */
export interface StackLink {
  label: string;
  href: string;
}

export interface StackLayer {
  /** '01'–'05', bottom to top. */
  number: string;
  /** Short all-caps name used in the band. */
  name: string;
  /** The role this layer plays, shown as the band's left-hand eyebrow. */
  role: string;
  /** One line, in the band header. Says what the layer does. */
  detail: string;
  /** The band's headline callout: the strongest shipped claim. See house rule 4. */
  stat: string;
  /** What this layer holds, one claim per bullet. `*asterisks*` become italics. */
  points: string[];
  /** Why this layer exists at all: the derivation from the layer below. */
  because?: string;
  /** Projects whose home is this layer. */
  projects: PopoverProject[];
  /**
   * Projects that live in another layer but genuinely reach into this one, shown
   * under a different label so a cross-reference never reads as padding. The agents
   * package is the case this exists for: one project that spans 03, 04 and 05.
   */
  spanning?: PopoverProject[];
  links?: StackLink[];
  /** Inherited by the AI package rather than part of it: drawn dashed and muted. */
  muted?: boolean;
  /** Load-bearing layers, drawn with a tinted fill. */
  emphasis?: boolean;
}

// Declared once and referenced from three layers. The package's own description in
// the project list covers capabilities (03), the two workflow modes (04), and the
// code-review effect (05). It is genuinely one project spanning three layers, so it
// is one object rather than three near-copies that could drift apart.
const AGENTS_PACKAGE: PopoverProject = {
  id: 'ai-agents-package',
  title: 'AI Development Agents Package',
  period: 'Owner, 2026',
  blurb:
    'The package itself: 39 team-approved capabilities on Kiro, spanning the skills and context files in this layer, the two run modes above it, and the code-review effect above that.',
        fullDetailIn: 'Agents & Auditing tab'
};

/** Bottom (01) to top (05): the order the stack builds. */
export const STACK_LAYERS: StackLayer[] = [
  {
    number: '01',
    name: 'FOUNDATION',
    // Not "INHERITED": that read as though the standards were handed to him. They
    // are his, they just sit outside the AI package.
    role: 'AUTHORED SEPARATELY',
    detail: 'Cloudscape, extended not replaced. The standards layer everything above resolves back to.',
    stat: '15 DESIGN TENETS · 19 STANDARD TENETS · 17 COMPONENT SPECS',
    points: [
      "Cloudscape, AWS's open-source design system: *extended, not replaced*.",
      // No emphasis: already a numeric chain, and italicising all three left the
      // whole line in italics, which is house rule 3 defeating itself.
      '15 design tenets (the philosophy) → 19 standard tenets (the rules by domain) → 17 component specs (the implementation, per page type).',
      'Synthesized from *6 source documents* into a single source of truth.',
      'The one layer the AI package does not author. It supplies the *design tenet* every rule above resolves to.',
    ],
    projects: [],
    links: [
      { label: 'Design Systems & Standards', href: '#/design-systems' },
      { label: 'Design Process', href: '#/design-process' },
    ],
    muted: true,
  },
  {
    number: '02',
    name: 'AUDIT SCHEMA',
    role: 'THE CONTRACT',
    detail: 'Turns written judgement into something a machine can check. Every rule traces to a tenet.',
    // Coverage beats the exception count as a headline: "all 42 pages audited" is
    // the finished work, "15 exceptions" is a detail, and it is still in the bullets.
    stat: 'SCHEMA v2.5.1 · 103 MACHINE-CHECKABLE RULES · ALL 42 PAGES AUDITED',
    because:
      'Standards written in plain English can be argued about but not tested, so they were restated as rules a machine can check.',
    points: [
      'Schema v2.5.1: *103 machine-checkable rules* across 13 page types, with 15 documented exceptions.',
      'Severity split: 31 high · 48 medium · 18 low · 6 advisory.',
      'Every rule traces to a specific design tenet, so a finding is *never a preference*.',
      'Covers design-system compliance, accessibility, data-state handling, interaction safety, and visual consistency.',
      'All *42 pages audited*, then re-audited end to end: ~112 findings across 28 pages, 14 pages clean.',
    ],
    projects: [
      {
        id: 'ai-page-auditing-agent',
        title: 'AI-Powered Page Auditing Agent',
        period: 'Owner, 2026',
        blurb:
          'The original auditing agent, and the predecessor to the package. It established the audit-as-CI pattern the rest of this stack is built on.',
        fullDetailIn: 'Agents & Auditing tab'
      },
    ],
    emphasis: true,
  },
  {
    number: '03',
    name: 'CAPABILITIES',
    role: 'THE PACKAGE',
    detail: 'Skills, an agent, SOPs and the context files that carry the standards to them at run time.',
    // "Approved by the team" is the social proof and belongs in the headline; the
    // 16/1/3/19 arithmetic is a bullet, not a callout.
    stat: '39 VALIDATED CAPABILITIES · APPROVED BY THE TEAM · BUILT ON KIRO',
    because: 'A schema cannot be read by an agent mid-build, so it became context and capabilities.',
    points: [
      "Built on Kiro, AWS's agentic IDE: *39 validated capabilities*, approved by the team.",
      '16 skills · 1 agent · 3 SOPs · 19 context files.',
      'The context files encode the standards, the schema, and the page-type taxonomy the agents load *at run time*.',
      '*Audit skill*: an on-demand UX review during development.',
      '*Page-creation skill*: generates standards-compliant shells, so a new page passes the audit schema on its first run.',
    ],
    projects: [
      AGENTS_PACKAGE,
      {
        id: 'audit-aware-page-generator',
        title: 'Unified Audit-Aware Page Generator',
        period: 'Owner, 2026',
        blurb:
          'Two earlier page-generation tools consolidated into one audit-aware generator, which identifies the page type before generating so its output starts compliant.',
        fullDetailIn: 'Agents & Auditing tab'
      },
      {
        id: 'ai-reference-doc',
        title: '"How to Make a Platform Page" AI Reference',
        period: 'Owner, 2026',
        blurb:
          'A single written reference that carries the page-type taxonomy and severity rules to AI mockup tools and assistants working outside the package.',
        fullDetailIn: 'Agents & Auditing tab'
      },
    ],
    emphasis: true,
  },
  {
    number: '04',
    name: 'RUN MODES',
    role: 'ONE CAPABILITY SET',
    detail: 'The same capability set runs two ways, so local guidance and the CI check cannot drift apart.',
    stat: 'INTERACTIVE + PERSONA-AWARE LOCALLY · DETERMINISTIC IN CI',
    because: 'The same rules are wanted in two places that want different behaviour.',
    points: [
      '*Interactive and persona-aware* locally: clarifies intent and surfaces persona impact while it builds.',
      '*Deterministic in CI*: the same rules without dialogue, so the result is reproducible.',
      'Splitting the mode, not *the rule set*, keeps local and CI behaviour from drifting apart.',
    ],
    // No project of its own: the two modes are a property of the package, and
    // nothing else in the project list describes them. Cross-referenced rather
    // than invented.
    projects: [],
    spanning: [AGENTS_PACKAGE],
  },
  {
    number: '05',
    name: 'ENFORCEMENT',
    role: 'WHERE IT LANDS',
    detail: 'Violations affect code reviews; persona feedback ships as non-blocking advisory cards.',
    // Was "6 RULES RECOMMENDED FOR PROMOTION TO CI ENFORCEMENT · PENDING", which
    // headlined the one thing that has not happened yet (David, 2026-08-16). The
    // shipped work is the skill that puts the audit in front of a reviewer; the
    // pending CI promotion follows it rather than leading.
    stat: 'CR REVIEW SKILL POSTS THE AUDIT INTO THE REVIEW · 6 RULES RECOMMENDED FOR CI',
    because: 'A check that nothing acts on changes nothing.',
    points: [
      'I am the *UI code reviewer* on cross-team CRs. The agents supply evidence for that review; they do not make the call.',
      'A *CR review skill* I built runs the audit and posts its results into the review, as the interim path until the CR AutoSDE inclusion integration is live.',
      '*Standards violations* affect code reviews: a failing rule is feedback the review has to answer.',
      'Persona feedback ships separately, as *non-blocking advisory cards*: it informs the build without gating the merge, which keeps the blocking signal credible.',
      '6 rules recommended for promotion to CI enforcement: pending.',
    ],
    projects: [
      {
        id: 'ui-code-review-gatekeeper',
        title: 'UI Code Review Gatekeeper',
        period: 'Ongoing, role contribution',
        blurb:
          'The human half of this layer: de facto UI/UX approval authority for the platform, with 200+ design-feedback messages across cross-team code reviews.',
        fullDetailIn: 'Design Systems & Standards page'
      },
      {
        id: 'cr-review-skill',
        title: 'CR Review Skill',
        period: 'Owner, 2026',
        blurb:
          'Runs the audit against a change and posts the results into the code review, as the interim path until the CR AutoSDE inclusion integration is live.',
        fullDetailIn: 'Agents & Auditing tab'
      },
    ],
    spanning: [AGENTS_PACKAGE],
  },
];

/** Built on the same agent substrate, but outside the audit path: nothing here gates a build. */
export const ADJACENT_SYSTEMS: PopoverProject[] = [
  {
    id: 'figma-make-react-pipeline',
    title: 'Figma Make → React Rapid Prototyping Pipeline',
    period: 'Owner, 2026',
    blurb:
      '6 AI-generated mockups became 4 interactive persona dashboards in React, taking the persona direction from exploration to something clickable.',
        fullDetailIn: 'Prototyping & Automation tab'
  },
  {
    id: 'ai-sprint-management',
    title: 'AI-Powered Sprint Management System',
    period: 'Owner, 2026',
    blurb:
      'Sprint boards, punt clones and velocity tracked by agents, with human confirmation on anything an agent writes back.',
        fullDetailIn: 'Prototyping & Automation tab'
  },
  {
    id: 'design-activity-detection',
    title: 'Design Activity Detection Automation',
    period: 'Owner, 2026',
    blurb:
      'Auto-discovers AI-generated design files across 17 scanned projects, which removed manual file registration from the daily reporting.',
        fullDetailIn: 'Prototyping & Automation tab'
  },
];

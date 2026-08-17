// The standards-stack write-up shown on the Design Systems & Standards page's
// lead tab, under the diagram in components/UxStandardsStack.tsx.
//
// Source: the layer diagram written up on 2026-08-16
// (KnowledgeBase/inbox/UXStandardsStack.html), itself grounded in
// KnowledgeBase/References/David Trick - Project List.md. Copy is carried over
// from that write-up rather than re-worded.
//
// One number is deliberately absent: the project list records 200+ design-feedback
// messages across cross-team code reviews, but David's own resume bullet for that
// role carries no figure, so neither does this. Don't add it back without asking.
//
// The diagram is the condensed view of the same layers listed below — if a layer
// changes here, the diagram has to change with it. They are two views of one
// stack, not two stacks.
//
// Deliberately no "where a builder meets it" field: that is what the diagram's
// right-hand column says, and duplicating it into the table both repeated the
// diagram and made the table wider than the content area. The diagram carries
// the effect of each layer; this data carries the definition.

export const UX_STANDARDS_INTRO =
  'Four authored layers on top of Cloudscape, each deriving from the layer above it. The point of the derivation is the right-hand column: every layer turns into a different kind of pressure on a feature while it is being built — an argument to cite, a rule already settled, a compliant starting point, a check before it ships.';

export const UX_STANDARDS_CAPTION =
  'Traceability runs both ways. Every component rule resolves upward to a design tenet, and every audit finding cites the tenet it violates rather than quoting a rule number — which is also what makes the 15 documented exceptions legitimate rather than erosion, since an exception is only expressible when there is a layer above the rule to justify it against. Synthesized from 6 source documents into one place, so there is a single answer rather than six partially-overlapping ones.';

export interface UxStandardsLayer {
  /** Layer number, or a word for the two layers that sit outside the numbering. */
  layer: string;
  name: string;
  /**
   * The size of the layer, with its own unit — "15 tenets", not a bare "15" in a
   * Count column. It reads as secondary text under the name rather than as a
   * column of its own: five columns clipped the last one at 1440px, and the unit
   * differs per row anyway, so a shared "Count" header was never quite honest.
   */
  countLabel: string;
  decides: string;
  /** The machine-checkable layer — the only one that can be run rather than read. */
  checkable?: boolean;
}

export const UX_STANDARDS_LAYERS: UxStandardsLayer[] = [
  {
    layer: 'base',
    name: 'Cloudscape',
    countLabel: 'component library',
    decides: 'AWS’s open-source design system — the component library everything is built from.',
  },
  {
    layer: '01',
    name: 'Design tenets',
    countLabel: '15 tenets',
    decides:
      'The philosophy. Start from the job. The system knows you. Filter, don’t flood. Progressive disclosure.',
  },
  {
    layer: '02',
    name: 'Standard tenets',
    countLabel: '19 tenets',
    decides:
      'What the philosophy requires by domain: navigation, visual language, data states, writing, permissions, data visualization, architecture.',
  },
  {
    layer: '03',
    name: 'Component specs',
    countLabel: '17 specs',
    decides: 'What to actually build, across all page types — the required and forbidden components for each.',
  },
  {
    layer: 'verify',
    name: 'Audit schema v2.5.1',
    countLabel: '103 rules',
    decides:
      'Whether any of the above actually happened. Machine-checkable rules across 13 page types, each traceable to a specific design tenet.',
    checkable: true,
  },
];

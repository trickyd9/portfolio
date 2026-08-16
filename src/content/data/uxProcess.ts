// The UX process write-up shown on the Design Systems & Standards page's
// "Design Process" tab, and linked from the About page.
//
// Source: the process flow David dictated and had written up on 2026-08-16
// (KnowledgeBase/inbox/UXProcessFlow-IntakeToSteadyState.html) — ten stages
// arranged around two loops. Copy is carried over from that write-up rather
// than re-worded, with one change: the "Draft 02" version marker is dropped,
// since internal draft numbering isn't something a site visitor should have to
// interpret.
//
// The four-phase diagram (components/UxProcessSummary.tsx) is the condensed
// view of these same ten stages: Discover 01–03, Define 04–05, Deliver 06–09,
// Sustain 10. If a stage below changes, the diagram has to change with it —
// they are two views of one process, not two processes.

export const UX_PROCESS_INTRO =
  'How a request becomes a maintained product. Ten stages, arranged around two loops: a tight one where scoping and mockups argue until they agree, and a wide one that turns over once per release phase until the scope is exhausted.';

export const UX_PROCESS_CAPTION =
  'Two loops carry the whole process. Scoping and mockups pass work back and forth until they agree, which is why they share a stage rather than sitting in sequence. The delivery cycle turns once per release phase — that return path is the only thing separating a one-shot launch from phased delivery. Everything else is a one-way handoff.';

export interface UxProcessStage {
  stage: string;
  activity: string;
  /** Who is in the room for this stage. */
  who: string;
  /** The exit condition — what has to be true before the stage is done. */
  movesOn: string;
  /** Part of one of the two loops, rather than a one-way handoff. */
  loop?: boolean;
}

export const UX_PROCESS_STAGES: UxProcessStage[] = [
  {
    stage: '01',
    activity: 'Project intake',
    who: 'Requester, UX',
    movesOn: 'The ask, its owner, and the driving constraint are written down.',
  },
  {
    stage: '02',
    activity: 'Feature team sync',
    who: 'Feature team, UX',
    movesOn: 'Everyone describes the project the same way, at a general level.',
  },
  {
    stage: '03',
    activity: 'User conversations',
    who: 'Users, UX',
    movesOn: "User stories are captured in the users' own terms, not the system's.",
  },
  {
    stage: '04a',
    activity: 'Scoping & phasing',
    who: 'Feature team, UX',
    movesOn: "Loops with 04b. Stops when what's in scope survives being drawn.",
    loop: true,
  },
  {
    stage: '04b',
    activity: 'Mockups & design doc',
    who: 'UX, feature team reviewers',
    movesOn: 'Loops with 04a. Stops when the mockups fit the agreed phases.',
    loop: true,
  },
  {
    stage: '05',
    activity: 'Design document finalized',
    who: 'Feature team, UX, approvers',
    movesOn: 'Mockups approved and phasing recorded in the document.',
  },
  {
    stage: '06',
    activity: 'Build the phase increment',
    who: 'Engineering, UX',
    movesOn: "A first draft of the phase's features is available and functioning.",
    loop: true,
  },
  {
    stage: '07',
    activity: 'User acceptance testing',
    who: 'Users, feature team, UX',
    movesOn: 'New requirements, launch blockers, and priority changes are all named.',
    loop: true,
  },
  {
    stage: '08',
    activity: 'Build / update',
    who: 'Engineering, UX',
    movesOn: 'No launch-blocking issues remain open.',
    loop: true,
  },
  {
    stage: '09',
    activity: 'Phase release',
    who: 'Engineering, feature team, UX',
    movesOn: 'Phase is out. Return to 06 for the next phase, or exit if scope is complete.',
    loop: true,
  },
  {
    stage: '10',
    activity: 'Maintain & solicit feedback',
    who: 'Users, feature team, UX',
    movesOn: 'Ongoing — revisit on roughly a six-month cadence.',
  },
];

export const UX_PROCESS_NOTE = {
  heading: 'Why user testing sits before the release, not after it',
  paragraphs: [
    'Stage 07 runs against a functioning first draft, not a finished phase — and it deliberately shows users the rollout still to come. That does two jobs at once: it catches launch blockers while they are still cheap to fix, and it turns the demo into a requirements-gathering session for phases that have not been built yet. Findings feed stage 08 before anything ships, so the release is the end of the turn rather than the thing being tested.',
    'The exit condition on the cycle is scope, not time: it turns until every scoped requirement is fulfilled. Anything raised in 07 that is not in scope lands in stage 10, where the six-month feedback cadence decides whether it becomes the next project’s intake.',
  ],
};

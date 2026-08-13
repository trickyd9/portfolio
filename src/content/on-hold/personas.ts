// ON HOLD (2026-08-13, David) — see this folder's README.
//
// The original 5-persona list from the project's PersonaWidgetSpec.md §1, which
// drove the first persona-switching dashboard. Nothing imports it: the live
// model is the 6 research personas in ../data/careerPersonaResearch.ts, whose
// findings drive the Persona Dashboard via the weights in
// ../data/personaDashboard.ts.
export type PersonaId =
  | 'recruiter'
  | 'hiring-manager'
  | 'ux-professional'
  | 'technical-peer'
  | 'other';

export interface Persona {
  id: PersonaId;
  label: string;
  goal: string;
}

export const PERSONAS: Persona[] = [
  { id: 'recruiter', label: 'Recruiter', goal: 'Fast scan: who is this, are they open to roles, how to contact' },
  { id: 'hiring-manager', label: 'Hiring Manager', goal: 'Depth: project impact, leadership, shipped outcomes' },
  { id: 'ux-professional', label: 'UX Professional / Peer', goal: 'Craft and process: research methodology, design systems' },
  { id: 'technical-peer', label: 'Technical / Engineering Peer', goal: 'Code architecture, CDK/React details, ME + CAD background' },
  { id: 'other', label: 'Other', goal: 'Open-ended general visitor' },
];

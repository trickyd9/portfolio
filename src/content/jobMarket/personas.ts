// Job-seeker personas for the Job Market Explorer — not to be confused with the
// visitor personas in ../personas.ts (Recruiter/Hiring Manager/etc., which describe
// who's *looking at* David's portfolio). These describe who's *looking for a job*.
// Extensible — add more roles as new companies/listings warrant them.

export type JobSeekerPersonaId = 'sde' | 'ux-designer' | 'mechanical-engineer';

export interface JobSeekerPersona {
  id: JobSeekerPersonaId;
  label: string;
}

export const JOB_SEEKER_PERSONAS: JobSeekerPersona[] = [
  { id: 'sde', label: 'Software Development Engineer' },
  { id: 'ux-designer', label: 'UX / Product Designer' },
  { id: 'mechanical-engineer', label: 'Mechanical Engineer' },
];

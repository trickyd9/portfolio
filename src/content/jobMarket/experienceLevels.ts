export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'staff';

export const EXPERIENCE_LEVELS: Array<{ id: ExperienceLevel; label: string }> = [
  { id: 'entry', label: 'Entry-level' },
  { id: 'mid', label: 'Mid-level' },
  { id: 'senior', label: 'Senior' },
  { id: 'staff', label: 'Staff+' },
];

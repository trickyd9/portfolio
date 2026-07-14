import type { SelectProps } from '@cloudscape-design/components/select';
import type { MultiselectProps } from '@cloudscape-design/components/multiselect';
import { JOB_SEEKER_PERSONAS } from './personas';

// Option lists + the settings shape for the Job Market Explorer's "Search
// settings" modal — kept out of SearchSettingsModal.tsx so that component
// file only exports the component itself (co-locating plain constants there
// breaks Fast Refresh; oxlint's react(only-export-components) rule flags it).

export const ADD_ROLES_OPTIONS: MultiselectProps.Option[] = JOB_SEEKER_PERSONAS.map((p) => ({
  value: p.id,
  label: p.label,
}));

export type SortBy = 'relevance' | 'newest' | 'compensation';
export const SORT_OPTIONS: SelectProps.Options = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'newest', label: 'Newest' },
  { value: 'compensation', label: 'Compensation' },
];

export const JOBS_PER_WIDGET_OPTIONS: SelectProps.Options = [
  { value: '2', label: '2 per company' },
  { value: '3', label: '3 per company' },
  { value: '5', label: '5 per company' },
  { value: 'all', label: 'All' },
];

export const DETAIL_LEVEL_OPTIONS: SelectProps.Options = [
  { value: 'compact', label: 'Compact' },
  { value: 'detailed', label: 'Detailed' },
];

export interface SearchSettingsValues {
  additionalRoles: MultiselectProps.Option[];
  sortBy: SelectProps.Option;
  jobsPerWidget: SelectProps.Option;
  detailLevel: SelectProps.Option;
}

import { useState } from 'react';
import Modal from '@cloudscape-design/components/modal';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Select from '@cloudscape-design/components/select';
import Multiselect from '@cloudscape-design/components/multiselect';

import {
  ADD_ROLES_OPTIONS,
  SORT_OPTIONS,
  JOBS_PER_WIDGET_OPTIONS,
  DETAIL_LEVEL_OPTIONS,
  type SearchSettingsValues,
} from '../content/jobMarket/searchSettings';

interface SearchSettingsModalProps {
  visible: boolean;
  onDismiss: () => void;
  initialValues: SearchSettingsValues;
  onSave: (values: SearchSettingsValues) => void;
}

// Staged/draft settings — unlike the keyword/level/location filters outside
// this modal (which apply on every keystroke/selection), these only take
// effect on Save. Mounted fresh each time the modal opens (see the `key` prop
// where this is rendered in JobMarketPage) so the draft always starts from
// the last-saved values rather than carrying over a discarded edit.
export default function SearchSettingsModal({ visible, onDismiss, initialValues, onSave }: SearchSettingsModalProps) {
  const [additionalRoles, setAdditionalRoles] = useState(initialValues.additionalRoles);
  const [sortBy, setSortBy] = useState(initialValues.sortBy);
  const [jobsPerWidget, setJobsPerWidget] = useState(initialValues.jobsPerWidget);
  const [detailLevel, setDetailLevel] = useState(initialValues.detailLevel);

  return (
    <Modal visible={visible} onDismiss={onDismiss} header="Search settings" size="medium">
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onDismiss}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onSave({ additionalRoles, sortBy, jobsPerWidget, detailLevel });
                onDismiss();
              }}
            >
              Save
            </Button>
          </SpaceBetween>
        }
      >
        <SpaceBetween size="l">
          <Box variant="p" color="text-body-secondary">
            Applies when you select Save.
          </Box>
          <FormField label="Add roles" description="Include more roles alongside your primary one.">
            <Multiselect
              selectedOptions={additionalRoles}
              onChange={({ detail }) => setAdditionalRoles([...detail.selectedOptions])}
              options={ADD_ROLES_OPTIONS}
              placeholder="No additional roles"
              ariaLabel="Add additional roles to the search"
              enableSelectAll
            />
          </FormField>
          <FormField label="Sort by" description="Order by relevance, recency, or pay.">
            <Select selectedOption={sortBy} onChange={({ detail }) => setSortBy(detail.selectedOption)} options={SORT_OPTIONS} />
          </FormField>
          <FormField label="Jobs shown per company" description="How many listings each card shows.">
            <Select
              selectedOption={jobsPerWidget}
              onChange={({ detail }) => setJobsPerWidget(detail.selectedOption)}
              options={JOBS_PER_WIDGET_OPTIONS}
            />
          </FormField>
          <FormField label="Detail level" description="Compact shows the top qualification; Detailed shows all of them.">
            <Select
              selectedOption={detailLevel}
              onChange={({ detail }) => setDetailLevel(detail.selectedOption)}
              options={DETAIL_LEVEL_OPTIONS}
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </Modal>
  );
}

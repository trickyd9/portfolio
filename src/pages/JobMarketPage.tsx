import { useState } from 'react';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Multiselect from '@cloudscape-design/components/multiselect';
import type { MultiselectProps } from '@cloudscape-design/components/multiselect';
import Select from '@cloudscape-design/components/select';
import type { SelectProps } from '@cloudscape-design/components/select';
import { Board, BoardItem } from '@cloudscape-design/board-components';
import type { BoardProps } from '@cloudscape-design/board-components';

import { COMPANIES, type CompanyId } from '../content/jobMarket/companies';
import { JOB_SEEKER_PERSONAS, type JobSeekerPersonaId } from '../content/jobMarket/personas';
import { EXPERIENCE_LEVELS, type ExperienceLevel } from '../content/jobMarket/experienceLevels';
import { getJobListings } from '../content/jobMarket/jobListings';
import type { JobBoardItemData } from '../content/jobMarket/boardItem';
import JobListingCard from '../components/JobListingCard';

const boardItemI18nStrings = {
  dragHandleAriaLabel: 'Drag handle',
  dragHandleAriaDescription:
    'Use Space or Enter to activate drag, arrow keys to move, Space or Enter to submit, or Escape to discard.',
  resizeHandleAriaLabel: 'Resize handle',
  resizeHandleAriaDescription:
    'Use Space or Enter to activate resize, arrow keys to resize, Space or Enter to submit, or Escape to discard.',
};

const boardI18nStrings: BoardProps.I18nStrings<JobBoardItemData['data']> = {
  liveAnnouncementDndStarted: (operationType) => (operationType === 'resize' ? 'Resizing' : 'Dragging'),
  liveAnnouncementDndItemReordered: () => 'Card order changed',
  liveAnnouncementDndItemResized: () => 'Card resized',
  liveAnnouncementDndItemInserted: () => 'Card inserted',
  liveAnnouncementDndCommitted: (operationType) => `${operationType} committed`,
  liveAnnouncementDndDiscarded: (operationType) => `${operationType} discarded`,
  liveAnnouncementItemRemoved: (op) => `Removed ${op.item.data.companyId}`,
  navigationAriaLabel: 'Job market board',
  navigationAriaDescription: 'Drag or use arrow keys to reorder company cards.',
  navigationItemAriaLabel: (item) => (item ? COMPANIES.find((c) => c.id === item.data.companyId)!.name : 'Empty'),
};

const ALL_LEVELS_OPTION: SelectProps.Option = { value: 'all', label: 'All experience levels' };
const LEVEL_OPTIONS: SelectProps.Options = [
  ALL_LEVELS_OPTION,
  ...EXPERIENCE_LEVELS.map((l) => ({ value: l.id, label: l.label })),
];

const PERSONA_OPTIONS: MultiselectProps.Option[] = JOB_SEEKER_PERSONAS.map((p) => ({ value: p.id, label: p.label }));

interface JobMarketPageProps {
  items: JobBoardItemData[];
  onItemsChange: (items: JobBoardItemData[]) => void;
}

export default function JobMarketPage({ items, onItemsChange }: JobMarketPageProps) {
  const [selectedPersonas, setSelectedPersonas] = useState<MultiselectProps.Option[]>(PERSONA_OPTIONS);
  const [selectedLevel, setSelectedLevel] = useState<SelectProps.Option>(ALL_LEVELS_OPTION);

  const activePersonaIds = new Set(selectedPersonas.map((o) => o.value as JobSeekerPersonaId));
  const activeLevel = selectedLevel.value as ExperienceLevel | 'all';

  const allListings = getJobListings();

  function listingsFor(companyId: CompanyId) {
    return allListings.filter(
      (listing) =>
        listing.companyId === companyId &&
        activePersonaIds.has(listing.persona) &&
        (activeLevel === 'all' || listing.experienceLevel === activeLevel),
    );
  }

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description="A persona-driven dashboard for exploring current tech job openings — built as a live demo of the same persona/filter dashboard UX used throughout this site. Listings are a curated snapshot (checked dates shown per card), not a live feed — see WIDGET-TRACKER.md for the plan to make this fully live."
        >
          Job Market Explorer
        </Header>
      }
    >
      <SpaceBetween size="l">
        <SpaceBetween size="xs" direction="horizontal">
          <div style={{ minWidth: '280px' }}>
            <Multiselect
              selectedOptions={selectedPersonas}
              onChange={({ detail }) => setSelectedPersonas([...detail.selectedOptions])}
              options={PERSONA_OPTIONS}
              placeholder="Filter by role"
              ariaLabel="Filter by job-seeker role"
              enableSelectAll
            />
          </div>
          <div style={{ minWidth: '220px' }}>
            <Select
              selectedOption={selectedLevel}
              onChange={({ detail }) => setSelectedLevel(detail.selectedOption)}
              options={LEVEL_OPTIONS}
              ariaLabel="Filter by experience level"
            />
          </div>
        </SpaceBetween>

        <Board<JobBoardItemData['data']>
          items={items}
          onItemsChange={(event) => onItemsChange([...event.detail.items])}
          i18nStrings={boardI18nStrings}
          empty={<Box textAlign="center">No companies on the board — add one from the panel.</Box>}
          renderItem={(item, actions) => {
            const company = COMPANIES.find((c) => c.id === item.data.companyId)!;
            const listings = listingsFor(company.id);
            return (
              <BoardItem
                header={<Header>{company.name}</Header>}
                i18nStrings={boardItemI18nStrings}
                settings={
                  <Button
                    iconName="close"
                    variant="icon"
                    ariaLabel={`Remove ${company.name}`}
                    onClick={() => actions.removeItem()}
                  />
                }
              >
                {listings.length > 0 ? (
                  <SpaceBetween size="s">
                    {listings.map((listing) => (
                      <JobListingCard key={listing.id} listing={listing} />
                    ))}
                  </SpaceBetween>
                ) : (
                  <Box color="text-status-inactive">
                    No {company.name} openings currently tracked for this filter.{' '}
                    <Link href={company.careersUrl} external>
                      Search live openings
                    </Link>
                  </Box>
                )}
              </BoardItem>
            );
          }}
        />
      </SpaceBetween>
    </ContentLayout>
  );
}

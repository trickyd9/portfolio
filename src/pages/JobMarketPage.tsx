import { useState } from 'react';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Link from '@cloudscape-design/components/link';
import Input from '@cloudscape-design/components/input';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Select from '@cloudscape-design/components/select';
import type { SelectProps } from '@cloudscape-design/components/select';
import { Board, BoardItem } from '@cloudscape-design/board-components';
import type { BoardProps } from '@cloudscape-design/board-components';

import { COMPANIES, type CompanyId } from '../content/jobMarket/companies';
import type { JobSeekerPersonaId } from '../content/jobMarket/personas';
import { EXPERIENCE_LEVELS, type ExperienceLevel } from '../content/jobMarket/experienceLevels';
import { getJobListings, type JobListing } from '../content/jobMarket/jobListings';
import type { JobBoardItemData } from '../content/jobMarket/boardItem';
import JobListingCard, { type DetailLevel } from '../components/JobListingCard';

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

const JOBS_PER_WIDGET_OPTIONS: SelectProps.Options = [
  { value: '2', label: '2 per company' },
  { value: '3', label: '3 per company' },
  { value: '5', label: '5 per company' },
  { value: 'all', label: 'All' },
];

const DETAIL_LEVEL_OPTIONS: SelectProps.Options = [
  { value: 'compact', label: 'Compact' },
  { value: 'detailed', label: 'Detailed' },
];

type SortBy = 'relevance' | 'newest' | 'compensation';
const SORT_OPTIONS: SelectProps.Options = [
  { value: 'relevance', label: 'Sort: Relevance' },
  { value: 'newest', label: 'Sort: Newest' },
  { value: 'compensation', label: 'Sort: Compensation' },
];

/** Extracts a comparable dollar figure from a free-text comp range like
 * "$100,600 – $199,000/yr" — takes the lower bound. Listings with no
 * disclosed range sort last regardless of direction. */
function compFloor(listing: JobListing): number {
  const match = listing.compensationRange?.match(/\$([\d,]+)/);
  return match ? Number(match[1].replace(/,/g, '')) : -Infinity;
}

function postedTime(listing: JobListing): number {
  return new Date(listing.postedOn ?? listing.checkedOn).getTime();
}

function sortListings(listings: JobListing[], sortBy: SortBy): JobListing[] {
  if (sortBy === 'newest') return [...listings].sort((a, b) => postedTime(b) - postedTime(a));
  if (sortBy === 'compensation') return [...listings].sort((a, b) => compFloor(b) - compFloor(a));
  return listings;
}

interface JobMarketPageProps {
  items: JobBoardItemData[];
  onItemsChange: (items: JobBoardItemData[]) => void;
  selectedPersonaIds: Set<JobSeekerPersonaId>;
}

export default function JobMarketPage({ items, onItemsChange, selectedPersonaIds }: JobMarketPageProps) {
  const [selectedLevel, setSelectedLevel] = useState<SelectProps.Option>(ALL_LEVELS_OPTION);
  const [jobsPerWidget, setJobsPerWidget] = useState<SelectProps.Option>(JOBS_PER_WIDGET_OPTIONS[1]);
  const [detailLevel, setDetailLevel] = useState<SelectProps.Option>(DETAIL_LEVEL_OPTIONS[0]);
  const [sortBy, setSortBy] = useState<SelectProps.Option>(SORT_OPTIONS[0]);
  const [keyword, setKeyword] = useState('');

  const activeLevel = selectedLevel.value as ExperienceLevel | 'all';
  const activeSort = sortBy.value as SortBy;
  const activeDetailLevel = detailLevel.value as DetailLevel;
  const cap = jobsPerWidget.value === 'all' ? Infinity : Number(jobsPerWidget.value);
  const keywordLower = keyword.trim().toLowerCase();

  const allListings = getJobListings();

  function matchesFilters(listing: JobListing) {
    if (!selectedPersonaIds.has(listing.persona)) return false;
    if (activeLevel !== 'all' && listing.experienceLevel !== activeLevel) return false;
    if (keywordLower) {
      const haystack = [listing.title, listing.location, ...listing.qualifications.required, ...listing.qualifications.preferred]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(keywordLower)) return false;
    }
    return true;
  }

  function listingsFor(companyId: CompanyId) {
    const matches = sortListings(allListings.filter((l) => l.companyId === companyId && matchesFilters(l)), activeSort);
    return { total: matches.length, shown: matches.slice(0, cap) };
  }

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description="A persona-driven dashboard for exploring current tech job openings — built as a live demo of the same persona/filter dashboard UX used throughout this site. Listings are a curated snapshot (checked dates shown per card), not a live feed — see WIDGET-TRACKER.md for the plan to make this fully live. Use the Role dropdown (top right) to filter by job-seeker persona."
        >
          Job Market Explorer
        </Header>
      }
    >
      <SpaceBetween size="l">
        <SpaceBetween size="xs" direction="horizontal">
          <div style={{ minWidth: '200px' }}>
            <Input
              value={keyword}
              onChange={({ detail }) => setKeyword(detail.value)}
              placeholder="Keyword search"
              type="search"
              ariaLabel="Keyword search"
            />
          </div>
          <div style={{ minWidth: '200px' }}>
            <Select
              selectedOption={selectedLevel}
              onChange={({ detail }) => setSelectedLevel(detail.selectedOption)}
              options={LEVEL_OPTIONS}
              ariaLabel="Filter by experience level"
            />
          </div>
          <div style={{ minWidth: '160px' }}>
            <Select
              selectedOption={sortBy}
              onChange={({ detail }) => setSortBy(detail.selectedOption)}
              options={SORT_OPTIONS}
              ariaLabel="Sort jobs"
            />
          </div>
          <div style={{ minWidth: '170px' }}>
            <Select
              selectedOption={jobsPerWidget}
              onChange={({ detail }) => setJobsPerWidget(detail.selectedOption)}
              options={JOBS_PER_WIDGET_OPTIONS}
              ariaLabel="Number of jobs shown per company"
            />
          </div>
          <div style={{ minWidth: '150px' }}>
            <Select
              selectedOption={detailLevel}
              onChange={({ detail }) => setDetailLevel(detail.selectedOption)}
              options={DETAIL_LEVEL_OPTIONS}
              ariaLabel="Detail level shown"
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
            const { total, shown } = listingsFor(company.id);
            return (
              <BoardItem
                header={
                  <Header counter={total > 0 ? `(${Math.min(shown.length, total)} of ${total})` : undefined}>
                    {company.name}
                  </Header>
                }
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
                {shown.length > 0 ? (
                  <SpaceBetween size="s">
                    {shown.map((listing) => (
                      <JobListingCard key={listing.id} listing={listing} detailLevel={activeDetailLevel} />
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

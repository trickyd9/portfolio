import { useCallback, useEffect, useState } from 'react';
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
import { LOCATION_OPTIONS, DEFAULT_LOCATION_ID, type LocationOptionId } from '../content/jobMarket/locations';
import { getStaticJobListings, getAnthropicFallbackListings, type JobListing } from '../content/jobMarket/jobListings';
import { fetchLiveListings, type LiveFetchResult } from '../content/jobMarket/liveListings';
import type { JobBoardItemData } from '../content/jobMarket/boardItem';
import JobListingCard, { type DetailLevel } from '../components/JobListingCard';
import SearchSettingsModal from '../components/SearchSettingsModal';
import {
  SORT_OPTIONS,
  JOBS_PER_WIDGET_OPTIONS,
  DETAIL_LEVEL_OPTIONS,
  type SortBy,
  type SearchSettingsValues,
} from '../content/jobMarket/searchSettings';

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

const LOCATION_SELECT_OPTIONS: SelectProps.Options = LOCATION_OPTIONS.map((l) => ({ value: l.id, label: l.label }));
const DEFAULT_LOCATION_OPTION = LOCATION_SELECT_OPTIONS.find((o) => o.value === DEFAULT_LOCATION_ID)!;

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
  /** Set from the header's single-select Role dropdown. */
  primaryPersonaId: JobSeekerPersonaId;
}

export default function JobMarketPage({ items, onItemsChange, primaryPersonaId }: JobMarketPageProps) {
  // Applied immediately, per David — these three plus the header's Role
  // dropdown are the "always visible, always live" filters.
  const [keyword, setKeyword] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<SelectProps.Option>(ALL_LEVELS_OPTION);
  const [selectedLocation, setSelectedLocation] = useState<SelectProps.Option>(DEFAULT_LOCATION_OPTION);

  // Everything else lives behind the settings modal — staged there, only
  // committed here on Save (see SearchSettingsModal.tsx).
  const [settings, setSettings] = useState<SearchSettingsValues>({
    additionalRoles: [],
    sortBy: SORT_OPTIONS[0],
    jobsPerWidget: JOBS_PER_WIDGET_OPTIONS[1],
    detailLevel: DETAIL_LEVEL_OPTIONS[0],
  });
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  // Bumped on every open so the modal's draft state remounts fresh from the
  // last-saved values instead of carrying over a discarded edit.
  const [settingsModalKey, setSettingsModalKey] = useState(0);

  // Anthropic is fetched live (see liveListings.ts) — the other 5 companies
  // are the static curated snapshot. No auto-refresh on filter changes (that
  // would mean refetching Greenhouse on every keystroke); a manual Refresh
  // button re-runs the fetch instead. Starts from the fallback snapshot so
  // the board has content immediately, then swaps in real data once the
  // first fetch resolves.
  const [liveResult, setLiveResult] = useState<LiveFetchResult | null>(null);
  const [liveLoading, setLiveLoading] = useState(true);

  const refreshLive = useCallback(() => {
    setLiveLoading(true);
    fetchLiveListings()
      .then(setLiveResult)
      .finally(() => setLiveLoading(false));
  }, []);

  useEffect(() => {
    refreshLive();
  }, [refreshLive]);

  const activeLevel = selectedLevel.value as ExperienceLevel | 'all';
  const activeLocation = selectedLocation.value as LocationOptionId;
  const activeSort = settings.sortBy.value as SortBy;
  const activeDetailLevel = settings.detailLevel.value as DetailLevel;
  const cap = settings.jobsPerWidget.value === 'all' ? Infinity : Number(settings.jobsPerWidget.value);
  const keywordLower = keyword.trim().toLowerCase();
  const activePersonaIds = new Set<JobSeekerPersonaId>([
    primaryPersonaId,
    ...settings.additionalRoles.map((o) => o.value as JobSeekerPersonaId),
  ]);

  const allListings = [...getStaticJobListings(), ...(liveResult?.listings ?? getAnthropicFallbackListings())];

  function matchesFilters(listing: JobListing) {
    if (!activePersonaIds.has(listing.persona)) return false;
    if (activeLevel !== 'all' && listing.experienceLevel !== activeLevel) return false;
    if (activeLocation !== 'all' && !listing.regions.includes(activeLocation)) return false;
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
          description="A persona-driven dashboard for exploring current tech job openings — built as a live demo of the same persona/filter dashboard UX used throughout this site. Anthropic's listings are fetched live; the other 5 companies are a curated snapshot (checked dates shown per card) — see JobMarketBackend.md for the plan to make more of this live. Use the Role dropdown (top right) to set your primary role."
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
          <div style={{ minWidth: '200px' }}>
            <Select
              selectedOption={selectedLocation}
              onChange={({ detail }) => setSelectedLocation(detail.selectedOption)}
              options={LOCATION_SELECT_OPTIONS}
              ariaLabel="Filter by location"
            />
          </div>
          <Button
            iconName="settings"
            ariaLabel="Search settings"
            onClick={() => {
              setSettingsModalKey((k) => k + 1);
              setSettingsModalVisible(true);
            }}
          >
            Search settings
          </Button>
          <Button iconName="refresh" ariaLabel="Refresh live listings" loading={liveLoading} onClick={refreshLive}>
            Refresh
          </Button>
        </SpaceBetween>

        <Box variant="small" color="text-body-secondary">
          {liveLoading
            ? 'Fetching Anthropic’s current openings…'
            : liveResult?.status === 'live'
              ? `Anthropic refreshed live at ${new Date(liveResult.fetchedAt).toLocaleTimeString()}.`
              : 'Anthropic’s live fetch failed — showing the last-known snapshot instead.'}
        </Box>

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
                    {shown.map((listing, index) => (
                      <JobListingCard
                        key={listing.id}
                        listing={listing}
                        detailLevel={activeDetailLevel}
                        isFirst={index === 0}
                      />
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

      <SearchSettingsModal
        key={settingsModalKey}
        visible={settingsModalVisible}
        onDismiss={() => setSettingsModalVisible(false)}
        initialValues={settings}
        onSave={setSettings}
      />
    </ContentLayout>
  );
}

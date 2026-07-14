import { useState } from 'react';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import ExpandableSection from '@cloudscape-design/components/expandable-section';

import type { JobListing } from '../content/jobMarket/jobListings';
import { EXPERIENCE_LEVELS } from '../content/jobMarket/experienceLevels';

const LEVEL_LABEL = Object.fromEntries(EXPERIENCE_LEVELS.map((l) => [l.id, l.label]));

export type DetailLevel = 'compact' | 'detailed';
// Compact shows only the single most important bullet in each list —
// "summarizes more extensively" per David — Detailed shows every bullet
// authored for the listing. This is a content-depth control, unrelated to
// whether the card is expanded or collapsed (see isFirst below).
const COMPACT_BULLET_COUNT = 1;

function QualificationList({ heading, items, detailLevel }: { heading: string; items: string[]; detailLevel: DetailLevel }) {
  if (items.length === 0) return null;
  const shown = detailLevel === 'compact' ? items.slice(0, COMPACT_BULLET_COUNT) : items;
  return (
    <div>
      <Box variant="strong" display="block">
        {heading}
      </Box>
      <ul style={{ margin: '2px 0 0', paddingLeft: '18px' }}>
        {shown.map((item) => (
          <li key={item}>
            <Box variant="small">{item}</Box>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface JobListingCardProps {
  listing: JobListing;
  detailLevel: DetailLevel;
  /** The first listing in each company's list defaults open, rest stay
   * collapsed — same standing "first expandable item defaults open"
   * convention used by EntryList elsewhere on the site (see WIDGET-TRACKER.md,
   * Tenet 4). Unaffected by detailLevel, which only controls content depth. */
  isFirst: boolean;
}

export default function JobListingCard({ listing, detailLevel, isFirst }: JobListingCardProps) {
  const [expandOverride, setExpandOverride] = useState<boolean | null>(null);
  const expanded = expandOverride ?? isFirst;

  const secondaryLine = `${listing.location} · ${LEVEL_LABEL[listing.experienceLevel]}${
    listing.compensationRange ? ` · ${listing.compensationRange}` : ''
  }`;

  return (
    <ExpandableSection
      variant="default"
      headerText={
        <Link href={listing.href} external fontSize="body-m">
          {listing.title}
        </Link>
      }
      headerDescription={secondaryLine}
      expanded={expanded}
      onChange={({ detail }) => setExpandOverride(detail.expanded)}
    >
      <SpaceBetween size="xs">
        <QualificationList heading="Required" items={listing.qualifications.required} detailLevel={detailLevel} />
        <QualificationList heading="Preferred" items={listing.qualifications.preferred} detailLevel={detailLevel} />
        <Box variant="small" color="text-status-inactive">
          Checked {listing.checkedOn}
          {listing.postedOn ? ` · Posted ${listing.postedOn}` : ''}
        </Box>
      </SpaceBetween>
    </ExpandableSection>
  );
}

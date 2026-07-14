import { useState } from 'react';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import ExpandableSection from '@cloudscape-design/components/expandable-section';

import type { JobListing } from '../content/jobMarket/jobListings';
import { EXPERIENCE_LEVELS } from '../content/jobMarket/experienceLevels';

const LEVEL_LABEL = Object.fromEntries(EXPERIENCE_LEVELS.map((l) => [l.id, l.label]));

export type DetailLevel = 'compact' | 'detailed';

function QualificationList({ heading, items }: { heading: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <Box variant="strong" display="block">
        {heading}
      </Box>
      <ul style={{ margin: '2px 0 0', paddingLeft: '18px' }}>
        {items.map((item) => (
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
  /** The first listing in each company's list defaults open — same standing
   * "first expandable item defaults open" convention used by EntryList
   * elsewhere on the site (see WIDGET-TRACKER.md, Tenet 4). */
  isFirst: boolean;
}

export default function JobListingCard({ listing, detailLevel, isFirst }: JobListingCardProps) {
  const [expandOverride, setExpandOverride] = useState<boolean | null>(null);
  const expanded = expandOverride ?? (isFirst || detailLevel === 'detailed');

  return (
    <div style={{ borderTop: '1px solid rgba(128, 128, 128, 0.25)', paddingTop: '10px' }}>
      <SpaceBetween size="xxs">
        <Link href={listing.href} external fontSize="body-m">
          {listing.title}
        </Link>
        <Box variant="small" color="text-body-secondary">
          {listing.location} · {LEVEL_LABEL[listing.experienceLevel]}
          {listing.compensationRange ? ` · ${listing.compensationRange}` : ''}
        </Box>

        <ExpandableSection
          variant="default"
          headerText="Qualifications"
          expanded={expanded}
          onChange={({ detail }) => setExpandOverride(detail.expanded)}
        >
          <SpaceBetween size="xs">
            <QualificationList heading="Required" items={listing.qualifications.required} />
            <QualificationList heading="Preferred" items={listing.qualifications.preferred} />
          </SpaceBetween>
        </ExpandableSection>

        <Box variant="small" color="text-status-inactive">
          Checked {listing.checkedOn}
          {listing.postedOn ? ` · Posted ${listing.postedOn}` : ''}
        </Box>
      </SpaceBetween>
    </div>
  );
}

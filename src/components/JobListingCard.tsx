import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';

import type { JobListing } from '../content/jobMarket/jobListings';
import { EXPERIENCE_LEVELS } from '../content/jobMarket/experienceLevels';

const LEVEL_LABEL = Object.fromEntries(EXPERIENCE_LEVELS.map((l) => [l.id, l.label]));

export default function JobListingCard({ listing }: { listing: JobListing }) {
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
        <ul style={{ margin: '4px 0 0', paddingLeft: '18px' }}>
          {listing.requirements.map((req) => (
            <li key={req}>
              <Box variant="small">{req}</Box>
            </li>
          ))}
        </ul>
        <Box variant="small" color="text-status-inactive">
          Checked {listing.checkedOn}
        </Box>
      </SpaceBetween>
    </div>
  );
}

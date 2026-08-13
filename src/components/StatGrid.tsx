import ColumnLayout from '@cloudscape-design/components/column-layout';
import Box from '@cloudscape-design/components/box';

// A clean row of KPI-style stats — Cloudscape's own canonical pattern for this
// (text-grid + vertical borders), used to give a page's Overview tab real
// content instead of a single stray `stat` block with no visual hierarchy.
//
// A `size="small"` variant (smaller `h3` values instead of `awsui-value-large`)
// existed for stat rows repeated several times on one page — its only caller
// was the Featured Projects page's three 2025 launches, whose metrics were
// removed 2026-08-13, so the prop went with them. Both remaining call sites
// (AWS Persona and Career Persona Research overviews) are single page-level
// "by the numbers" moments, which is what the large treatment is for.
export function StatGrid({ stats }: { stats: Array<{ value: string; label: string }> }) {
  return (
    <ColumnLayout columns={stats.length} variant="text-grid" borders="vertical">
      {stats.map((stat) => (
        <div key={stat.label}>
          <Box variant="awsui-value-large" fontWeight="bold" display="block">
            {stat.value}
          </Box>
          <Box variant="small" color="text-body-secondary" display="block">
            {stat.label}
          </Box>
        </div>
      ))}
    </ColumnLayout>
  );
}

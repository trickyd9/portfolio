import ColumnLayout from '@cloudscape-design/components/column-layout';
import Box from '@cloudscape-design/components/box';

// A clean row of KPI-style stats — Cloudscape's own canonical pattern for this
// (text-grid + vertical borders), used to give a page's Overview tab real
// content instead of a single stray `stat` block with no visual hierarchy.
//
// `size="small"`: for stat rows repeated several times on one page (e.g.
// Featured Projects' three 2025 launches, one row each) — the full
// `awsui-value-large` treatment reads right for a single page-level "by the
// numbers" moment, but stacked three times it gets heavy. Default stays
// `large` so every existing call site (Persona Research's Overview, etc.) is
// unaffected.
export function StatGrid({
  stats,
  size = 'large',
}: {
  stats: Array<{ value: string; label: string }>;
  size?: 'large' | 'small';
}) {
  return (
    <ColumnLayout columns={stats.length} variant="text-grid" borders="vertical">
      {stats.map((stat) => (
        <div key={stat.label}>
          <Box variant={size === 'large' ? 'awsui-value-large' : 'h3'} fontWeight="bold" display="block">
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

import ColumnLayout from '@cloudscape-design/components/column-layout';
import Box from '@cloudscape-design/components/box';

// A clean row of KPI-style stats — Cloudscape's own canonical pattern for this
// (text-grid + vertical borders), used to give a page's Overview tab real
// content instead of a single stray `stat` block with no visual hierarchy.
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

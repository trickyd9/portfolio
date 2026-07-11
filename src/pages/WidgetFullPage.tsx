import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import type { WidgetDefinition } from '../content/widgets';

// Placeholder full-page view for a widget — content to be refined per WIDGET-TRACKER.md.
// Breadcrumbs (in App.tsx, via AppLayout's breadcrumbs slot) handle navigating back.
export default function WidgetFullPage({ widget }: { widget: WidgetDefinition }) {
  return (
    <ContentLayout header={<Header variant="h1">{widget.title}</Header>}>
      <Container header={<Header variant="h2">Placeholder content</Header>}>
        <SpaceBetween size="s">
          <Box variant="p">{widget.fullPage}</Box>
          <Box variant="small" color="text-status-inactive">
            This page isn't written yet — see WIDGET-TRACKER.md to refine {widget.title}.
          </Box>
        </SpaceBetween>
      </Container>
    </ContentLayout>
  );
}

import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import type { WidgetDefinition } from '../content/widgets';
import Widget from '../widgets/Widget';

// Full-page view for a widget — reuses the same shared Widget component and content
// as the dashboard card, in its expanded form. Case-study-style visual treatment
// (beyond the shared block rendering) can come later — see WIDGET-TRACKER.md.
export default function WidgetFullPage({ widget }: { widget: WidgetDefinition }) {
  return (
    <ContentLayout header={<Header variant="h1">{widget.title}</Header>}>
      <Container>
        <Widget widgetId={widget.id} mode="expanded" />
      </Container>
    </ContentLayout>
  );
}

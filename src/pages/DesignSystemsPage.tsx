import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Tabs from '@cloudscape-design/components/tabs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { TENETS_AUDIT, STANDARDS_WEBSITE, ROADMAP_ENABLEMENT } from '../content/data/designSystemsFull';
import { EntryGroupTab, EntryList } from '../components/EntrySection';
import Widget from '../widgets/Widget';

// Design Systems & Standards full page. Overview reuses the dashboard widget's
// existing pitch, plus the Standards Website project folded in (it's a single
// entry — too thin to justify its own tab, per feedback that a few of these
// pages' Overview tabs were sparse while some grouped tabs were near-empty).
// The remaining tabs are the full project-list detail behind the pitch
// (content/data/designSystemsFull.ts) — see WIDGET-TRACKER.md.
export default function DesignSystemsPage() {
  return (
    <ContentLayout header={<Header variant="h1">Design Systems & Standards</Header>}>
      <Tabs
        tabs={[
          {
            id: 'overview',
            label: 'Overview',
            content: (
              <SpaceBetween size="l">
                <Container header={<Header variant="h2">Design Systems & Standards</Header>}>
                  <Widget widgetId="design-systems-standards" mode="expanded" />
                </Container>
                <Container header={<Header variant="h2">UX Standards Website</Header>}>
                  <EntryList entries={[STANDARDS_WEBSITE]} />
                </Container>
              </SpaceBetween>
            ),
          },
          { id: 'tenets-audit', label: 'Tenets & Audit', content: <EntryGroupTab entries={TENETS_AUDIT} /> },
          { id: 'roadmap-enablement', label: 'Roadmap & Enablement', content: <EntryGroupTab entries={ROADMAP_ENABLEMENT} /> },
        ]}
      />
    </ContentLayout>
  );
}

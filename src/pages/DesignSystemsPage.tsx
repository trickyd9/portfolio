import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Tabs from '@cloudscape-design/components/tabs';
import { TENETS_AUDIT, STANDARDS_WEBSITE, ROADMAP_ENABLEMENT } from '../content/data/designSystemsFull';
import { EntryGroupTab, EntryList } from '../components/EntrySection';
import Widget from '../widgets/Widget';

// Design Systems & Standards full page, on the shared project-page standard
// (2026-08-13, matching Featured Projects): the lead tab is named for its
// content rather than "Overview", every tab's container carries an h2 header,
// and each tab holds one kind of thing. The Standards Website used to be folded
// into the lead tab as a second container; it's a project, so it gets its own
// tab like the launches did on Featured Projects. The grouped tabs are the full
// project-list detail behind the pitch (content/data/designSystemsFull.ts) —
// see WIDGET-TRACKER.md.
export default function DesignSystemsPage() {
  return (
    <ContentLayout header={<Header variant="h1">Design Systems & Standards</Header>}>
      <Tabs
        tabs={[
          {
            id: 'design-systems',
            label: 'Design Systems & Standards',
            content: (
              <Container header={<Header variant="h2">Design Systems & Standards</Header>}>
                <Widget widgetId="design-systems-standards" mode="expanded" />
              </Container>
            ),
          },
          {
            id: 'standards-website',
            label: 'UX Standards Website',
            content: (
              <Container header={<Header variant="h2">UX Standards Website</Header>}>
                <EntryList entries={[STANDARDS_WEBSITE]} />
              </Container>
            ),
          },
          {
            id: 'tenets-audit',
            label: 'Tenets & Audit',
            content: <EntryGroupTab entries={TENETS_AUDIT} header="Tenets & Audit" />,
          },
          {
            id: 'roadmap-enablement',
            label: 'Roadmap & Enablement',
            content: <EntryGroupTab entries={ROADMAP_ENABLEMENT} header="Roadmap & Enablement" />,
          },
        ]}
      />
    </ContentLayout>
  );
}

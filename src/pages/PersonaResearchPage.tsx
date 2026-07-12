import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Tabs from '@cloudscape-design/components/tabs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { PERSONA_FRAMEWORK, VALIDATION_FEEDBACK, DASHBOARDS_VISION } from '../content/data/personaResearch';
import { EntryGroupTab } from '../components/EntrySection';
import { StatGrid } from '../components/StatGrid';
import Widget from '../widgets/Widget';

const HIGHLIGHTS = [
  { value: '20', label: 'documented personas' },
  { value: '6', label: 'job-family categories' },
  { value: '4', label: 'interactive dashboards' },
  { value: '112', label: 'validation questions' },
];

// Persona-Driven Research Showcase full page. Overview reuses the dashboard
// widget's existing pitch plus a real stat row (none of the 3 grouped tabs
// here are thin enough to fold in, unlike the other 3 specialization pages —
// see WIDGET-TRACKER.md for why Overview enrichment differs per page). The
// three grouped tabs are the full project-list detail behind it
// (content/data/personaResearch.ts).
export default function PersonaResearchPage() {
  return (
    <ContentLayout header={<Header variant="h1">Persona-Driven Research Showcase</Header>}>
      <Tabs
        tabs={[
          {
            id: 'overview',
            label: 'Overview',
            content: (
              <SpaceBetween size="l">
                <Container header={<Header variant="h2">Persona-Driven Research Showcase</Header>}>
                  <Widget widgetId="persona-research-showcase" mode="expanded" />
                </Container>
                <Container header={<Header variant="h2">By the numbers</Header>}>
                  <StatGrid stats={HIGHLIGHTS} />
                </Container>
              </SpaceBetween>
            ),
          },
          { id: 'framework', label: 'Persona Framework', content: <EntryGroupTab entries={PERSONA_FRAMEWORK} /> },
          { id: 'validation', label: 'Validation & Feedback', content: <EntryGroupTab entries={VALIDATION_FEEDBACK} /> },
          { id: 'dashboards', label: 'Dashboards & Vision', content: <EntryGroupTab entries={DASHBOARDS_VISION} /> },
        ]}
      />
    </ContentLayout>
  );
}

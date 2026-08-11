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

// AWS Persona full page (renamed 2026-08-10 from "Persona-Driven Research
// Showcase," relocated out of the Projects nav group into the top-level
// Persona section — see WIDGET-TRACKER.md). No content/tab changes from the
// rename itself. Overview reuses the dashboard widget's existing pitch plus a
// real stat row (none of the 3 grouped tabs here are thin enough to fold in,
// unlike the other 3 specialization pages — see WIDGET-TRACKER.md for why
// Overview enrichment differs per page). The three grouped tabs are the full
// project-list detail behind it (content/data/personaResearch.ts).
export default function PersonaResearchPage() {
  return (
    <ContentLayout
      header={
        <Header variant="h1" description="Amazon Web Services — persona-driven UX research & documentation system">
          AWS Persona
        </Header>
      }
    >
      <Tabs
        tabs={[
          {
            id: 'overview',
            label: 'Overview',
            content: (
              <SpaceBetween size="l">
                <Container header={<Header variant="h2">AWS Persona</Header>}>
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

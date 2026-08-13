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
// Showcase" — see WIDGET-TRACKER.md), on the shared project-page standard
// (2026-08-13, matching Featured Projects): the lead tab is named for its
// content rather than "Overview", and every tab's container carries an h2
// header. The three grouped tabs are the full project-list detail behind the
// pitch (content/data/personaResearch.ts).
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
            id: 'aws-persona',
            label: 'AWS Persona',
            content: (
              <SpaceBetween size="l">
                <Container header={<Header variant="h2">AWS Persona</Header>}>
                  <Widget widgetId="persona-research-showcase" mode="expanded" />
                </Container>
                {/* The one place this page still stacks two containers in a
                    single tab, which the standard otherwise avoids. Left as-is
                    deliberately: this stat row is the intended content of the
                    status card that will sit above the tabs on all three
                    project pages, so it moves up rather than sideways once
                    David settles the hero metrics. Removing it first would
                    just drop real content in the meantime. */}
                <Container header={<Header variant="h2">By the numbers</Header>}>
                  <StatGrid stats={HIGHLIGHTS} />
                </Container>
              </SpaceBetween>
            ),
          },
          {
            id: 'framework',
            label: 'Persona Framework',
            content: <EntryGroupTab entries={PERSONA_FRAMEWORK} header="Persona Framework" />,
          },
          {
            id: 'validation',
            label: 'Validation & Feedback',
            content: <EntryGroupTab entries={VALIDATION_FEEDBACK} header="Validation & Feedback" />,
          },
          {
            id: 'dashboards',
            label: 'Dashboards & Vision',
            content: <EntryGroupTab entries={DASHBOARDS_VISION} header="Dashboards & Vision" />,
          },
        ]}
      />
    </ContentLayout>
  );
}

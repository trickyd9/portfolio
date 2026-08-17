import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Tabs from '@cloudscape-design/components/tabs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Table from '@cloudscape-design/components/table';
import Divider from '@cloudscape-design/components/divider';
import { PERSONA_FRAMEWORK, VALIDATION_FEEDBACK, DASHBOARDS_VISION } from '../content/data/personaResearch';
import { PERSONA_LIFECYCLE, PERSONA_LIFECYCLE_CAPTION, PERSONA_LIFECYCLE_INTRO } from '../content/data/personaLifecycle';
import { EntryGroupTab } from '../components/EntrySection';
import { PersonaLifecycle } from '../components/PersonaLifecycle';
import { ProjectPopover } from '../components/ProjectPopover';
import Widget from '../widgets/Widget';


// The lead tab. It used to be the widget plus a stat row; the lifecycle diagram
// was added 2026-08-17 so the page opens by *showing* that personas are generated,
// proven and then built into the product, and that field feedback returns to the
// start — the loop being the thing no prose on the page carried.
//
// Structure deliberately mirrors DesignSystemsPage's lead tab (intro, diagram,
// caption, divider, detail table, divider, widget) so the two project pages read
// as one family. The difference is the table's last column: each stage lists its
// projects as popovers, which is what David asked for here.
function LifecycleTab() {
  return (
    <Container header={<Header variant="h2">AWS Persona</Header>}>
      <SpaceBetween size="l">
        <Box variant="p">{PERSONA_LIFECYCLE_INTRO}</Box>
        <PersonaLifecycle />
        <Box variant="small" color="text-body-secondary">
          {PERSONA_LIFECYCLE_CAPTION}
        </Box>
        <Divider />
        {/* `variant="embedded"` — already inside a Container, per the site's
            no-container-in-container rule. `wrapLines` because the "What
            happens" cells are full sentences; Cloudscape defaults it to false,
            which clips rather than wraps. */}
        <Table
          variant="embedded"
          wrapLines
          header={<Header variant="h3">Stage detail</Header>}
          items={PERSONA_LIFECYCLE}
          columnDefinitions={[
            { id: 'stage', header: 'Stage', cell: (item) => item.number, width: 80 },
            {
              id: 'name',
              header: 'What it is',
              width: 190,
              cell: (item) => (
                <>
                  <Box variant="strong" display="block">
                    {item.name}
                  </Box>
                  <Box variant="small" color="text-body-secondary" display="block">
                    {item.count}
                  </Box>
                </>
              ),
            },
            { id: 'happens', header: 'What happens', cell: (item) => item.happens },
            {
              id: 'projects',
              header: 'Projects',
              width: 260,
              cell: (item) => (
                <SpaceBetween size="xxs">
                  {item.projects.map((project) => (
                    <ProjectPopover key={project.id} project={project} />
                  ))}
                </SpaceBetween>
              ),
            },
          ]}
        />
        <Divider />
        <Widget widgetId="persona-research-showcase" mode="expanded" />
      </SpaceBetween>
    </Container>
  );
}

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
        <Header variant="h1" description="Amazon Web Services: persona-driven UX research & documentation system">
          AWS Persona
        </Header>
      }
    >
      <Tabs
        tabs={[
          {
            id: 'aws-persona',
            label: 'AWS Persona',
            // The "By the numbers" stat row that used to sit under this tab was
            // removed 2026-08-17 (David): it repeated numbers the diagram and the
            // widget already carry, and no other project page has one. That also
            // ends the two-containers-in-one-tab exception this page was carrying.
            content: <LifecycleTab />,
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

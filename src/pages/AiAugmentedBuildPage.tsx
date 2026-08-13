import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Tabs from '@cloudscape-design/components/tabs';
import { AGENTS_AUDITING, PROTOTYPING_PIPELINE, AUTOMATION_TOOLS } from '../content/data/aiAugmentedBuildFull';
import { EntryGroupTab, EntryLines } from '../components/EntrySection';
import Widget from '../widgets/Widget';

// AI-Augmented Build full page, on the shared project-page standard
// (2026-08-13, matching Featured Projects): the lead tab is named for its
// content rather than "Overview", every tab's container carries an h2 header,
// and each tab holds one kind of thing. The Figma Make pipeline used to be
// folded into the lead tab as a second container; it's a project, so it gets
// its own tab. The grouped tabs are the full project-list detail behind the
// pitch (content/data/aiAugmentedBuildFull.ts) — see WIDGET-TRACKER.md.
export default function AiAugmentedBuildPage() {
  return (
    <ContentLayout header={<Header variant="h1">AI-Augmented Build</Header>}>
      <Tabs
        tabs={[
          {
            id: 'ai-augmented-build',
            label: 'AI-Augmented Build',
            content: (
              <Container header={<Header variant="h2">AI-Augmented Build</Header>}>
                <Widget widgetId="ai-augmented-build" mode="expanded" />
              </Container>
            ),
          },
          {
            id: 'prototyping-pipeline',
            label: 'Figma Make → React Pipeline',
            content: (
              <Container header={<Header variant="h2">Figma Make → React Prototyping Pipeline</Header>}>
                <EntryLines entries={[PROTOTYPING_PIPELINE]} />
              </Container>
            ),
          },
          {
            id: 'agents-auditing',
            label: 'Agents & Auditing',
            content: <EntryGroupTab entries={AGENTS_AUDITING} header="Agents & Auditing" />,
          },
          {
            id: 'automation-tools',
            label: 'Automation Tools',
            content: <EntryGroupTab entries={AUTOMATION_TOOLS} header="Automation Tools" />,
          },
        ]}
      />
    </ContentLayout>
  );
}

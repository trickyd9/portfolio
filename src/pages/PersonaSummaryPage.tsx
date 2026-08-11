import { useParams } from 'react-router-dom';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import type { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';
import Link from '@cloudscape-design/components/link';
import Alert from '@cloudscape-design/components/alert';
import { BulletList } from '../components/EntrySection';
import {
  CAREER_PERSONA_RESEARCH,
  CONFIDENCE_TIER_LABEL,
  RESEARCH_QUESTIONS,
  type ConfidenceTier,
  type ResearchPersonaId,
} from '../content/data/careerPersonaResearch';

const TIER_STATUS_TYPE: Record<ConfidenceTier, StatusIndicatorProps.Type> = {
  'single-voice': 'pending',
  substantiated: 'info',
  verified: 'success',
};

// One component serves all 6 persona wrap-sheet pages — the personas differ
// only in data, so a `:personaId` route param picks the record rather than
// there being six near-identical page files. Wrap sheets are ~one page each,
// so this is a single scrolling page of Containers rather than a tabbed
// layout: tabs would hide roughly half of a page-length document behind a
// click for no benefit.
export default function PersonaSummaryPage() {
  const { personaId } = useParams<{ personaId: ResearchPersonaId }>();
  const persona = CAREER_PERSONA_RESEARCH.find((p) => p.id === personaId);

  if (!persona) {
    return (
      <ContentLayout header={<Header variant="h1">Persona not found</Header>}>
        <Alert type="error" header="No such persona">
          <SpaceBetween size="s">
            <Box variant="p">There's no researched persona with the id "{personaId}".</Box>
            <Link href="#/career-persona-research">Back to Career Persona Research</Link>
          </SpaceBetween>
        </Alert>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description="How this kind of visitor reads a design portfolio, and what the evidence behind that looks like"
          actions={<Link href="#/career-persona-research">All personas</Link>}
        >
          {persona.label}
        </Header>
      }
    >
      <SpaceBetween size="l">
        <Container header={<Header variant="h2">How they read a portfolio</Header>}>
          <Box variant="p">{persona.tagline}</Box>
        </Container>

        <Container header={<Header variant="h2">What they look for</Header>}>
          <BulletList items={persona.looksFor} />
        </Container>

        <Container header={<Header variant="h2">What loses them</Header>}>
          <BulletList items={persona.losesThem} />
        </Container>

        <Container header={<Header variant="h2">What catches their eye</Header>}>
          <BulletList items={persona.drawsAttention} />
        </Container>

        <Container header={<Header variant="h2">How AI is changing this</Header>}>
          <Box variant="p">{persona.aiEraNote}</Box>
        </Container>

        <Container
          header={
            <Header variant="h2" description="How well-evidenced each finding is, rated question by question">
              Confidence in these findings
            </Header>
          }
        >
          <SpaceBetween size="m">
            <ColumnLayout columns={5} variant="text-grid" borders="vertical">
              {RESEARCH_QUESTIONS.map((question, index) => (
                <div key={question.id}>
                  <Box variant="awsui-key-label" display="block">
                    {question.short}
                  </Box>
                  <StatusIndicator type={TIER_STATUS_TYPE[persona.confidence[index]]}>
                    {CONFIDENCE_TIER_LABEL[persona.confidence[index]]}
                  </StatusIndicator>
                  <Box variant="small" color="text-body-secondary" display="block" padding={{ top: 'xxs' }}>
                    {question.label}
                  </Box>
                </div>
              ))}
            </ColumnLayout>
            {persona.confidenceNote && (
              <Alert type="info" header="Where the evidence is thin">
                {persona.confidenceNote}
              </Alert>
            )}
          </SpaceBetween>
        </Container>
      </SpaceBetween>
    </ContentLayout>
  );
}

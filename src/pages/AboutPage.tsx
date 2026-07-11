import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';
import { CONTACT } from '../content/contact';
import { WIDGETS } from '../content/widgets';

// About Me's dedicated full page — first widget graduated past the generic
// WidgetFullPage placeholder (see WIDGET-TRACKER.md). Case-study-style visual
// treatment still pending a design reference.
export default function AboutPage() {
  return (
    <ContentLayout
      header={
        <SpaceBetween size="xs">
          <Header variant="h1">{CONTACT.name}</Header>
          <Box variant="p" color="text-body-secondary">
            {CONTACT.phone} &nbsp;|&nbsp; {CONTACT.email} &nbsp;|&nbsp;{' '}
            <Link href={CONTACT.linkedinHref} external>
              {CONTACT.linkedinLabel}
            </Link>
          </Box>
        </SpaceBetween>
      }
    >
      <Container header={<Header variant="h2">Placeholder content</Header>}>
        <SpaceBetween size="s">
          <Box variant="p">{WIDGETS['about-me'].fullPage}</Box>
          <Box variant="small" color="text-status-inactive">
            This page isn't written yet — see WIDGET-TRACKER.md to refine About Me.
          </Box>
        </SpaceBetween>
      </Container>
    </ContentLayout>
  );
}

import Popover from '@cloudscape-design/components/popover';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import type { PopoverProject } from '../content/data/entry';

// A project named on a diagram, with its short description in a popover off the
// title. Extracted here 2026-08-17 when the AI-Augmented Build page gained the
// same treatment the AWS Persona page already had — two identical copies in two
// page files was the duplication this folder exists to prevent.
//
// The footer line is the load-bearing part. Both pages carry these popovers on a
// lead tab whose sibling tabs hold the same projects in full, so the popover's
// job is to *identify* a project and say where the detail is, not to be a second
// copy of it. Keep `blurb` short for that reason.
export function ProjectPopover({ project }: { project: PopoverProject }) {
  return (
    <Popover
      header={project.title}
      size="large"
      triggerType="text"
      dismissButton
      content={
        <SpaceBetween size="xs">
          <Box variant="small" color="text-body-secondary">
            {project.period}
          </Box>
          <Box variant="p">{project.blurb}</Box>
          <Box variant="small" color="text-body-secondary">
            Full detail on the {project.fullDetailIn}.
          </Box>
        </SpaceBetween>
      }
    >
      {project.title}
    </Popover>
  );
}

/** The labelled row of popover triggers used under a diagram stage or layer. */
export function ProjectRow({ projects, label }: { projects: PopoverProject[]; label: string }) {
  return (
    <div>
      <Box variant="small" color="text-body-secondary" display="block" padding={{ bottom: 'xxs' }}>
        {label}
      </Box>
      <SpaceBetween direction="horizontal" size="l">
        {projects.map((project) => (
          <ProjectPopover key={project.id} project={project} />
        ))}
      </SpaceBetween>
    </div>
  );
}

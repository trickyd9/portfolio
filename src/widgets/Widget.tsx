import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Badge from '@cloudscape-design/components/badge';
import Link from '@cloudscape-design/components/link';
import Button from '@cloudscape-design/components/button';

import type { WidgetId } from '../content/widgets';
import { WIDGET_CONTENT } from '../content/widgetContent';
import type { Block } from './blocks';

// The single component every board item renders through, regardless of which
// widget it is — content shape lives in blocks (WIDGET_CONTENT), not in bespoke
// per-widget components, so formatting stays consistent across all of them and can
// be refined in one place. See WIDGET-TRACKER.md.
export default function Widget({ widgetId, mode }: { widgetId: WidgetId; mode: 'compact' | 'expanded' }) {
  const blocks = WIDGET_CONTENT[widgetId][mode];
  return (
    <SpaceBetween size="s">
      {blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </SpaceBetween>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'heading':
      return (
        <Box variant="h3" padding={{ top: 'xs' }}>
          {block.text}
        </Box>
      );

    case 'text':
      return (
        <Box variant="p" color={block.secondary ? 'text-body-secondary' : undefined}>
          {block.text}
        </Box>
      );

    case 'stat':
      return (
        <div>
          <Box variant="awsui-value-large" fontWeight="bold" display="block">
            {block.value}
          </Box>
          <Box variant="small" color="text-body-secondary" display="block">
            {block.label}
          </Box>
        </div>
      );

    case 'tags':
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {block.items.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      );

    case 'list':
      return (
        <SpaceBetween size="xs">
          {block.items.map((item, index) => (
            <div key={index}>
              {item.href ? (
                <Link href={item.href} fontSize="body-m">
                  {item.primary}
                </Link>
              ) : (
                <Box variant="p">{item.primary}</Box>
              )}
              {item.secondary && (
                <Box variant="small" color="text-body-secondary">
                  {item.secondary}
                </Box>
              )}
            </div>
          ))}
        </SpaceBetween>
      );

    case 'timeline':
      return (
        <SpaceBetween size="s">
          {block.items.map((item, index) => (
            <div key={index}>
              <Box variant="strong" display="block">
                {item.title}
              </Box>
              <Box variant="small" display="block" color="text-body-secondary">
                {item.period}
              </Box>
              {item.detail && <Box variant="p">{item.detail}</Box>}
            </div>
          ))}
        </SpaceBetween>
      );

    case 'quote':
      return (
        <div style={{ borderLeft: '3px solid rgba(128, 128, 128, 0.4)', paddingLeft: '12px' }}>
          <Box variant="p" fontSize="heading-s">
            “{block.text}”
          </Box>
          <Box variant="small" display="block" color="text-body-secondary">
            — {block.attribution}
          </Box>
        </div>
      );

    case 'linkList':
      return (
        <SpaceBetween size="xs">
          {block.items.map((item) => (
            <div key={item.href}>
              <Link href={item.href} external>
                {item.label}
              </Link>
              {item.description && (
                <Box variant="small" color="text-body-secondary">
                  {item.description}
                </Box>
              )}
            </div>
          ))}
        </SpaceBetween>
      );

    case 'button':
      return (
        <Button href={block.href} target={block.external ? '_blank' : undefined} iconAlign="right">
          {block.text}
        </Button>
      );
  }
}

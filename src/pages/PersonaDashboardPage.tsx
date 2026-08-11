import { useMemo, useState } from 'react';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Select from '@cloudscape-design/components/select';
import type { SelectProps } from '@cloudscape-design/components/select';
import Link from '@cloudscape-design/components/link';
import { Board, BoardItem } from '@cloudscape-design/board-components';
import type { BoardProps } from '@cloudscape-design/board-components';

import Widget from '../widgets/Widget';
import { ArtworkCarousel, AnimationPlayer } from '../components/ArtworkCarousel';
import { FINE_ART, ANIMATIONS, HUMAN_MADE_NOTE } from '../content/data/creativeWork';
import { CAREER_PERSONA_RESEARCH, careerPersonaResearchPath, type ResearchPersonaId } from '../content/data/careerPersonaResearch';
import {
  DASHBOARD_ITEMS,
  PERSONA_LAYOUT_RATIONALE,
  dashboardItemById,
  defaultDetailFor,
  defaultItemsFor,
  type DashboardItemDefinition,
} from '../content/data/personaDashboard';

// Same i18n strings as the Job Market Explorer's board — this is the site's
// established drag/resize pattern and is deliberately not re-invented here.
const boardItemI18nStrings = {
  dragHandleAriaLabel: 'Drag handle',
  dragHandleAriaDescription:
    'Use Space or Enter to activate drag, arrow keys to move, Space or Enter to submit, or Escape to discard.',
  resizeHandleAriaLabel: 'Resize handle',
  resizeHandleAriaDescription:
    'Use Space or Enter to activate resize, arrow keys to resize, Space or Enter to submit, or Escape to discard.',
};

interface ItemData {
  itemId: string;
}

const boardI18nStrings: BoardProps.I18nStrings<ItemData> = {
  liveAnnouncementDndStarted: (operationType) => (operationType === 'resize' ? 'Resizing' : 'Dragging'),
  liveAnnouncementDndItemReordered: () => 'Card order changed',
  liveAnnouncementDndItemResized: () => 'Card resized',
  liveAnnouncementDndItemInserted: () => 'Card inserted',
  liveAnnouncementDndCommitted: (operationType) => `${operationType} committed`,
  liveAnnouncementDndDiscarded: (operationType) => `${operationType} discarded`,
  liveAnnouncementItemRemoved: (op) => `Removed ${dashboardItemById(op.item.data.itemId)?.title ?? 'card'}`,
  navigationAriaLabel: 'Persona dashboard',
  navigationAriaDescription: 'Drag or use arrow keys to rearrange cards.',
  navigationItemAriaLabel: (item) => (item ? dashboardItemById(item.data.itemId)?.title ?? 'Card' : 'Empty'),
};

const PERSONA_OPTIONS: SelectProps.Options = CAREER_PERSONA_RESEARCH.map((p) => ({ value: p.id, label: p.label }));

// Card bodies: most items render through the shared Widget component so their
// content isn't duplicated, but the creative-work cards are genuinely their own
// thing (an image carousel, an embedded player) rather than block content.
function renderCardBody(def: DashboardItemDefinition, detail: 'compact' | 'expanded') {
  if (def.id === 'fine-art') {
    return (
      <SpaceBetween size="xs">
        <ArtworkCarousel pieces={FINE_ART} />
        <Box variant="small" color="text-body-secondary">
          {HUMAN_MADE_NOTE}
        </Box>
      </SpaceBetween>
    );
  }
  if (def.id === 'animation') {
    return (
      <SpaceBetween size="xs">
        <AnimationPlayer pieces={ANIMATIONS} />
        <Box variant="small" color="text-body-secondary">
          {HUMAN_MADE_NOTE}
        </Box>
      </SpaceBetween>
    );
  }
  if (def.widgetId) return <Widget widgetId={def.widgetId} mode={detail} />;
  return <Box>{def.summary}</Box>;
}

function toBoardItem(def: DashboardItemDefinition): BoardProps.Item<ItemData> {
  return {
    id: def.id,
    columnSpan: def.columnSpan,
    rowSpan: def.rowSpan,
    data: { itemId: def.id },
  };
}

// Persona Dashboard — pick who you are, get a layout built from the Career
// Persona Research findings, then change it freely. The persona selector lives
// on the page rather than in the top nav (where the Job Market Explorer's role
// picker sits) because here the selection and the explanation of what it did
// belong next to each other — the explanation is the point of the page.
export default function PersonaDashboardPage() {
  const [personaId, setPersonaId] = useState<ResearchPersonaId>('hiring-manager');
  const [items, setItems] = useState<Array<BoardProps.Item<ItemData>>>(() =>
    defaultItemsFor('hiring-manager').map(toBoardItem),
  );

  const detail = defaultDetailFor(personaId);

  function switchPersona(next: ResearchPersonaId) {
    setPersonaId(next);
    // Switching persona resets to that persona's default layout — the whole
    // point is to show what each one starts with. Any customizing done after
    // that is preserved until the next switch.
    setItems(defaultItemsFor(next).map(toBoardItem));
  }

  const onBoard = useMemo(() => new Set(items.map((i) => i.data.itemId)), [items]);
  const addable = DASHBOARD_ITEMS.filter((def) => !onBoard.has(def.id));

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description="Tell it who you are and the layout changes to match how that kind of visitor actually reads a portfolio — then rearrange it however you like."
        >
          Persona Dashboard
        </Header>
      }
    >
      <SpaceBetween size="l">
        <Container header={<Header variant="h2">I'm visiting as…</Header>}>
          <SpaceBetween size="m">
            <div style={{ maxWidth: 340 }}>
              <Select
                selectedOption={PERSONA_OPTIONS.find((o) => 'value' in o && o.value === personaId) ?? null}
                onChange={({ detail: d }) => switchPersona(d.selectedOption.value as ResearchPersonaId)}
                options={PERSONA_OPTIONS}
                ariaLabel="Choose the kind of visitor you are"
              />
            </div>
            <Box variant="p">{PERSONA_LAYOUT_RATIONALE[personaId]}</Box>
            <Box variant="small" color="text-body-secondary">
              {/* Phrased without an indefinite article on purpose — "a artist"
                  vs "an artist" can't be derived from the label reliably. */}
              Based on the research into{' '}
              <Link href={`#${careerPersonaResearchPath(personaId)}`}>how this visitor reads a portfolio</Link>. Cards open{' '}
              {detail === 'compact' ? 'compact' : 'in full'} for this persona — drag, resize, or remove any of them.
            </Box>
          </SpaceBetween>
        </Container>

        {addable.length > 0 && (
          <Container header={<Header variant="h2">Add to the board</Header>}>
            <SpaceBetween size="xs" direction="horizontal">
              {addable.map((def) => (
                <Button key={def.id} iconName="add-plus" onClick={() => setItems((prev) => [...prev, toBoardItem(def)])}>
                  {def.title}
                </Button>
              ))}
            </SpaceBetween>
          </Container>
        )}

        <Board<ItemData>
          items={items}
          onItemsChange={(event) => setItems([...event.detail.items])}
          i18nStrings={boardI18nStrings}
          empty={
            <Box textAlign="center" color="text-status-inactive" padding="l">
              Nothing on the board — add a card above, or switch persona to reset to its default layout.
            </Box>
          }
          renderItem={(item, actions) => {
            const def = dashboardItemById(item.data.itemId);
            if (!def) return <BoardItem i18nStrings={boardItemI18nStrings}>Unknown card</BoardItem>;
            return (
              <BoardItem
                header={<Header>{def.title}</Header>}
                i18nStrings={boardItemI18nStrings}
                settings={
                  <Button
                    iconName="close"
                    variant="icon"
                    ariaLabel={`Remove ${def.title}`}
                    onClick={() => actions.removeItem()}
                  />
                }
              >
                {renderCardBody(def, detail)}
              </BoardItem>
            );
          }}
        />
      </SpaceBetween>
    </ContentLayout>
  );
}

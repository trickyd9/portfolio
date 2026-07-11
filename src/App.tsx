import { useMemo, useState } from 'react';
import '@cloudscape-design/global-styles/index.css';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Select from '@cloudscape-design/components/select';
import type { SelectProps } from '@cloudscape-design/components/select';
import Container from '@cloudscape-design/components/container';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import { Board, BoardItem } from '@cloudscape-design/board-components';
import type { BoardProps } from '@cloudscape-design/board-components';

import { PERSONAS, type PersonaId } from './content/personas';
import { WIDGETS, PERSONA_DEFAULT_LAYOUT, allWidgetIds, type WidgetId } from './content/widgets';

type BoardItemData = BoardProps.Item<{ widgetId: WidgetId }>;

function makeBoardItem(widgetId: WidgetId): BoardItemData {
  const def = WIDGETS[widgetId];
  return {
    id: widgetId,
    columnSpan: def.columnSpan,
    rowSpan: def.rowSpan,
    data: { widgetId },
  };
}

const boardItemI18nStrings = {
  dragHandleAriaLabel: 'Drag handle',
  dragHandleAriaDescription:
    'Use Space or Enter to activate drag, arrow keys to move, Space or Enter to submit, or Escape to discard.',
  resizeHandleAriaLabel: 'Resize handle',
  resizeHandleAriaDescription:
    'Use Space or Enter to activate resize, arrow keys to resize, Space or Enter to submit, or Escape to discard.',
};

const boardI18nStrings: BoardProps.I18nStrings<{ widgetId: WidgetId }> = {
  liveAnnouncementDndStarted: (operationType) => (operationType === 'resize' ? 'Resizing' : 'Dragging'),
  liveAnnouncementDndItemReordered: () => 'Widget order changed',
  liveAnnouncementDndItemResized: () => 'Widget resized',
  liveAnnouncementDndItemInserted: () => 'Widget inserted',
  liveAnnouncementDndCommitted: (operationType) => `${operationType} committed`,
  liveAnnouncementDndDiscarded: (operationType) => `${operationType} discarded`,
  liveAnnouncementItemRemoved: (op) => `Removed widget ${op.item.data.widgetId}`,
  navigationAriaLabel: 'Dashboard widgets',
  navigationAriaDescription: 'Drag or use arrow keys to reorder widgets on the dashboard.',
  navigationItemAriaLabel: (item) => (item ? WIDGETS[item.data.widgetId].title : 'Empty'),
};

function App() {
  const [personaId, setPersonaId] = useState<PersonaId>('recruiter');
  const [items, setItems] = useState<BoardItemData[]>(() =>
    PERSONA_DEFAULT_LAYOUT.recruiter.map(makeBoardItem)
  );

  const persona = PERSONAS.find((p) => p.id === personaId)!;

  const personaOptions: SelectProps.Option[] = PERSONAS.map((p) => ({
    value: p.id,
    label: p.label,
    description: p.goal,
  }));

  const onWidgetsBoard = useMemo(() => new Set(items.map((item) => item.data.widgetId)), [items]);
  const availableToAdd = allWidgetIds().filter((id) => !onWidgetsBoard.has(id));

  function switchPersona(next: PersonaId) {
    setPersonaId(next);
    setItems(PERSONA_DEFAULT_LAYOUT[next].map(makeBoardItem));
  }

  function addWidget(id: WidgetId) {
    setItems((prev) => [...prev, makeBoardItem(id)]);
  }

  return (
    <AppLayout
      navigationHide
      toolsHide
      contentType="dashboard"
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="Draft dashboard — every widget below is a content placeholder we refine together, one at a time (see WIDGET-TRACKER.md)."
              actions={
                <Select
                  selectedOption={{ value: persona.id, label: persona.label, description: persona.goal }}
                  onChange={({ detail }) => switchPersona(detail.selectedOption.value as PersonaId)}
                  options={personaOptions}
                  ariaLabel="Viewing as persona"
                />
              }
            >
              David Trick — Portfolio (local preview)
            </Header>
          }
        >
          <SpaceBetween size="l">
            <Board<{ widgetId: WidgetId }>
              items={items}
              onItemsChange={(event) => setItems([...event.detail.items])}
              i18nStrings={boardI18nStrings}
              empty={<Box textAlign="center">No widgets on this dashboard yet — add one below.</Box>}
              renderItem={(item, actions) => {
                const def = WIDGETS[item.data.widgetId];
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
                    <SpaceBetween size="xs">
                      <Box variant="p">{def.condensed}</Box>
                      <Box variant="small" color="text-status-inactive">
                        Expanded: {def.expanded}
                      </Box>
                    </SpaceBetween>
                  </BoardItem>
                );
              }}
            />

            {availableToAdd.length > 0 && (
              <Container header={<Header variant="h2">More widgets available to add</Header>}>
                <SpaceBetween size="s">
                  {availableToAdd.map((id) => (
                    <Box key={id} display="inline-block" padding={{ right: 's' }}>
                      <Button onClick={() => addWidget(id)}>+ {WIDGETS[id].title}</Button>
                    </Box>
                  ))}
                </SpaceBetween>
              </Container>
            )}
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}

export default App;

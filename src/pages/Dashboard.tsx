import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { Board, BoardItem } from '@cloudscape-design/board-components';
import type { BoardProps } from '@cloudscape-design/board-components';

import { WIDGETS, type WidgetId } from '../content/widgets';
import type { BoardItemData } from '../content/boardItem';
import Widget from '../widgets/Widget';

const boardItemI18nStrings = {
  dragHandleAriaLabel: 'Drag handle',
  dragHandleAriaDescription:
    'Use Space or Enter to activate drag, arrow keys to move, Space or Enter to submit, or Escape to discard.',
  resizeHandleAriaLabel: 'Resize handle',
  resizeHandleAriaDescription:
    'Use Space or Enter to activate resize, arrow keys to resize, Space or Enter to submit, or Escape to discard.',
};

const boardI18nStrings: BoardProps.I18nStrings<BoardItemData['data']> = {
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

interface DashboardProps {
  items: BoardItemData[];
  onItemsChange: (items: BoardItemData[]) => void;
}

export default function Dashboard({ items, onItemsChange }: DashboardProps) {
  function toggleMode(widgetId: WidgetId) {
    onItemsChange(
      items.map((item) =>
        item.data.widgetId === widgetId
          ? { ...item, data: { ...item.data, mode: item.data.mode === 'compact' ? 'expanded' : 'compact' } }
          : item,
      ),
    );
  }

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description="Draft dashboard — every widget below is refined content we can keep tuning together (see WIDGET-TRACKER.md)."
        >
          David Trick — Portfolio (local preview)
        </Header>
      }
    >
      <Board<BoardItemData['data']>
        items={items}
        onItemsChange={(event) => onItemsChange([...event.detail.items])}
        i18nStrings={boardI18nStrings}
        empty={<Box textAlign="center">No widgets on this dashboard yet — add one from the panel.</Box>}
        renderItem={(item, actions) => {
          const def = WIDGETS[item.data.widgetId];
          return (
            <BoardItem
              header={<Header>{def.title}</Header>}
              i18nStrings={boardItemI18nStrings}
              settings={
                <SpaceBetween size="xxs" direction="horizontal">
                  <Button
                    iconName={item.data.mode === 'compact' ? 'zoom-in' : 'zoom-out'}
                    variant="icon"
                    ariaLabel={`${item.data.mode === 'compact' ? 'Expand' : 'Compact'} ${def.title}`}
                    onClick={() => toggleMode(item.data.widgetId)}
                  />
                  <Button
                    iconName="close"
                    variant="icon"
                    ariaLabel={`Remove ${def.title}`}
                    onClick={() => actions.removeItem()}
                  />
                </SpaceBetween>
              }
            >
              <Widget widgetId={item.data.widgetId} mode={item.data.mode} />
            </BoardItem>
          );
        }}
      />
    </ContentLayout>
  );
}

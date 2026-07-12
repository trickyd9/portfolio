import type { BoardProps } from '@cloudscape-design/board-components';
import type { WidgetId } from './widgets';

export interface BoardItemContentData {
  widgetId: WidgetId;
  mode: 'compact' | 'expanded';
}

export type BoardItemData = BoardProps.Item<BoardItemContentData>;

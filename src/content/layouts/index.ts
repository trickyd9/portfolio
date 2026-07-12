// Loads the hand-editable per-persona layout JSON files and converts them into
// Cloudscape Board items. `col`/`row`/`size` are the authoring format (col = starting
// column, row = starting row used only to order the seed layout, size = row span
// override); Board's own layout engine then owns live drag/resize, same as it does
// today — see the plan notes in WIDGET-TRACKER.md for why Board stays underneath.
import type { PersonaId } from '../personas';
import { WIDGETS, type WidgetId } from '../widgets';
import type { BoardItemData } from '../boardItem';

import recruiterLayout from './recruiter.json';
import hiringManagerLayout from './hiring-manager.json';
import uxProfessionalLayout from './ux-professional.json';
import technicalPeerLayout from './technical-peer.json';
import otherLayout from './other.json';

interface LayoutEntry {
  widgetId: WidgetId;
  col: number;
  row: number;
  size?: number;
}

const LAYOUTS: Record<PersonaId, LayoutEntry[]> = {
  recruiter: recruiterLayout as LayoutEntry[],
  'hiring-manager': hiringManagerLayout as LayoutEntry[],
  'ux-professional': uxProfessionalLayout as LayoutEntry[],
  'technical-peer': technicalPeerLayout as LayoutEntry[],
  other: otherLayout as LayoutEntry[],
};

const BOARD_COLUMNS = 4;

function layoutEntryToBoardItem(entry: LayoutEntry): BoardItemData {
  const widget = WIDGETS[entry.widgetId];
  return {
    id: widget.id,
    columnOffset: { [BOARD_COLUMNS]: entry.col - 1 },
    rowSpan: entry.size ?? widget.defaultRowSpan,
    columnSpan: widget.columnSpan,
    data: { widgetId: widget.id, mode: widget.defaultMode },
  };
}

/** The authored default dashboard for a persona, seeded from its layout JSON file. */
export function defaultLayoutFor(persona: PersonaId): BoardItemData[] {
  return [...LAYOUTS[persona]].sort((a, b) => a.row - b.row || a.col - b.col).map(layoutEntryToBoardItem);
}

/** A widget added from the "add widgets" drawer, sized at its authored default. */
export function boardItemFor(widgetId: WidgetId): BoardItemData {
  const widget = WIDGETS[widgetId];
  return {
    id: widget.id,
    rowSpan: widget.defaultRowSpan,
    columnSpan: widget.columnSpan,
    data: { widgetId: widget.id, mode: widget.defaultMode },
  };
}

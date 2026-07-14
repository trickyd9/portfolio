import type { BoardProps } from '@cloudscape-design/board-components';
import { COMPANIES, type CompanyId } from './companies';

export interface JobBoardItemContentData {
  companyId: CompanyId;
}

export type JobBoardItemData = BoardProps.Item<JobBoardItemContentData>;

const BOARD_COLUMNS = 4;

function companyBoardItem(companyId: CompanyId, columnOffset: number): JobBoardItemData {
  return {
    id: companyId,
    columnOffset: { [BOARD_COLUMNS]: columnOffset },
    rowSpan: 4,
    columnSpan: 2,
    data: { companyId },
  };
}

/** One card per default-on-board company, seeded left-to-right/top-to-bottom.
 * Companies with `onBoardByDefault: false` (e.g. Amazon) are still selectable
 * from the "add company" drawer, just not seeded. */
export function defaultJobBoardItems(): JobBoardItemData[] {
  const defaultCompanies = COMPANIES.filter((c) => c.onBoardByDefault);
  return defaultCompanies.map((company, index) => companyBoardItem(company.id, (index % 2) * 2));
}

/** A company card re-added from the "add company" drawer. */
export function companyBoardItemFor(companyId: CompanyId): JobBoardItemData {
  return { id: companyId, rowSpan: 4, columnSpan: 2, data: { companyId } };
}

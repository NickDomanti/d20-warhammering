import type { Column } from '@tanstack/vue-table';

export default function handleTableColumnSorting<TData, TValue>(
  column: Column<TData, TValue>,
  isMulti?: boolean,
) {
  const sorted = column.getIsSorted();

  // If not sorted, sort by asc
  if (!sorted) column.toggleSorting(false, isMulti);
  // If sorted by asc, sort by desc
  else if (sorted === 'asc') column.toggleSorting(true, isMulti);
  // If sorted by desc, clear sorting
  else column.clearSorting();
}

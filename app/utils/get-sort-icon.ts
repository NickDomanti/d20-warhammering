export default function getSortIcon(isSorted: 'asc' | 'desc' | false) {
  if (isSorted === 'asc') return AppIcons.SORT_ASC;
  if (isSorted === 'desc') return AppIcons.SORT_DESC;
  return AppIcons.SORT;
}

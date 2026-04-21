export default function getSortIcon(isSorted: 'asc' | 'desc' | false) {
  if (isSorted === 'asc') return 'lucide:arrow-up-narrow-wide';
  if (isSorted === 'desc') return 'lucide:arrow-down-wide-narrow';
  return 'lucide:arrow-up-down';
}

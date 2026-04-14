export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

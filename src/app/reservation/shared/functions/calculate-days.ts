export function calculateDaysDifference(start: Date, end: Date): number {
  const diff = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return diffDays;
}

export function parseDate(date: string): Date {
  const arr = date.split('.');
  return new Date(+arr[2], +arr[1] - 1, +arr[0]);
}

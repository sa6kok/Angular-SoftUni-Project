export function dateShowDb(value: string): string {
  const arr = value.split('-');
  return `${arr[2]}.${arr[1]}.${arr[0]}`;
}

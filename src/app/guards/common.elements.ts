export function checkIfCommonElements(first: string[], second: string[]): boolean {
  let result = false;
  for (const firstEl of first) {
    if (second.includes(firstEl)) {
      result = true;
      break;
    }
  }
  return result;
}

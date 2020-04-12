export function checkIfCommonElements(first: string[], second: string[]): boolean {
  let result = false;
  if (!!first && !!second) {
  for (const firstEl of first) {
    if (second.includes(firstEl)) {
      result = true;
      break;
    }
  }
}
  return result;
}

export function checkIfCommonElements(first: string[], second: string[]): boolean {
  let result = false;
  first.map(firstEl => {
        if (second.includes(firstEl)) {
          result = true;
        }
  });
  return result;
}

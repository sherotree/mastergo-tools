export function clone(val: unknown) {
  return JSON.parse(JSON.stringify(val));
}

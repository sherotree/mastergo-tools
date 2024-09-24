import { uuid } from './uuid';

export function keyGen(arr: unknown) {
  if (Array.isArray(arr)) {
    return arr.map((x) => keyGen(x));
  }

  if (typeof arr === 'object' && arr !== null) {
    const _key = uuid();
    return { ...arr, _key };
  }

  return arr;
}

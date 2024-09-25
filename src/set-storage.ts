export async function setStorage(cache: { [key: string]: any }, key?: string) {
  const pre = (await mg.clientStorage.getAsync(key ?? 'cache')) || {};
  const newCache = { ...pre, ...cache };
  await mg.clientStorage.setAsync('cache', newCache);
  return newCache;
}

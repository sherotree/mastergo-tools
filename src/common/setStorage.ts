export async function setStorage(cache: { [key: string]: any }, key?: string) {
  const pre = (await figma.clientStorage.getAsync(key ?? 'cache')) || {};
  const newCache = { ...pre, ...cache };
  await figma.clientStorage.setAsync('cache', newCache);
  return newCache;
}

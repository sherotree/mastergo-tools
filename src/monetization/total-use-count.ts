const DEFAULT_KEY = "totalUseCount";

/**
 * Returns the plugin’s total use count.
 *
 * @param key  The key in [`figma.clientStorage`](https://figma.com/plugin-docs/api/figma-clientStorage/)
 * on which to store the use count. Defaults to `'totalUseCount'`.
 * @category Monetization
 */
export async function getTotalUseCountAsync(key = DEFAULT_KEY): Promise<number> {
  const useCount: undefined | number = await figma.clientStorage.getAsync(key);
  if (typeof useCount === "undefined") {
    return 0;
  }
  return useCount;
}

/**
 * Increments the plugin’s total use count.
 *
 * @param key  The key in [`figma.clientStorage`](https://figma.com/plugin-docs/api/figma-clientStorage/)
 * on which to store the use count. Defaults to `'totalUseCount'`.
 * @returns Returns the plugin’s new total use count.
 * @category Monetization
 */
export async function incrementTotalUseCountAsync(key = DEFAULT_KEY): Promise<number> {
  const useCount = await getTotalUseCountAsync(key);
  const newUseCount = useCount + 1;
  await figma.clientStorage.setAsync(key, newUseCount);
  return newUseCount;
}

/**
 * Resets the plugin’s total use count to `0`.
 *
 * @param key  The key in [`figma.clientStorage`](https://figma.com/plugin-docs/api/figma-clientStorage/)
 * on which to store the use count. Defaults to `'totalUseCount'`.
 * @category Monetization
 */
export async function resetTotalUseCountAsync(key = DEFAULT_KEY): Promise<void> {
  await figma.clientStorage.setAsync(key, 0);
}

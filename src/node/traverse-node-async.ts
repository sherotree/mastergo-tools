/**
 * An `async` version of [`traverseNode`],
 * in which both callbacks are `async`.
 *
 * @category Node
 */
export async function traverseNodeAsync(
  node: BaseNode,
  processNodeAsync: (node: BaseNode) => Promise<void>,
  stopTraversalAsync?: (node: BaseNode) => Promise<boolean>
): Promise<void> {
  if (node.removed === true) {
    return;
  }

  await processNodeAsync(node);

  if ('children' in node && (typeof stopTraversalAsync !== 'function' || (await stopTraversalAsync(node)) === false)) {
    for (const childNode of node.children) {
      await traverseNodeAsync(childNode, processNodeAsync, stopTraversalAsync);
    }
  }
}

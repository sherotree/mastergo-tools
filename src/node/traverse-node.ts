/**
 * Traverses `node` and its child nodes recursively in a *depth-first*
 * manner, passing each node to the specified `processNode` callback.
 *
 * Each node is also passed to a `stopTraversal` function. If you return
 * `true` in `stopTraversal` for a particular node, then its child nodes
 * will not be traversed.
 *
 * @category Node
 */
export function traverseNode(
  node: BaseNode,
  processNode: (node: BaseNode) => void,
  stopTraversal?: (node: BaseNode) => boolean
): void {
  if (node.removed === true) {
    return;
  }

  processNode(node);

  if ('children' in node && !stopTraversal?.(node)) {
    for (const childNode of node.children) {
      traverseNode(childNode, processNode, stopTraversal);
    }
  }
}

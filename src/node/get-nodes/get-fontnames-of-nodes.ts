import { getTextNodes } from './get-text-nodes';
import { getFontNamesOfNode } from './get-fontnames-of-node';

// This code gets a list of fonts used in a selection of nodes.
// It uses the getFontNamesOfNode() function to get the fonts
// used in each node, and then it combines them into a list.
// The list is returned as an array of FontName objects.

export function getFontNamesOfNodes(nodes: readonly BaseNode[] = []): FontName[] {
  const hash = {};

  for (const node of nodes) {
    const allTextNodes = getTextNodes(node);
    for (const textNode of allTextNodes) {
      const fonts = getFontNamesOfNode(textNode);
      for (const font of fonts) {
        const { family, style } = font;
        const key = `${family}-${style}`;
        if (!hash[key]) {
          hash[key] = font;
        }
      }
    }
  }

  return Object.values(hash);
}

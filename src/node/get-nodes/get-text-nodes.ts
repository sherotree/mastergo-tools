import { FIGMA_NODE } from '../../typings/nodes';

// This function returns the text nodes in the given node

export function getTextNodes(node: BaseNode): (TextNode | ShapeWithTextNode | StickyNode | ConnectorNode)[] {
  let textNodes = [];

  // Find all text nodes inside the passed in node
  if ('findAllWithCriteria' in node) {
    textNodes = node.findAllWithCriteria({
      types: [FIGMA_NODE.TEXT, FIGMA_NODE.STICKY, FIGMA_NODE.SHAPE_WITH_TEXT, FIGMA_NODE.CONNECTOR],
    });

    // Find all text nodes inside instances
    const instances: any = node.findAllWithCriteria({
      types: [FIGMA_NODE.INSTANCE],
    });
    for (let n of instances) {
      const textNodesOnInstance = n.findAllWithCriteria({
        types: [FIGMA_NODE.TEXT, FIGMA_NODE.STICKY, FIGMA_NODE.SHAPE_WITH_TEXT, FIGMA_NODE.CONNECTOR],
      });
      textNodes.push(...textNodesOnInstance);
    }
  }

  // Add the node itself if it is a text node
  if (hasTextSublayerNode(node) || node.type === FIGMA_NODE.TEXT) {
    textNodes.unshift(node);
  }

  return textNodes;
}

function hasTextSublayerNode(node: BaseNode) {
  return (
    node.type === FIGMA_NODE.STICKY || node.type === FIGMA_NODE.SHAPE_WITH_TEXT || node.type === FIGMA_NODE.CONNECTOR
  );
}

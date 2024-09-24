import { FIGMA_NODE } from '../../typings/nodes';

export function getDirectTextNode(node: BaseNode) {
  if (
    node.type === FIGMA_NODE.STICKY ||
    node.type === FIGMA_NODE.SHAPE_WITH_TEXT ||
    node.type === FIGMA_NODE.CONNECTOR
  ) {
    return node.text;
  }

  return node;
}

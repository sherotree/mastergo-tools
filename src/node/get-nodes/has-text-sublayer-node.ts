import { FIGMA_NODE } from '../../typings/nodes';

export function hasTextSublayerNode(node: BaseNode) {
  return (
    node.type === FIGMA_NODE.STICKY || node.type === FIGMA_NODE.SHAPE_WITH_TEXT || node.type === FIGMA_NODE.CONNECTOR
  );
}

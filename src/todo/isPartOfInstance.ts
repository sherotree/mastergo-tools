/**
 * this function allows you to check whether a node is part of an instance
 */
export default function isPartOfInstance(node: SceneNode): boolean {
  const parent = node.parent;
  if (parent.type === 'INSTANCE') {
    return true;
  }
  if (parent.type === 'PAGE') {
    return false;
  }
  return isPartOfInstance(parent as SceneNode);
}

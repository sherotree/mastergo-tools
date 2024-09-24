// This function returns the font names of a node.

export function getFontNamesOfNode(targetNode, targetRange?): FontName[] {
  let node = targetNode;
  if (targetNode.type === 'SHAPE_WITH_TEXT' || targetNode.type === 'STICKY') {
    node = targetNode.text;
  }

  const range = targetRange || [0, node.characters?.length];
  let result: FontName | typeof figma.mixed;
  if (range[1] > range[0]) {
    result = node.getRangeFontName(...range);
  }

  if (!result) {
    return [];
  }

  if (result === figma.mixed) {
    const middlePointInRange = Math.ceil((range[1] + range[0]) / 2);
    return [
      ...getFontNamesOfNode(node, [range[0], middlePointInRange]),
      ...getFontNamesOfNode(node, [middlePointInRange, range[1]]),
    ];
  }

  return [result];
}

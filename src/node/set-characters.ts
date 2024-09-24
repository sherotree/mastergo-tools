export function setCharacters(node: TextNode, text: string) {
  try {
    node.characters = text;
  } catch (err) {
    console.error(err);
  }
}

export async function loadAllFonts(text: TextNode) {
  await Promise.all(text.getRangeAllFontNames(0, text.characters.length).map(figma.loadFontAsync)).catch((err) =>
    console.error(err, text.characters)
  );
}

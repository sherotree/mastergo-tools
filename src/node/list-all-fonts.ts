interface FontTreeNode {
  value: string;
  label: string;
  children: FontTreeNode[];
}

export async function listAllFonts(): Promise<{ pure: Font[]; tree: FontTreeNode[] }> {
  const allFonts = (await figma.listAvailableFontsAsync().catch(() => {})) || [];

  return { pure: allFonts, tree: arrayToTree(allFonts.map(x => x.fontName)) };
}

function arrayToTree(allFonts: FontName[]) {
  let map = new Set();

  const res = allFonts.reduce((acc, x) => {
    const { family, style } = x;
    if (map.has(family)) {
      const targetIndex = acc.findIndex(y => y.value === family);
      const currentChildren = acc[targetIndex].children;
      const isExist = currentChildren.some(x => x.value === style);
      if (!isExist) {
        // style 去重
        acc[targetIndex].children.push({ value: style, label: style });
      }

      acc[targetIndex].children = acc[targetIndex].children.sort((a, b) => {
        const aIndex = getFontWeightOrder(a.value);
        const bIndex = getFontWeightOrder(b.value);
        return aIndex - bIndex;
      });
    } else {
      acc.push({
        value: family,
        label: family,
        children: [{ value: style, label: style }],
      });
    }
    map.add(family);
    return acc;
  }, []);

  return res;
}

const WEIGHT_LIST = {
  100: ['Thin', 'Hairline', 'ExtraLight', 'UltraLight', 'ExtraThin'],
  200: ['Light'],
  300: ['Book'],
  400: ['Regular', 'Normal', 'Roman', 'Plain', 'Standard'],
  500: ['Medium'],
  600: ['SemiBold', 'DemiBold'],
  700: ['Bold'],
  800: ['Heavy', 'Black', 'ExtraBold', 'UltraBold'],
  900: ['ExtraBlack', 'Fat', 'Poster', 'UltraBlack'],
};

const values = Object.values(WEIGHT_LIST);
const len = values.reduce((acc, item) => acc + item.length, 0);
let res = { Italic: len };

for (let i = 0; i < values.length; i++) {
  const item = values[i];
  for (let j = 0; j < item.length; j++) {
    const item2 = item[j];
    const size = Object.keys(res).length;
    Object.assign(res, { [item2]: size / 2, [item2 + ' Italic']: size / 2 + len });
  }
}

res['Italic'] = res['Regular Italic'];

export function getFontWeightOrder(fontWeight) {
  return res[fontWeight] ?? Infinity;
}

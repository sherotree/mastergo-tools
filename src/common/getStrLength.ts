// 根据字符的 Unicode 编码判断，编码大于255为双字节占 2 个字节长度，编码小于等于255为单字节占 1 个字节长度

export function getStrLength(str: string): number {
  let res = 0;

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code > 255) {
      res += 2;
    } else {
      res += 1;
    }
  }

  return res;
}

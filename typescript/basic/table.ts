function getStringOutputLength(str: string): number {
  let length = 0;
  for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      if (charCode >= 0x4e00 && charCode <= 0x9fa5) {
          length += 2;
      } else {
          length += 1;
      }
  }
  return length;
}

interface IToTableOptions<T> {
  /** 定制输出的Key */
  Keys?: (keyof T)[];

  /** 输出的Key对应的名字 */
  NameMap?: Partial<Record<keyof T, string>>;

  /** 是否隐藏Id列 */
  HideId?: boolean;

  /** Id列的名字 */
  IdName?: string;
}

/**
* 将对象数组转换成表格字符串，返回markdown格式的表格字符串
*
* 对于：`[{ name: 'John', age: 25 }, { name: 'Bob', age: 30 }]`，输出：
*
* ```
* | Id | name | age |
* |----|------|-----|
* | 1  | John | 25  |
* | 2  | Bob  | 30  |
* ```
*
* 如果`options`为`{Keys: ['name'], IdName: '序号', NameMap: { name: '名字' }}`，则输出：
* ```
* | 序号 | 名字 |
* |------|------|
* | 1    | John |
* | 2    | Bob  |
* ```
*/
function toTable<T>(objects: T[], options?: IToTableOptions<T>): string {
  if (objects.length === 0) {
      return '';
  }

  const obj = objects[0]!;
  if (typeof obj !== 'object') {
      return '';
  }

  const allKeys = (options?.Keys ?? Object.keys(obj)) as (keyof T)[];
  const allKeyNames = allKeys.map((key) => options?.NameMap?.[key] ?? key) as string[];

  const idName = options?.IdName ?? 'Id';
  const idLen = getStringOutputLength(idName);
  const maxIdLen = Math.max(objects.length.toString().length, idLen);

  const allKeyOutputLens = allKeyNames.map((key) => getStringOutputLength(key));
  const allValueOutputLens = objects.map((o) => allKeys.map((key) => getStringOutputLength(o[key]!.toString())));

  // 获取所有键和每个键对应的最大值长度
  const colsOutputWidth = allKeyOutputLens.slice();
  for (let i = 0; i < allKeyNames.length; i++) {
      const keyLens = allKeyOutputLens[i]!;
      const valueLens = allValueOutputLens.map((valueLens) => valueLens[i]!);
      colsOutputWidth[i] = Math.max(
          keyLens,
          valueLens.reduce((max, cur) => Math.max(max, cur), 0),
      );
  }

  const lines = [] as string[];

  // 标题行
  const headers: string[] = [];

  if (!options?.HideId) {
      const idHeader = idName.padEnd(maxIdLen - (idLen - idName.length), ' ');
      headers.push(idHeader);
  }

  allKeyNames.forEach((keyName, i) => {
      const len = keyName.length;
      const outPutLen = allKeyOutputLens[i]!;
      const outputMaxLen = colsOutputWidth[i]!;
      headers.push(keyName.padEnd(outputMaxLen - (outPutLen - len), ' '));
  });
  lines.push(`| ${headers.join(' | ')} |`);

  // 分隔线
  const separators: string[] = [];
  if (!options?.HideId) {
      separators.push('-'.repeat(maxIdLen));
  }
  colsOutputWidth.forEach((width) => {
      separators.push('-'.repeat(width));
  });
  lines.push(`| ${separators.join(' | ')} |`);

  // 值
  for (const o of objects) {
      const id = objects.indexOf(o);
      const values: string[] = [];

      if (!options?.HideId) {
          const idValue = (id + 1).toString().padEnd(maxIdLen, ' ');
          values.push(idValue);
      }

      allKeys.forEach((key, i) => {
          const value = o[key]!;
          const len = value.toString().length;
          const outPutLen = allValueOutputLens[id]![i]!;
          const outputMaxLen = colsOutputWidth[i]!;
          values.push(value.toString().padEnd(outputMaxLen - (outPutLen - len), ' '));
      });
      lines.push(`| ${values.join(' | ')} |`);
  }

  return lines.join('\n');
}

function testTable() {
  const objs = [
    { name: '张三', age: 20 },
    { name: '李四', age: 30 },
    { name: 'Charlie', age: 40 },
  ];

  console.log(toTable(objs));
  console.log(toTable(objs, { Keys: ['name', 'age'], HideId: true }));
  console.log(toTable(objs, { Keys: ['name', 'age'], IdName: '序号', NameMap: { name: '名字', age: '年龄' } }));
}

testTable();

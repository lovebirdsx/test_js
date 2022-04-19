// a.ts和b.ts循环引用
/**
 * import a
 * a import b     aValue1 = bValue1
 * b import a     bValue1 = aValue2 此时a还没有import完成,所以a={},a.aValue2=undefined
 * 输出的 aValue1 为undefined
 */

import { bValue1, bValue2 } from './b';
import { aValue1, aValue2 } from './a';

console.log('aValue1', aValue1);
console.log('aValue2', aValue2);
console.log('bValue1', bValue1);
console.log('bValue2', bValue2);

/**
 * 索引签名
 * <https://jkchao.github.io/typescript-book-chinese/typings/indexSignatures.html#typescript-%E7%B4%A2%E5%BC%95%E7%AD%BE%E5%90%8D>
 */

/**
 * Map和Obejct中的索引
 */

// Map中的索引是可以使用对象的
class IndexClass {
    constructor(public name: string) {}
}

const map1: Map<IndexClass, string> = new Map();
map1.set(new IndexClass('index1'), 'value1');
map1.set(new IndexClass('index2'), 'value2');
console.log(map1);

// Object中的索引没法用对象
// Error: An index signature parameter type must be 'string', 'number', 'symbol', or a template literal type.
// const obj1 : { [key: Object]: number } = {};

/**
 * 所有成员必须符合字符串的索引签名
 */

interface Foo {
    [key: string]: number;
    x: number;
    y: number;
}

interface Bar {
    [key: string]: number;
    x: number;
    // y: string; // Property 'y' of type 'string' is not assignable to 'string' index type 'number'
}

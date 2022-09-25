console.log('Hello World'.match('Hello'));
console.log('Foo/Bar.ts'.match('B[a-zA-Z0-9_]+.ts'));
console.log(('| |'.match(/|/g) || []).length);
console.log('| |'.split('|').length - 1);
console.log('file (1).txt'.replace(/\([0-9]+\)/g, ''));
console.log('file (2) (1).txt'.replace(/\([0-9]+\)/g, ''));

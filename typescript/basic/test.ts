import { Bar } from './static';

console.log('Test');

// 尽管只是引用了Bar, 但static中Foo的static变量还是会自动初始化
// 看起来就是在import
const a = new Bar();

const n = Number(198958928400000116n);
for (let i = 0; i < 10; i++) {
    console.log(n + i);
}

const id = 6414106400000001;
console.log(id, id < Number.MAX_SAFE_INTEGER);

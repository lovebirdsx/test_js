import { Bar } from './static';

console.log('Test');

// 尽管只是引用了Bar, 但static中Foo的static变量还是会自动初始化
// 看起来就是在import
const a = new Bar();

/**
 * 辨析联合类型
 * https://jkchao.github.io/typescript-book-chinese/typings/discrominatedUnion.html#%E8%AF%A6%E7%BB%86%E7%9A%84%E6%A3%80%E6%9F%A5
 */

interface Square {
    type: 'square';
    size: number;
}

interface Rectangle {
    type: 'rectangle';
    width: number;
    height: number;
}

interface Circle {
    type: 'circle';
    radius: number;
}

interface Triangle {
    type: 'triangle';
}

type Shape = Square | Rectangle | Circle;

function getArea2(s: Shape) {
    switch (s.type) {
        case 'rectangle':
            return s.width * s.height;
        case 'square':
            return s.size * s.size;
        case 'circle':
            return s.radius * s.radius * 3.14;
        // 如果新加入了类型, 就会触发default中的编译错误
        default: {
            const exhaustiveCheck: never = s;
            return exhaustiveCheck;
        }
    }
}

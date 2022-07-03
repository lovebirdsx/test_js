/**
 * 测试协变相关的机制
 * <https://jkchao.github.io/typescript-book-chinese/typings/typeCompatibility.html#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E7%B1%BB%E5%9E%8B>
 * 上面链接中的相关说法已经过时, 目前的ts编译器可以正确处理
 */

/**
 * 双向协变
 * */

interface Event {
    timestamp: number;
}

interface MouseEvent extends Event {
    x: number;
    y: number;
}

interface KeyEvent extends Event {
    keyCode: number;
}

enum EventType {
    Mouse,
    Keyboard,
}

function addEventListener(eventType: EventType, handler: (e: Event) => void) {
    // todo
}

// 编译不过
// addEventListener(EventType.Mouse, (e: MouseEvent) => console.log(e.x, e.y));

/**
 * 函数参数类型
 */

interface Point2D {
    x: number;
    y: number;
}

interface Point3D {
    x: number;
    y: number;
    z: number;
}

const iTakePoint2D = (point: Point2D) => { console.log(point.x, point.y); };
let iTakePoint3D = (point: Point3D) => { console.log(point.x, point.y, point.z); };

// 下面编译会报错, 因为运行iTakePoint3D时, 需要的是Point3D的参数
// 而转换函数类型后, iTakePoint2D传入的Point2D的参数
// iTakePoint2D = iTakePoint3D;
iTakePoint3D = iTakePoint2D;
iTakePoint3D({ x: 1, y: 2, z: 3 });

/**
 * 泛型
 */
class List<T> {
    add(v: T) {}
}

class Animal {
    constructor(public name: string) {}
}

class Cat extends Animal {
    meow() {
        // ..
    }
}

const animals = new List<Animal>();
animals.add(new Animal('A1'));
animals.add(new Cat('C1'));

const cats = new List<Cat>();
// cats.add(new Animal('A2')); 报错
cats.add(new Cat('C2'));

/**
 * 不变性（Invariance）
 */
let animal = new Animal('animal');
const cat = new Cat('cat');

animal = cat;
//  cat = animal; 报错

let animalArr: Animal[] = [animal];
const catArr: Cat[] = [cat];

// catArr = animalArr; // 报错
animalArr = catArr;

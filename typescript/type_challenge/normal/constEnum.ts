// 为了解决 const enum的类型推导

import { type } from 'os';
import {
    Expect, ExpectNot, Extends,
} from '../utils';

// type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };
type Enum<E> = Record<keyof E, number | string>;
type EnumValue = number | string;

const enum ConstFoo { Op1, Op2, }
enum Foo { Op1, Op2, }

type cases = [
    Expect<Extends<ConstFoo, number>>,
    ExpectNot<Extends<ConstFoo, string>>,
    Expect<Extends<ConstFoo, string | number>>,
    Expect<Extends<ConstFoo, ConstFoo>>,

    Expect<Extends<typeof ConstFoo, Record<string, number | string>>>,
    Expect<Extends<typeof ConstFoo, Record<string, EnumValue>>>,

    // 注意 这里返回的是 false
    ExpectNot<Extends<typeof ConstFoo, Record<string, ConstFoo[keyof ConstFoo]>>>,

    ExpectNot<Extends<typeof ConstFoo, Record<string, string>>>,

    // 注意 这里返回的是 false
    ExpectNot<Extends<typeof ConstFoo, Record<string, number>>>,
];

type Case1 = Foo extends Enum<Foo> ? Enum<Foo> : Foo;
type Case2 = Enum<ConstFoo>;
type Case3 = Enum<Foo>;
type Case4 = keyof typeof ConstFoo;
type Case5 = keyof typeof Foo;

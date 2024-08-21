import { Expect, Equal } from '../utils';

/**
 * Append to object https://tsch.js.org/527
 * solutions: https://tsch.js.org/527/solutions
 */

// 关键是 限定U的类型
type AppendToObject<T, U extends keyof any, V> = {[K in (keyof T | U)]: K extends keyof T ? T[K]: V};

type Keys<T, U> = keyof T & U;

type test1 = {
    key: 'cat';
    value: 'green';
};

type Case1 = Keys<test1, 'foo'>;

type testExpect1 = {
    key: 'cat';
    value: 'green';
    home: boolean;
};

type test2 = {
    key: 'dog' | undefined;
    value: 'white';
    sun: true;
};

type testExpect2 = {
    key: 'dog' | undefined;
    value: 'white';
    sun: true;
    home: 1;
};

type test3 = {
    key: 'cow';
    value: 'yellow';
    sun: false;
};

type testExpect3 = {
    key: 'cow';
    value: 'yellow';
    sun: false;
    isMotherRussia: false | undefined;
};

type cases = [
    Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
    Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
    Expect<
        Equal<
            AppendToObject<test3, 'isMotherRussia', false | undefined>,
            testExpect3
        >
    >
];

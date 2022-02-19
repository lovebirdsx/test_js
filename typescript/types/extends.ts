function testExtends() {
    function base() {
        type Base = {name: string}
        type Child = {name: string, id: number}
        type IsExtend<T, U> = T extends U ? true: false;
        type OK1 = IsExtend<Base, Child>;
        type OK2 = IsExtend<Child, Base>;
    }

    function extend() {
        type P1<T> = T extends 'x' ? 'x' : 'y';
        type p11 = P1<'x'> // 'x'
        type p12 = P1<'1'> // 'y'
        type p13 = P1<'x' | 'y'> // 'x' | 'y'

        type P2<T> = [T] extends ['x'] ? 'x' : 'y';
        type p21 = P2<'x'> // 'x'
        type p22 = P2<'x' | 'y'> // 'y'
        type p23 = P2<'1'> // 'y'
    }
}

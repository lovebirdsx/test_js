/* eslint-disable no-shadow */
function testEnum() {
    const keys = ['foo', 'bar', 'car'] as const;
    type A = typeof keys[number];

    const callbacks = {
        foo(p1: string) {
            console.log('foo', p1);
        },
        bar(p1: boolean) {
            console.log('bar', p1);
        },
        car(p1: number, p2: number) {
            console.log('car', p1, p2);
        },
    };

    type Callbacks = typeof callbacks;
    type Func = (...args: any[]) => void;

    function Call<T extends A>(a:T, ...args:Parameters<Callbacks[T]>) {
        const fun = callbacks[a] as Func;
        fun(...args);
    }

    Call('foo', 'hello');
    Call('bar', true);
    Call('car', 100, 200);
}

testEnum();

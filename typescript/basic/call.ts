function once<T extends() => void>(fn: T): T {
    let didCall = false;
    let result: unknown;

    return function r() {
        if (didCall) {
            return result;
        }

        didCall = true;
        result = fn();
        return result;
    } as unknown as T;
}

function pay(amount: number) {
    console.log(`You have paid $${amount}`);
}
console.log('==== call pay by apply');
pay.apply(null, [100]);

console.log('==== call pay by once');
const payOnce = once(() => pay(5));

payOnce();
payOnce();

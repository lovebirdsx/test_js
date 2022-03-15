const a = 10n;
console.log(a, typeof a);

const max = BigInt(Number.MAX_SAFE_INTEGER);
console.log(max, typeof max);

const bigIntMax = 2n ** 53n;
console.log(bigIntMax, typeof bigIntMax);

// 和number进行比较
console.log('0n == 0', 0n == 0);
console.log('0n === 0', 0n === 0);

// 排序
const mixed = [1, 2, -3n, 10n, 7, 4, 0n];
mixed.sort();
console.log(mixed);

// 条件
console.log('0n is', 0n ? true : false);
console.log('1n is', 1n ? true : false);

// 在Json中使用
const n = 100n;
// console.log(JSON.stringify(n)); // 此处会报异常
console.log(n.toString());

// 序列化包含bigInt的对象
const obj1 = {
    foo: BigInt(Number.MAX_SAFE_INTEGER),
    deep: {
        bar: 88888888888888888888n,
    },
};

const objS = JSON.stringify(obj1, (key, value) => {
    return typeof value === 'bigint' ? value.toString() + 'n' : value;
});

console.log(obj1);
console.log(objS);

const obj2 = JSON.parse(objS, (key, value) => {
    if (typeof value === "string" && /^\d+n$/.test(value)) {
        return BigInt(value.slice(0, value.length - 1));
    } else {
        return value;
    }
})
console.log(obj2);

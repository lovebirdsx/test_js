// 判断一个数是否为质数
function isPrime(num) {
    if (num <= 1) {
        return false;
    }
    const limit = Math.sqrt(num);
    for (let i = 2; i <= limit; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

console.log(isPrime(1009)); // false
console.log(isPrime(1010)); // false
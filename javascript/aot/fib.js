function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const start = Date.now();
const result = fibonacci(40); // 计算斐波那契数列第40项（高计算量）
const end = Date.now();

console.log(`Result: ${result}`);
console.log(`Direct Execution Time: ${end - start} ms`);

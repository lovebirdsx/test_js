function getComposites(max) {
  const sieve = new Array(max + 1).fill(true);
  sieve[0] = sieve[1] = false;

  for (let p = 2; p * p <= max; p++) {
      if (sieve[p]) {
          for (let i = p * p; i <= max; i += p) {
              sieve[i] = false;
          }
      }
  }

  const composites = [];
  for (let i = 2; i <= max; i++) {
      if (!sieve[i]) {
          composites.push(i);
      }
  }

  return composites;
}

// 输出1000以内，连续的10个或以上的自然数合数序列
function getConsecutiveComposites(max) {
  const composites = getComposites(max);
  const result = [];

  let count = 0;
  for (let i = 0; i < composites.length - 1; i++) {
      if (composites[i] + 1 === composites[i + 1]) {
          count++;
      } else {
          if (count >= 10) {
              result.push(composites.slice(i - count, i + 1));
          }
          count = 0;
      }
  }

  return result;
}

console.log(getConsecutiveComposites(1000));

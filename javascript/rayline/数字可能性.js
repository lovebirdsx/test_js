// 由数码0,6,7组成的，且这三个数码中的每一个至少出现一次的五位数有多少个
function countNumbersWith067For5Digits() {
  let count = 0;
  for (let i = 10000; i <= 99999; i++) {
    const s = i.toString();
    // 判断是否含有 '0'、'6'、'7'
    if (!(s.includes('0') && s.includes('6') && s.includes('7'))) {
      continue;
    }

    // 判断是否只含有 '0'、'6'、'7'
    const set = new Set(s.split(''));
    if (set.size === 3) {
      count++;
    }
  }
  return count;
}

console.log(countNumbersWith067For5Digits()); // 100

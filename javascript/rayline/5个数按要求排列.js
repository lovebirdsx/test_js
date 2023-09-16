/**
 * 判断数组是否满足要求
 * @param {Array} a 
 */
function isOk(a) {
    for (let i = 2; i < 5; i++) {
        prev1 = a[i - 1];
        prev2 = a[i - 2];
        curr = a[i];
        if (Math.abs(prev1 - prev2) === curr || prev1 + prev2 === curr) {
            continue
        }

        return false;
    }

    return true;
}

/**
 * 递归查找，满足条件的b数组
 * @param {Array} a 
 * @param {Array} b 
 */
function rover(a, b) {
    if (a.length <= 0) {
        if (isOk(b)) {
            console.log(b);
        }
        return;
    }

    a.forEach((_, i) => {
        b.push(a[i]);
        rover([...a.slice(0, i), ...a.slice(i + 1)], b);
        b.pop();
    });
}

rover([2, 4, 6, 8, 10], []);

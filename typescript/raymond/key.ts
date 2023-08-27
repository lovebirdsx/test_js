/**
 * 瑞来的考试题 20230826
 * 密码有6位数，在1-5之间，相邻的两位数相差1
 * 密码数字可以重复，求满足条件的所有密码
 */

const numbers = [1, 2, 3, 4, 5];

const okKeys: number[][] = [];

function isOkKey(key: number[]) {
    for (let i = 1; i < key.length; i++) {
        if (Math.abs(key[i - 1] - key[i]) !== 1) {
            return false;
        }
    }
    return true;
}

function searchKey(index: number, keys: number[]) {
    if (index > 5) {
        if (isOkKey(keys)) {
            okKeys.push(keys);
        }
        return;
    }

    for (let i = 0; i < numbers.length; i++) {
        const key = keys.slice();
        key.push(numbers[i]);
        searchKey(index + 1, key);
    }
}

searchKey(0, []);

function getDiffCount(key: number[]) {
    // 获得key中不同数字的个数
    const diffNumbers: number[] = [];
    for (const number of key) {
        if (diffNumbers.indexOf(number) === -1) {
            diffNumbers.push(number);
        }
    }
    return diffNumbers.length;
}

console.log(okKeys.length);

// 将okKeys按照不同数字的个数进行排序
okKeys.sort((a, b) => getDiffCount(a) - getDiffCount(b));

for (const key of okKeys) {
    console.log(key.join(', '));
}

// 统计不同个数对应的组数
const diffCountMap = new Map<number, number>();
for (const key of okKeys) {
    const diffCount = getDiffCount(key);
    const staticCount = diffCountMap.get(diffCount);
    if (staticCount) {
        diffCountMap.set(diffCount, staticCount + 1);
    } else {
        diffCountMap.set(diffCount, 1);
    }
}

console.log(diffCountMap);

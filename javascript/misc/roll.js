const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// 对array进行随机排序
for (let i = 0; i < 10000; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const tmp = array[randomIndex];
    array[randomIndex] = array[0];
    array[0] = tmp;
}

console.log(array);

/**
 * [
    4,  曹铁
    8,  伟成
    7,  俊集
    3,  临风
    5,  卓鸿
    1,  龚克
    9,  庄伟
    6,  白鹭
    2,  焕新
]
 */

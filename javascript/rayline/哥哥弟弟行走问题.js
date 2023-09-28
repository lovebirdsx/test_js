// 哥哥的速度
const bbv = 84;

// 弟弟的速度
const sbv = 36;

// 哥哥走的时间和弟弟走的时间相同
// 假设两颗树的距离为d
// 有方程
// (22 - 1) * d / bbv = (x - 1) * d / sbv;

// 解得
x = (22 - 1) * sbv / bbv + 1;

console.log(x); // 10

// 宏任务和微任务的执行顺序
// 参考 https://zhuanlan.zhihu.com/p/33058983

setTimeout(() => console.log(1))

new Promise(function (resolve) {
    console.log(2)
    resolve(3)
}).then((val) => console.log(val))

import thunkify from "thunkify"

function f(a, b, callback) {
    const sum = a + b
    callback(sum)
    callback(sum)
}

var ft = thunkify(f)
var print = console.log.bind(console)
ft(1, 2)(print)

// 由于thunkify只允许回调函数执行一次，所以只输出一行结果

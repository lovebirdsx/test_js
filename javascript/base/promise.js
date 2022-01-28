const promise = new Promise(function (resolve, reject) {
    // ... some code
    if (/*异步操作成功*/true) {
        resolve(1)
    } else {
        reject('Error')
    }
})

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done')
    })
}

timeout(1000).then((value) => console.log(value))
console.log('foo')

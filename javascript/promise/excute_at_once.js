let promise = new Promise(function (resolve, reject) {
    console.log('Promise')
    resolve()
})

promise.then(function (params) {
    console.log('resoloved')
})

console.log('Hello')

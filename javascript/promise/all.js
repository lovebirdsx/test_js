function worker(id, time) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(id, 'finished')
            resolve()
        }, time);
    })
}

const params = {
    'Foo' : 200,
    'Bar' : 100,
    'Car' : 500,
    'Baz' : 300
}

const promises = Object.keys(params).map((key) => {
    const time = params[key]
    return worker(key, time)
})

for (const p of promises) {
    console.log(p)
}

Promise.all(promises).then((r) => {
    for (const p of promises) {
        console.log(p)
    }
    console.log('all finished')
})
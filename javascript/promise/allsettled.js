// https://es6.ruanyifeng.com/#docs/promise#Promise-allSettled

function worker(name) {
    return new Promise(function (resolve, reject) {
        const timeout = 100 + 400 * Math.random()
        const ok = Math.random() > .5
        setTimeout(() => {
            if (ok) {
                console.log(name, 'finished')
                resolve()
            } else {
                console.log(name, 'error')
                reject()
            }
        }, timeout);
    })
}

await Promise.allSettled([
    worker('f1'),
    worker('f2'),
    worker('f3'),
    worker('f4'),
    worker('f5'),
])

console.log('all finished')

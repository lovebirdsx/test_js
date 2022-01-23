// https://es6.ruanyifeng.com/#docs/promise#Promise-race
// 将多个promise封装成1个,只要其中1个完成,就会触发完成
// 只要其中有1个错误,就会触发错误

function create_worker(name) {
    return new Promise(function (resolve, reject) {
        const timeout = 100 + 500 * Math.random()
        setTimeout(() => {
            console.log(name, 'finished')
            resolve()
        }, timeout);
    })
}

const workers = [
    create_worker('w1'),
    create_worker('w2'),
    create_worker('w3'),
    create_worker('w4'),
    create_worker('w5'),
]

const p = Promise.race(workers)
p.then(() => console.log('some one finished'))
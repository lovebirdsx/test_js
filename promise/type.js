// then返回的是啥

function timeout(ms) {
    let p1 = new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve()
        }, ms);
    })
    return p1
}

let p1 = timeout(500)
let p2 = p1.then()
p2.then(() => timeout(500)).then(() => console.log('finished'))

console.log('p1 == p2', p1 == p2)
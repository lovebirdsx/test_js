const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => reject('p1 fail'), 3000)
})
const p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p1), 1000)
})

p2
    .then(result => console.log('p1', result))
    .catch(error => console.log('p2', error))

const p3 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve('p3 ok')
    }, 1000);
})

const p4 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve(p3)
    }, 2000);
})

p4.then(result => console.log(result))
    .catch(error => console.log(error))

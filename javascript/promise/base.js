const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve('hello')
    }, 1000);
})

p1.then((result) => console.log(result))

const p2 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        reject('Error')
    }, 2000);
})

p2.catch((e) => console.log(e))

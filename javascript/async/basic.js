function work(name) {
    return new Promise(function (resolve, reject) {
        const timeout = 100 + 500 * Math.random()
        setTimeout(() => {
            console.log(name, 'finished')
            resolve()            
        }, timeout);
    })
}

async function foo() {
    for (let i = 0; i < 100; i++) {
        await work(i)
    }
}

foo().then(function () {
    console.log('all finished')
})
function sim(ok, ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (ok) {
                resolve()
            } else {
                reject(`error ${ms}`)
            }
        }, ms);
    })
}

Promise.resolve().then( // Promise.resolve返回一个新的Promise对象
    () => {
        console.log('step 1')
        return sim(true, 500)
    }
).then(
    () => {
        console.log('step 2')
        return sim(false, 500)
    }
).then(
    () => {
        console.log('step 3')
        return sim(true, 500)
    }
).then(
    () => {
        console.log('step 4')
        sim(true, 500) // 此处没有return Promise对象
    }
).catch(
    () => {
        console.log('error')
    }
)
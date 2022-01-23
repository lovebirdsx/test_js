function timeout(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve()
        }, ms);
    })
}

timeout(500)
    .then(() => console.log('wait 500 finished'))
    .then(() => timeout(500))
    .then(() => console.log('fuck?'))
    .then(() => timeout(500))
    .then(() => console.log('wait 500 finished'))
    .then(() => timeout(500))
    .then(() => console.log('yeah?'))

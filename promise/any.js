function worker(name) {
    return new Promise(function (resolve, reject) {
        const timeout = Math.random() * 400 + 100
        const ok = Math.random() > .5
        setTimeout(() => {
            if (ok) {
                resolve(name)
            } else {
                reject(name)
            }
        }, timeout);
    })
}

let workers = [1, 2, 3, 4, 5].map((name) => worker(name))
Promise.any(workers)
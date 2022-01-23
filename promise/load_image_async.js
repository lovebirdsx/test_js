function logImageAsync(url) {
    return new Promise(function (resolve, reject) {
        const image = new Image()
        image.onload = () => resolve(image)
        image.onerror = () => reject(new Error(`Load image from ${url} failed`))
        image.src = url
    })
}

const url = "https://pic2.zhimg.com/v2-0b35a3df0b2e2712839ce551062e6d7f_1440w.jpg?source=172ae18b"
logImageAsync(url).then(
    image => console.log(image.url),
    e => console.warn(e)
)
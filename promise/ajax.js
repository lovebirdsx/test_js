import { XMLHttpRequest } from 'xmlhttprequest';

const getContent = function (url) {
    const promise = new Promise(function (resolve, reject) {
        const handler = function () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.responseText)
            } else {
                reject(new Error(this.statusText))
            }
        }
        const client = new XMLHttpRequest()
        client.open('GET', url)
        client.onreadystatechange = handler
        client.responseType = 'text'
        client.setRequestHeader('Accept', 'application/text')
        client.send()
    })
    return promise
}

const url = 'https://www.sqlite.org/about.html'
console.log('Get contetn from', url)
getContent(url).then(function (text) {
    console.log('Contents: \n' + text)
}, function (error) {
    console.error('Error', error)
})

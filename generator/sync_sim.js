// import { XMLHttpRequest } from 'xmlhttprequest'
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

function* main() {
    let response = yield request_url('https://www.sqlite.org/about.html')
    console.log(response)
}

function request_url(url) {
    let req = new XMLHttpRequest()
    req.open('GET', url)
    req.onreadystatechange = function () {
        if (this.readyState !== 4) {
            return
        }

        if (this.status == 200) {
            it.next(this.responseText)
        } else {
            it.throw(this.status)
        }
    }
    req.send()
}

var it = main()
it.next()

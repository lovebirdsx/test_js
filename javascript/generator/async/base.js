import fetch from 'node-fetch'

function* main() {
    var url = "https://www.sqlite.org/about.html"
    var result = yield fetch(url)
    console.log(result)
}

let m = main()
var result = m.next()
result.value.then(
    data => data.json
).then((data) => {
    m.next(data)
})
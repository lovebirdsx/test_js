import thunkify from 'thunkify'
import fs from 'fs'

const readFileThunk = thunkify(fs.readFile)
function* gen() {
    let r1 = yield readFileThunk('package.json')
    console.log(r1.toString())
    let r2 = yield readFileThunk('package-lock.json')
    console.log(r2.toString())
}

let g = gen()
let r1 = g.next()
r1.value(function (err, data) {
    if (err) {
        throw err
    }
    var r2 = g.next(data)
    r2.value(function (err, data) {
        if (err) {
            throw err
        }
        g.next(data)
    })
})

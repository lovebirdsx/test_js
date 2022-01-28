import thunkify from 'thunkify'
import fs from 'fs'

const readFileThunk = thunkify(fs.readFile)

function* gen() {
    let r1 = yield readFileThunk('package.json')
    console.log(r1.toString())
    let r2 = yield readFileThunk('package-lock.json')
    console.log(r2.toString())
    let r3 = yield readFileThunk('.gitignore')
    console.log(r3.toString())
}

function run(fun) {
    let g = fun()
    function cb(err, data) {
        var result = g.next(data)
        if (err) {throw err}
        if (result.done) {return}
        result.value(cb)
    }
    
    cb()
}

run(gen)

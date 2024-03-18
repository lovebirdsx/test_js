import thunkify from 'thunkify'
import fs from 'fs'
import co from 'co'

let readFile = thunkify(fs.readFile)

function* gen() {
    let r2 = yield readFile('package.json')
    console.log(r2.toString())
    let r3 = yield readFile('yarn.lock')
    console.log(r3.toString())
}

co(gen)

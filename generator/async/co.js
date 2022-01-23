import thunkify from 'thunkify'
import fs from 'fs'
import co from 'co'

let readFile = thunkify(fs.readFile)

function* gen() {
    let r1 = yield readFile('.gitignore')
    console.log(r1.toString())
    let r2 = yield readFile('package.json')
    console.log(r2.toString())
    let r3 = yield readFile('package-lock.json')
    console.log(r3.toString())
}

co(gen)

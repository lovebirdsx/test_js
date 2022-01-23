/**
 * 
 * @param {Function} fun 
 * @returns 
 */
const Thunk = function (fun) {
    return function (... args) {
        return function (callback) {
            return fun.call(this, ...args, callback)
        }
    }
}

function f(a, b, c, cb) {
    cb(a, b, c)
}

const ft = Thunk(f)
ft(1, 'hello', 'world')(console.log)

/**
 * @param {Array} array 
 * @returns 
 */
function makeIterator(array) {
    var nextIndex = 0
    return {
        next: function () {
            return nextIndex < array.length ? 
             {value: array[nextIndex++]} :
             {done: true}
        }
    }
}

var it = makeIterator([1,2,3])
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())
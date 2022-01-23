var arr = [1, [1, 2], 5, [1, 2, 3]]

function* flat(array) {
    for (let i = 0; i < array.length; i++) {
        const v = array[i]
        if (typeof v !== 'number') {
            yield* flat(v)
        } else {
            yield v
        }
    }
}

for (const i of flat(arr)) {
    console.log(i)
}
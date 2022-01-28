function* getEntries(object) {
    for (const key in object) {
        yield [key, object[key]]
    }
}

for (const [key, value] of getEntries({a:1, b:2})) {
    console.log(key, value)
}
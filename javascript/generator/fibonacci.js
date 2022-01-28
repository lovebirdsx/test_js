function* fibonacci() {
    let [a, b] = [0, 1]
    for (;;) {
        [a, b] = [b, a+b]
        yield b
    }
}

for (const i of fibonacci()) {
    if (i > 1024) {
        break
    }
    console.log(i)
}

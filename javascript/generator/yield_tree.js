const a = [1, 2, [10, 11, [100, 101]], [20, 21]]
function* iterTree(tree) {
    if (Array.isArray(tree)) {
        for (let i = 0; i < tree.length; i++) {
            yield* iterTree(tree[i])
        }
    } else {
        yield tree
    }
}

for (const i of iterTree(a)) {
    console.log(i)
}
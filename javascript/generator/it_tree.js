function TreeNode(left, label, right) {
    this.left = left
    this.label = label
    this.right = right
}

/**
 * @param {Array} array 
 */
function make_tree(array) {
    if (array.length == 1) {
        return new TreeNode(null, array[0], null)
    } else {
        return new TreeNode(make_tree(array[0]), array[1], make_tree(array[2]))
    }
}

var tree = make_tree([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]])

/**
 * 
 * @param {TreeNode} tree 
 * @returns 
 */
function* treeIterator(tree) {
    if (!tree) {
        return;
    }

    yield* treeIterator(tree.left)
    yield tree.label
    yield* treeIterator(tree.right)
}

for (const i of treeIterator(tree)) {
    console.log(i)
}
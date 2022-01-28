let foo = {
    data: ['foo', 'bar', 'car', 'baz'],
    [Symbol.iterator]: function () {
        var index = 0
        var data = this.data
        return {
            next: function () {
                if (index < data.length) {
                    return {value: data[index++]}
                } else {
                    return {done: true}
                }
            }
        }
    }
    
    // 使用下面的方式类似
    // [Symbol.iterator]: function () {
    //     return this.data[Symbol.iterator]()
    // }
}

for (const i of foo) {
    console.log(i)
}
let obj = new Proxy ({}, {
    get: function (target, propKey, receiver) {
        console.log(`get ${propKey}`)
        return Reflect.get(target, propKey, receiver)
    },
    set: function (target, propKey, value, receiver) {
        console.log(`setting ${propKey} ${value}`)
        return Reflect.set(target, propKey, value, receiver)
    }
})

obj.count = 1
++obj.count
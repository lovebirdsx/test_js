Promise.resolve().then(() => {
    console.log('first')
    x = 1;
}).then(() => {
    console.log('second')
}).catch((e) => {
    console.log(e)
}).finally(() => {
    console.log('finally')
})
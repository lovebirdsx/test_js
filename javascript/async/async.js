const fs = require('fs');

// setTimeout 的形式
// setTimeout(() => {
//     console.log('Wait 1 second');
// }, 1000);

// Promise的形式
// const myPromise = new Promise((resolve, reject) => {
//     const rand = Math.floor(Math.random() * 2);
//     if (rand === 0) {
//         resolve();
//     } else {
//         reject();
//     }
// })

// myPromise.then(
//     () => console.log('Success')
// ).catch(
//     () => console.log('Something goes wrong')
// );

// fs.promises
//     .readFile('async.js', {encoding: 'utf-8'})
//     .then((data) => console.log(data))
//     .catch((err) => console.error(err));

// async/await 形式
const readFile = async() => {
    try {
        const data = await fs.promises.readFile('async.js', {encoding: 'utf-8'});
        console.log(data);
        const data2 = await fs.promises.readFile('async1.js', {encoding: 'utf-8'});
        console.log(data2);
    } catch (error) {
        console.error(error);
    }
}

readFile();

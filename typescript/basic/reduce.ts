const tests = {
    sum: () => {
        const a = [1, 2, 3];
        console.log('sum', a.reduce((prev, curr) => prev + curr));
    },
    cost: () => {
       const products = [
           { name: '苹果', count: 2, price: 5 },
           { name: '桃子', count: 3, price: 4 },
           { name: '李子', count: 5, price: 3 },
       ];

       const cost = products.reduce((prev, curr) => prev + curr.price * curr.count, 0);
       console.log('cost', cost);
    },
    countChar: () => {
        const str = 'abcdaadsbad';
        const counts = str.split('').reduce((res, curr) => {
            if (res[curr]) {
                res[curr]++;
            } else {
                res[curr] = 1;
            }
            return res;
        }, {} as Record<string, number>);
        console.log('counts', counts);
    },
};

Object.values(tests).forEach((e) => e());

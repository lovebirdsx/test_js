function cal_6_count(n) {
    let count = 0;
    for (let i = 1; i <= n; i++) {
        let str = i.toString();
        for (let j = 0; j < str.length; j++) {
            if (str[j] == '6') {
                count++;
            }
        }
    }
    return count;
}

const arr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 10000000];
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i], cal_6_count(arr[i]));
}

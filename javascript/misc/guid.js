/*
* 功能：格式化32位的字符串为GUID模式的字符串
* 参数：第1个参数表示32位的字符串
* 返回值：标准GUID格式的字符串
*/
function formatGUID(guidStr) {
    const str1 = `${guidStr.slice(0, 8)}-`;
    const str2 = `${guidStr.slice(8, 12)}-`;
    const str3 = `${guidStr.slice(12, 16)}-`;
    const str4 = `${guidStr.slice(16, 20)}-`;
    const str5 = guidStr.slice(20);

    return str1 + str2 + str3 + str4 + str5;
}

/*
* 功能：将y进制的数值，转换为x进制的数值
* 参数：第1个参数表示欲转换的数值；第2个参数表示欲转换的进制；第3个参数可选，表示当前的进制数，如不写则为10
* 返回值：返回转换后的字符串
*/
function hexadecimal(num, x, y) {
    if (y !== undefined) {
        return parseInt(num.toString(), y).toString(x);
    }
    return parseInt(num.toString(), 10).toString(x);
}

/*
* 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现
* 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串
* 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串
*/
function addZero(num) {
    if (Number(num).toString() !== 'NaN' && num >= 0 && num < 10) {
        return `0${Math.floor(num)}`;
    }
    return num.toString();
}

/*
* 功能：获取当前日期的GUID格式，即8位数的日期：19700101
* 返回值：返回GUID日期格式的字条串
*/
function getGUIDDate(date) {
    return (
        date.getFullYear()
        + addZero(date.getMonth() + 1)
        + addZero(date.getDay())
    );
}

/*
* 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933
* 返回值：返回GUID日期格式的字条串
*/
function getGUIDTime(date) {
    return (
        addZero(date.getHours())
        + addZero(date.getMinutes())
        + addZero(date.getSeconds())
        + addZero(parseInt(date.getMilliseconds() / 10, 10))
    );
}

function newGUID() {
    const date = new Date();
    let guidStr = '';
    const sexadecimalDate = hexadecimal(getGUIDDate(date), 16);
    const sexadecimalTime = hexadecimal(getGUIDTime(date), 16);

    for (let i = 0; i < 9; i++) {
        guidStr += Math.floor(Math.random() * 16).toString(16);
    }

    guidStr += sexadecimalDate;
    guidStr += sexadecimalTime;
    while (guidStr.length < 32) {
        guidStr += Math.floor(Math.random() * 16).toString(16);
    }

    return formatGUID(guidStr);
}

for (let i = 0; i < 16; i++) {
    console.log(newGUID());
}

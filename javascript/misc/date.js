const date = new Date();
console.log(date.toString());
console.log(date.getFullYear(), date.getMonth() + 1, date.getDate());

const dateString = `${date.toLocaleString()}`;
console.log(dateString);

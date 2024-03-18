function firstFunction() {
  secondFunction();
}

function secondFunction() {
  thirdFunction();
}

function thirdFunction() {
  console.trace();
}

function main() {
  firstFunction();
}

main();

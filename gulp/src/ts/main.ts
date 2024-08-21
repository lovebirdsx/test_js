import {
    add, divide, multiply, subtract,
} from './module/foo';

function main() {
    console.log('1 + 2 =', add(1, 2));
    console.log('1 - 2 =', subtract(1, 2));
    console.log('1 * 2 =', multiply(1, 2));
    console.log('1 / 2 =', divide(1, 2));
}

main();

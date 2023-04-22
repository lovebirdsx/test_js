import { getTime } from './time';

export function log(str: string) {
    // getTime()以10个字符的宽度打印
    console.log(`${getTime().toFixed(1).padStart(6)} ${str}`);
}

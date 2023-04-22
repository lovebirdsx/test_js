import { getTime } from './time';

export function logT(str: string) {
    console.log(`${getTime().toFixed(1).padStart(4)} ${str}`);
}

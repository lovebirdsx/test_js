const color = (str: string, colorCode: number) => `\u001b[${colorCode}m${str}\u001b[0m`;

export const red = (str: string) => color(str, 31);
export const green = (str: string) => color(str, 32);
export const yellow = (str: string) => color(str, 33);
export const blue = (str: string) => color(str, 34);
export const magenta = (str: string) => color(str, 35);
export const cyan = (str: string) => color(str, 36);

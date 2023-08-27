/**
 * 将缩进转换为字符串
 * @param indent 缩进
 * @returns 字符串
 */
export function indentToStr(indent?: number): string {
    if (!indent) {
        return '';
    }
    return ' '.repeat(indent * 4);
}

/**
 * 等待指定毫秒数
 * @param ms 毫秒数
 */
export function wait(ms: number) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

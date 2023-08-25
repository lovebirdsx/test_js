import * as path from 'path';

/**
 * 获得错误的位置
 * @param err 错误对象
 * @param stackIndex 堆栈的层级，0表示当前函数，1表示调用当前函数的函数，以此类推
 */
export function getErrorLocation(err: Error, stackIndex: number) {
    const { stack } = err;
    if (!stack) {
        throw new Error('stack is undefined');
    }

    const lines = stack.split('\n');
    if (lines.length <= stackIndex + 1) {
        throw new Error('stack is too short');
    }

    const line = lines[stackIndex + 1];

    // 下面的每行都能匹配
    // File  : src\\test\\test_op.ts:152:28
    // "at D:\\git_project\\test_js\\rpc.test.ts:41:7"
    // "at TestOp.runCaseAsync (D:\\git_project\\test_js\\test_op.ts:152:28)"
    const match = line.match(/[(]*(\S+):(\d+):(\d+)/);

    if (!match) {
        throw new Error(`line: ${line} is not match`);
    }

    const file = match[1];
    const lineNum = Number.parseInt(match[2], 10);
    const columnNum = Number.parseInt(match[3], 10);

    return `${path.relative(process.cwd(), file)}:${lineNum}:${columnNum}`;
}

/**
 * 获得调用者的位置
 * @param stackIndex 堆栈的层级，0表示当前函数，1表示调用当前函数的函数，以此类推
 */
export function getCallerLocation(stackIndex: number) {
    return getErrorLocation(new Error(), stackIndex + 1);
}

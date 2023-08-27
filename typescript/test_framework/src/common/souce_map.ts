import { SourceMapConsumer } from 'source-map';
import { existsSync, readFileSync } from 'fs';
import { dirname, join, relative } from 'path';

const sourceMapCache = new Map<string, SourceMapConsumer>();

/**
 * 将js文件的位置转换为源文件的位置
 * @param jsFile js文件
 * @param jsLine js文件的行号
 * @param jsColumn js文件的列号
 * @returns 源文件的位置，格式为：文件名:行号:列号
 * @throws 如果找不到source map，则抛出异常
 */
function jsToSource(jsFile: string, jsLine: number, jsColumn: number) {
    const sourceMapPath = `${jsFile}.map`;
    if (!existsSync(sourceMapPath)) {
        throw new Error(`Source map not found: ${sourceMapPath}`);
    }

    let consumer = sourceMapCache.get(sourceMapPath);
    if (!consumer) {
        const rawSourceMap = JSON.parse(readFileSync(sourceMapPath, 'utf8'));
        consumer = new SourceMapConsumer(rawSourceMap);
        sourceMapCache.set(sourceMapPath, consumer);
    }

    const lookup = consumer.originalPositionFor({
        line: jsLine,
        column: jsColumn,
    });

    // lookup返回的是相对于源文件的位置，需要转换为相对于工作目录的位置
    const source = join(dirname(jsFile), lookup.source);
    return `${relative(process.cwd(), source)}:${lookup.line}:${lookup.column}`;
}

/**
 * 获得错误的位置
 * @param err 错误对象
 * @param stackIndex 堆栈的层级，0表示当前函数，1表示调用当前函数的函数，以此类推
 * @returns 错误的位置，格式为：文件名:行号:列号
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
    const match = line.match(/[(]*(\S+):(\d+):(\d+)/);

    if (!match) {
        throw new Error(`line: ${line} is not match`);
    }

    const jsFile = match[1];
    const jsLine = Number.parseInt(match[2], 10);
    const jsColumn = Number.parseInt(match[3], 10);

    return jsToSource(jsFile, jsLine, jsColumn);
}

/**
 * 获得调用者的位置
 * @param stackIndex 堆栈的层级，0表示当前函数，1表示调用当前函数的函数，以此类推
 * @returns 调用者的位置，格式为：文件名:行号:列号
 */
export function getCallerLocation(stackIndex: number) {
    return getErrorLocation(new Error(), stackIndex + 1);
}

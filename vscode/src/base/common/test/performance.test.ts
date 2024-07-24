import { getMarks, mark } from "../performance";
import * as assert from 'assert';

suite('Performance', () => {
    test('simple', () => {
        mark('start');
        mark('end');
        const marks = getMarks();
        assert.strictEqual(marks.length, 3);
        assert.strictEqual(marks[1].name, 'start');
        assert.strictEqual(marks[2].name, 'end');
    });

    test('nodejs perf', () => {
        performance.mark('start');
        performance.mark('end');
        const marks = performance.getEntries();
        assert.strictEqual(marks.length, 2);
    });
});
import { getMarks, mark } from "../performance";

describe('Performance', () => {
    it('simple', () => {
        mark('start');
        mark('end');
        const marks = getMarks();
        expect(marks.length).toEqual(3);
        expect(marks[1].name).toEqual('start');
        expect(marks[2].name).toEqual('end');
    });

    it('nodejs perf', () => {
        performance.mark('start');
        performance.mark('end');
        const marks = performance.getEntries();
        expect(marks.length).toEqual(2);
    });
});

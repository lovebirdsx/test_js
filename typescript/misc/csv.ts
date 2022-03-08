import { assert } from 'console';

module csv {
    function parseCSV(text: string): string[][] {
        let p = '';
        let row = [''];
        const ret = [row];
        let i = 0;
        let r = 0;
        let s = !0;

        // eslint-disable-next-line no-restricted-syntax
        for (let l of text) {
            if (l === '"') {
                if (s && l === p) {
                    row[i] += l;
                }
                s = !s;
            } else if (l === ',' && s) {
                row[++i] = '';
                l = '';
            } else if (l === '\n' && s) {
                if (p === '\r') {
                    row[i] = row[i].slice(0, -1);
                }
                row = [l = ''];
                ret[++r] = row;
                i = 0;
            } else {
                row[i] += l;
            }
            p = l;
        }
        return ret;
    }

    function stringifyCSV(rows: string[][]): string {
        const lines = rows.map((tockens) => {
            const formatedTockens = tockens.map((t) => {
                let addEscape = false;
                for (let i = 0; i < t.length; i++) {
                    const current = t[i];
                    const prev = t[i - 1];
                    if (current === ',' || current === '"' || (prev === '\r' && current === '\n')) {
                        addEscape = true;
                    }
                }
                if (addEscape) {
                    return `"${t.replace(/"/g, '""')}"`;
                }
                return t;
            });
            return formatedTockens.join(',');
        });
        return lines.join('\r\n');
    }

    function testParse() {
        const test = [
            '"one"',
            '"two with escaped """" double quotes"""',
            '"three, with, commas"',
            'four with no quotes',
            '"five with CRLF\r\n"\r\n"2nd line one"',
            '"two with escaped """" double quotes"""',
            '"three, with, commas"',
            'four with no quotes',
            '"five with CRLF\r\n"'].join(',');

        const result = parseCSV(test);

        assert(result.length === 2, 'result.length === 2');
        assert(result[0].length === 5, 'result[0].length === 5');
        assert(result[1].length === 5, 'result[1].length === 5');

        assert(result[0][0] === 'one', result[0][0]);
        assert(result[0][1] === 'two with escaped "" double quotes"', result[0][1]);
        assert(result[0][2] === 'three, with, commas', result[0][2]);
        assert(result[0][3] === 'four with no quotes', result[0][3]);
        assert(result[0][4] === 'five with CRLF\r\n', result[0][4]);
        assert(result[1][0] === '2nd line one', result[1][0]);
        assert(result[1][1] === 'two with escaped "" double quotes"', result[1][1]);
        assert(result[1][2] === 'three, with, commas', result[1][2]);
        assert(result[1][3] === 'four with no quotes', result[1][3]);
        assert(result[1][4] === 'five with CRLF\r\n', result[1][4]);

        console.log('testParse passed');
    }

    function testWrite() {
        const test = [
            'one',
            '"two with escaped """" double quotes"""',
            '"three, with, commas"',
            'four with no quotes',
            '"five with CRLF\r\n"\r\n2nd line one',
            '"two with escaped """" double quotes"""',
            '"three, with, commas"',
            'four with no quotes',
            '"five with CRLF\r\n"'].join(',');

        const array = parseCSV(test);
        const content = stringifyCSV(array);
        if (content !== test) {
            console.log(test);
            console.log(content);
        } else {
            console.log('testWrite passed');
        }
    }

    testParse();
    testWrite();
}

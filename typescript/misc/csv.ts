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

    function writeCSV(rows: string[][]): string {
        // eslint-disable-next-line no-restricted-syntax
        return '';
    }

    const test = '"one","two with escaped """" double quotes""","three, with, commas",four with no quotes,"five with CRLF\r\n"\r\n"2nd line one","two with escaped """" double quotes""","three, with, commas",four with no quotes,"five with CRLF\r\n"';
    console.log(parseCSV(test));
}

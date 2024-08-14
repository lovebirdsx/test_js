import MarkdownIt from 'markdown-it';

describe('simple test', () => {
    it('render hello', () => {
        const md = new MarkdownIt();
        const result = md.render('hello');
        expect(result).toBe('<p>hello</p>\n');
    });
});

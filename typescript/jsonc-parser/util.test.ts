import * as jsonc from 'jsonc-parser';

describe('Util', () => {
  it('strip comments', () => {
    const jsoncString = `{
        // This is a comment
        "key": "value"
      }`;

    // strip comments and remove empty lines
    const result = jsonc.stripComments(jsoncString).replace(/^\s*[\r\n]/gm, '');
    expect(result).toBe(`{
        "key": "value"
      }`);
  });

  it('apply edits', () => {
    const jsoncString = `{
        // This is a comment
        "key": "value"
      }`;

    const edits = [
      { offset: 0, length: 0, content: '//' },
      { offset: 0, length: 0, content: '//' },
    ];

    const result = jsonc.applyEdits(jsoncString, edits);
    expect(result).toBe(`////{
        // This is a comment
        "key": "value"
      }`);
  });

  it('modify', () => {
    const jsoncString = `{
        // This is a comment
        "key": "value"
      }`;

    const edit = jsonc.modify(jsoncString, ['key'], 'newValue', {});
    const result = jsonc.applyEdits(jsoncString, edit);
    expect(result).toBe(`{
        // This is a comment
        "key": "newValue"
      }`);
  });

  it('get location', () => {
    const jsoncString = `{
        // This is a comment
        "key": "value",
        "key2": "value2"
      }`;

    const location = jsonc.getLocation(jsoncString, jsoncString.indexOf('key2'));
    expect(location.path).toEqual(['key2']);
  });

  it('format', () => {
    const jsoncString = `{
        // This is a comment
        "key": "value",
        "key2": "value2"
      }`;

    const edit = jsonc.format(jsoncString, { offset: 0, length: jsoncString.length }, { tabSize: 2, insertSpaces: true });
    const result = jsonc.applyEdits(jsoncString, edit);
    expect(result).toBe(`{
  // This is a comment
  "key": "value",
  "key2": "value2"
}`);
  });

  it('find node at location', () => {
    const jsoncString = `{
        // This is a comment
        "key": "value",
        "key2": "value2"
      }`;

    const node = jsonc.findNodeAtLocation(jsonc.parseTree(jsoncString)!, ['key2']);
    expect(node?.type).toBe('string');
    expect(node?.offset).toBe(jsoncString.indexOf('value2') - 1);
    expect(node?.value).toBe('value2');
  });
});

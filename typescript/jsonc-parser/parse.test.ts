import * as jsonc from 'jsonc-parser';

describe('parse', () => {
  it('should parse a valid JSONC string', () => {
    const jsoncString = `{
        // This is a comment
        "key": "value"
      }`;
    const result = jsonc.parse(jsoncString);
    expect(result).toEqual({ key: 'value' });
  });

  it('should handle trailing commas', () => {
    const jsoncString = `{
        "key1": "value1",
        "key2": "value2", // trailing comma
      }`;
    const result = jsonc.parse(jsoncString);
    expect(result).toEqual({ key1: 'value1', key2: 'value2' });
  });

  it('should parse ok while miss right bracket', () => {
    const jsoncString = `{
        "key": "value",
        "key2": "value2"
      `;
    const result = jsonc.parse(jsoncString);
    expect(result).toEqual({ key: 'value', key2: 'value2' });
  });

  it('should parse nested JSONC objects', () => {
    const jsoncString = `{
        "outer": {
          "inner": {
            // nested comment
            "key": "value"
          }
        }
      }`;
    const result = jsonc.parse(jsoncString);
    expect(result).toEqual({ outer: { inner: { key: 'value' } } });
  });

  it('should parse arrays in JSONC', () => {
    const jsoncString = `{
        "array": [
          1, // first element
          2, // second element
          3  // third element
        ]
      }`;
    const result = jsonc.parse(jsoncString);
    expect(result).toEqual({ array: [1, 2, 3] });
  });
});

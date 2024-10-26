import * as jsonc from 'jsonc-parser';

describe('modify', () => {
  it('basic', () => {
    const jsoncString = '{"key": "value"}';
    const edits = jsonc.modify(jsoncString, ['key'], 'newValue', { });
    const result = jsonc.applyEdits(jsoncString, edits);
    expect(result).toEqual('{"key": "newValue"}');
  });

  it('insert key', () => {
    const jsoncString = '{}';
    const edits = jsonc.modify(jsoncString, ['key'], 'value', { });
    const result = jsonc.applyEdits(jsoncString, edits);
    expect(result).toEqual('{"key": "value"}');
  });

  // 在指定位置插入键值对
  it('insert key at position', () => {
    const jsoncString = '{"key2": "value2"}';
    const edits1 = jsonc.modify(jsoncString, ['key1'], 'value1', { getInsertionIndex: () => 0 });
    const result1 = jsonc.applyEdits(jsoncString, edits1);
    expect(result1).toEqual('{"key1": "value1","key2": "value2"}');

    const edits2 = jsonc.modify(result1, ['key3'], 'value3', { getInsertionIndex: () => 2 });
    const result2 = jsonc.applyEdits(result1, edits2);
    expect(result2).toEqual('{"key1": "value1","key2": "value2","key3": "value3"}');
  });
});

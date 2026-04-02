describe('string', () => {
  describe('compare', () => {
    it('pinyin', () => {
      const strList = ['宋晓', '郭白鹭', '蒋临风', '张焕新'];
      const collator = new Intl.Collator('zh-Hans-CN-u-co-pinyin');
      const sortedList = strList.sort((a, b) => collator.compare(a, b));
      expect(sortedList).toEqual(['郭白鹭', '蒋临风', '宋晓', '张焕新']);
    });
  });
});

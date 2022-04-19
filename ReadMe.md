# ReadMe

## Prepare

- `npm install`

## VScode Plugins

- `ESLint`

## Remember

### typescript

- circular: 与循环引用相关的测试
  - class_case_fail/use.ts 错误的用例
  - class_case_ok/use.ts 正确的用例
  - error_case 循环引用示例分析
  - 参考
    - <https://medium.com/visual-development/how-to-fix-nasty-circular-dependency-issues-once-and-for-all-in-javascript-typescript-a04c987cf0de>
    - <https://github.com/mweststrate/remmi/tree/master/src>
  - 个人认为最佳方案是通过循环引用检查工具来检查,避免这个情况的发生 `npm run madge`

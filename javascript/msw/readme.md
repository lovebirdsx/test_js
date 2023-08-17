# 说明

* 安装 `npm ci`
* 运行 `npm start`
* watch 模式运行 `npm run watch`
* 测试 `npm test`

## 相关说明

* babel: 用于编译 es6 语法
* msw: 用于 mock api
* jest: 用于测试
* package.json中type: module, 用于支持 es6 语法

## 注意事项

* handlers.js中的url必须与login.test.js中的url一致，譬如：`http://localhost/login`，不能简写为`/login`，否则会报错
* sessionStorage是在浏览器中运行的，所以在node环境中无法使用，需要mock

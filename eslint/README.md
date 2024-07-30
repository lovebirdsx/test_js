# 说明

* 测试eslint的相关用法
* 新版的eslint已经采用flat配置方式

## 命令

* `yarn` - 安装依赖
* `yarn lint` - 检查代码
* `yarn lint:fix` - 修复代码
* `yarn lint:watch` - 监听代码变化，并检查代码
* `yarn lint:out-config` - 输出eslint配置

## 测试方法

* 安装依赖，运行 `yarn lint:watch`
* 修改 `eslint.config.mjs` 中的配置，查看控制台代码检查结果的变化

## 其它

* [eslint配置文件说明](https://eslint.org/docs/latest/use/configure/configuration-files)

## 值得注意的点：

### 默认files

* [参考](https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores)
* eslint使用的时minimatch，所以可以使用glob语法
* 默认files是`["**/*.js", "**/*.mjs"]`，除非显示地在ignores中配置，否则会检查所有js和mjs文件

### 全局ignore

* [参考](https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores)
* 默认加入全局忽略列表的配置，`["**/node_modules/", ".git/"]`
* 如果配置了一个只有ignores的config，那么eslint会忽略ignores中的文件

### Prettier不检查数组在同一行

* 默认情况下，prettier会让数组在同一行
* 暂时没有解决方案，[参考](https://github.com/prettier/prettier-vscode/issues/352)
* 曲线救国：在某个元素之后加上一个注释，让prettier不要合并数组

``` js
const a = [
    1, //
    2,
    3,
];
```
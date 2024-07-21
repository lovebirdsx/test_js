# 说明

* 用于测试热更新的项目
* [参考](https://github.com/airuikun/node-reload)

## 命令

* `yarn` 安装依赖
* `yarn watch` 监听文件变化，实时编译
* `yarn start` 运行
* `yarn start:hot` 以热更新模式运行
* vscode运行 `Hot Reload`，会自动运行watch和start:hot

## 原理

* 通过watch，自动编译ts文件到dist目录
* hot-reload.js监听dist目录的变化，将node中的模块缓存清除，重新加载模块

## todo

* 目前只是替换了模块，并不能在热更时进行一些操作，比如释放资源，重新初始化等

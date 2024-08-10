# 说明

* 多个ts项目，其中某一个项目作为公共库，其他项目引用该库，如何通过webpack来打包

## 指令

* `yarn`：安装
* `yarn clean`：清理
* `yarn build`：打包
* `yarn start`：启动app
* `yarn watch`：监听文件变化，并自动重启app
  * 尝试修改相关ts文件，查看app的输出

## 关键配置

* 将 webpack中 ts-loader的配置中的`transpileOnly`设置为`true`，避免webpack报错
  * 参考 `packages/app/webpack.config.js`
* lib中的package.json定义exports，让webpack可以正确处理模块导入
  * 参考 `packages/lib/package.json`

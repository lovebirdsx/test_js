# 说明

4个文件夹分别对应了4种模块使用的方式

* commonjs
* amd nodejs下要支持amd，需要安装`requirejs`模块
* umd umd是通用模块定义，本质上是一个兼容amd和commonjs的模块定义
* es es6模块定义，package.json中的`type`字段需要设置为`module`

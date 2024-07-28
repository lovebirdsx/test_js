# 说明

* 演示ts分模块进行编译的方案
* ts的引用通过tsconfig.json中的references进行配置
* js中带有别名的引用通过module-alias进行配置

``` ts
import { addAlias } from 'module-alias';
addAlias('@mytest/common', __dirname + '/../../common/out');
```
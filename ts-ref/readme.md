# 说明

主要验证Monorepo中的ts重命名，查找引用等问题

* [参考](https://github.com/nrwl/nx/issues/3106#issuecomment-703154400)

注意：

* [tsconfig.json](./tsconfig.json)中references中只需要加入common即可
* frontend和backend不需要配置，也可以实现正常的引用，重命名等操作

``` json
"references": [
    { "path": "./common" }    
]
```
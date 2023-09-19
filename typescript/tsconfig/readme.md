# 说明

* 测试vscode解析typescript代码的规则

## 结论

* vscode以tsconfig.json来识别ts项目
* 某个文件中的符号，是否被其它文件引用，是根据tsconfig.json中的files和include来判断的
* tsconfig.json默认只引用当前目录下的所有文件

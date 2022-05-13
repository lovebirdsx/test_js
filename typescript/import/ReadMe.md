# ReadMe

测试import机制

结论:

- import其实就是调用一个接口, 将对应文件中的内容执行一遍
- 所以main中import foo时, 会执行foo中的全局函数

# ReadMe

测试流程状态管理

- ActionRunner可以执行Action数组
- 执行的过程可以中断, 也可以从某个位置开始执行
- 有些Action是无法中断的, 故而停止Runner会失败

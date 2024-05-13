# 说明

本项目用于验证回合制游戏中，技能中Action和表现的同步方式

## 思路

* 技能是由多个Action构成的，Action按照顺序执行
* Action执行时，会对目标执行效果，比如造成伤害，添加护盾等
* 目标在执行Action时，会有表现，譬如飘血，飘字等
* 技能层的配置完全和表现分离
* 由显示曾来根据目标的状态变化，来决定表现的展示
* Action自带一个属性，就是是否等待表现结束，如果等待表现结束，那么当前Action一直要等到表现结束才算结束

## 实现

* 构造了一个全局的`Performer`来管理表现
* 表现层会根据需要来决定是否要占用`Performer`的资源
* Action执行的结束，必须要等到表现结束才算结束

## 示例

* Skill模块执行Action，对Entity造成伤害
* Entity触发回调，EntityView响应，占用Performer资源，表现飘血
* Action等待表现结束，表现结束后，Action结束
* Skill接着执行下一个Action

## 测试方法

* 确保全局安装了ts-node
* 运行 `yarn start`
* 观察控制台输出

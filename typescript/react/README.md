# 说明

## 单元测试

* reducer.spec.tsx: 测试react原生的reducer使用
* repaint.spec.tsx: 测试各种情况下的react重绘
* zustand.spec.tsx: 测试zustand的使用
* schema.spec.tsx: 基于schema数据的渲染方案
* decorator.spec.tsx: 基于装饰器的Schema渲染测试

## 功能测试

### decorator.live.tsx

* 通过 `tsx watch decorator.live.tsx` 进行实时测试
* 运行后会在 temp/ 目录下生成 `decorator.live.html` 文件
* vscode安装 `liveserver` 插件，右键点击 `decorator.live.html` 选择 `Open with Live Server` 进行实时测试

# 说明

- 个人使用的electron ts模板

## 相关指令

- 开始运行: `npm start`，可以支持热更渲染进程，如果想重新加载主进程，在命令行中输入`rs`
- 打包: `npm run make`
- 调试: 直接使用vscode的调试功能

## 坑记录

### prettier配置

- 安装prettier

```bash
npm i --save-dev prettier
npm i --save-dev eslint-config-prettier
npm i --save-dev eslint-plugin-prettier
```

- 需要在eslint的配置文件中添加如下配置

```json
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

- .prettierrc.json 代表的是prettier的配置文件, **修改之后需要重启eslint才生效**

### eslint配置

- 现象: https://github.com/facebook/create-react-app/issues/11825
- 产生原因: 相关plugin的配置和eslint的配置冲突
- 解决方案: 去掉eslint的配置文件中相关的配置

```json
{
  "extends": [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    ]
}
```

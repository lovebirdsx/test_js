# 说明

vscode中相关技术实验

## 注意事项

* 为了让jest能够识别ts中的decorator，需要：
  * 在jest.config.js中加入
    ```js {
        transform: {
            '^.+\\.tsx?$': 'ts-jest',
        },
    }
    ```
  * 安装`@babel/plugin-proposal-decorators`: `npm i -D @babel/plugin-proposal-decorators`
  * 在.babelrc中配置`@babel/plugin-proposal-decorators`，如下：
    ```json
    {
      "plugins": [
        ["@babel/plugin-proposal-decorators", {"decoratorsBeforeExport": true}],
      ]
    }
    ```
* 为了让jest能够支持对参数装饰器的识别，需要：
  * 安装`babel-plugin-parameter-decorator`: `npm i -D babel-plugin-parameter-decorator`
  * 在.babelrc中配置`@babel/plugin-proposal-decorators`，如下：
    ```json
    {
      "plugins": [
        "babel-plugin-parameter-decorator"
      ]
    }
    ```

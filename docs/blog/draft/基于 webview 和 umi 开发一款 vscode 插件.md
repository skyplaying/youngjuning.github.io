---
title: 基于 umi 从零开发一款 vscode 插件
cover: https://cdn.jsdelivr.net/gh/youngjuning/images/20210802155956.png
tags:
---

> 大家好，我是[洛竹](https://github.com/youngjuning)🎋，一只住在杭城的木系前端 🧚🏻‍♀️，如果你喜欢我的文章 📚，可以通过点赞帮我聚集灵力 ⭐️。

## 初始化项目

### 初始化 vscode 插件

安装 [Yeoman](http://yeoman.io/) 和 [VS Code Extension Generator](https://www.npmjs.com/package/generator-code)：

```sh
$ npm install -g yo generator-code
```

这个脚手架会生成一个可以立马开发的项目。运行生成器，然后填好下列字段：

```sh
$ yo code
#     _-----_     ╭──────────────────────────╮
#    |       |    │   Welcome to the Visual  │
#    |--(o)--|    │   Studio Code Extension  │
#   `---------´   │        generator!        │
#    ( _´U`_ )    ╰──────────────────────────╯
#    /___A___\   /
#     |  ~  |
#   __'.___.'__
# ´   `  |° ´ Y `

# ? What type of extension do you want to create? New Extension (TypeScript)
# ? What's the name of your extension? webview-umi
# ? What's the identifier of your extension? webview-umi
# ? What's the description of your extension? webview umi vscode extension demo
# ? Initialize a git repository? Yes
# ? Bundle the source code with webpack? No
# ? Which package manager to use? yarn

code ./webview-umi
```

### 初始化 umi 项目

使用 umi 脚手架在根目录新建一个 `web` 目录。

```sh
$ mkdir web && cd web
```

通过官方工具创建项目：

```sh
$ yarn create @umijs/umi-app
```

修改 `.umirc.ts` 配置：

```ts
import { defineConfig, IConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  history: {
    type: 'memory',
  },
  devServer: {
    writeToDisk: filePath =>
      ['umi.js', 'umi.css'].some(name => filePath.endsWith(name)),
  },
} as IConfig);
```

- Fast Refresh（ 快速刷新）：开发时可以保持组件状态，同时编辑提供即时反馈。
- `history.type`：默认的类型是 `browser`，但是由于 vscode webview 环境不存在浏览器路由，改成 `memory` 和 `hash` 都可以
- `devServer.writeToDisk`：开发阶段将 umi js 和 css 文件写入本地，方便调试。

修改 `package.json` 加入 `name`、`version`、`description`：

```json
{
  "name": "web",
  "version": "0.0.0",
  "description": "web for webview-umi"
}
```

### .gitignore

将 vscode extension 和 umijs 脚手架生成的 gitignore 合并为一下内容：

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/npm-debug.log*
/yarn-error.log
/package-lock.json

# production
/dist

# misc
.DS_Store

# umi
**/src/.umi
**/src/.umi-production
**/src/.umi-test
**/.env.local
/web/yarn.lock

# vscode
out
dist
node_modules
.vscode-test/
*.vsix
```

### yarn workspace

由于我们的项目是 vscode 扩展和 web 项目混合的项目。为了方便管理脚本和依赖，我们引入了 `yarn workspace` 来管理项目。在根目录的 `package.json` 中加入以下配置即可：

```json
{
  "private": "true",
  "workspaces": ["web"]
}
```

## 调试

由于我们的 web 项目也需要编译，所以我们需要修改一下 vscode `launch.json` 加入 web 项目的编译任务。配置参考了 [appworks](http://tny.im/bOqQT)。

首先修改根目录的 `package.json` 的 scripts:

```json
{
  "scripts": {
    "vscode:prepublish": "yarn build:web && yarn compile",
    "build:web": "yarn workspace web run build",
    "watch:web": "yarn workspace web run start",
    "precompile": "rimraf out",
    "compile": "tsc -p ./",
    "prewatch": "rimraf out",
    "watch": "tsc -watch -p ./",
    "pretest": "yarn compile && yarn lint",
    "lint": "eslint src --ext ts",
    "test": "node ./out/test/runTest.js"
  }
}
```

然后修改 `.vscode/lanuch.json` 配置为：

```json
// A launch configuration that compiles the extension and then opens it inside a new window
// Use IntelliSense to learn about possible attributes.
// Hover to view descriptions of existing attributes.
// For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
{
  "version": "0.2.0",
  "compounds": [
    // 复合列表。每个复合可引用多个配置，这些配置将一起启动。
    {
      "name": "Debug Extension", // 复合的名称。在启动配置下拉菜单中显示。
      "configurations": [
        // 将作为此复合的一部分启动的配置名称。
        "Run Extension",
        "Watch Webview"
      ],
      "presentation": {
        "order": 0
      }
    }
  ],
  "configurations": [
    {
      "name": "Watch Webview",
      "request": "attach",
      "type": "node",
      "preLaunchTask": "npm: watch:web"
    },
    {
      "name": "Run Extension",
      "type": "extensionHost",
      "request": "launch",
      "args": ["--extensionDevelopmentPath=${workspaceFolder}"],
      "outFiles": ["${workspaceFolder}/out/**/*.js"],
      "preLaunchTask": "${defaultBuildTask}"
    }
  ]
}
```

完成后进入 VS Code，按下`F5`，你会立即看到一个**插件发开主机**窗口，其中就运行着插件。这时候运行你会发现控制台报一下错误 ❌：

```
error TS6059: File '/Users/luozhu/Desktop/github/vscode-extension-demo/webview-umi/web/src/pages/index.tsx' is not under 'rootDir' '/Users/luozhu/Desktop/github/vscode-extension-demo/webview-umi/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by include pattern '**/*' in '/Users/luozhu/Desktop/github/vscode-extension-demo/webview-umi/tsconfig.json'
```

原因是因为 umi 的约定的项目结构和 vscode extension 都包含 `src` 目录。由于 vscode 插件和 umi 的编译是分开的，我们在根目录的 `tsconfig.json` 中将 `web` 目录忽略即可：

```json
{
  "exclude": ["web"]
}
```

另外你还需要设置 `"skipLibCheck": true` 来修改 Typescipt 编译错误。

现在，你可以按下 `F5` 看到**插件发开主机**窗口的同时还会看到两个调试任务：

![](https://cdn.jsdelivr.net/gh/youngjuning/images/20210802200826.png)

在命令面板(`Ctrl+Shift+P`)中输入`Hello World`命令。

![](https://cdn.jsdelivr.net/gh/youngjuning/images/20210802200914.png)

## vscode 插件核心概念

在开始 webview 能力开发之前，我们有必要了解一下 vscode 插件开发的核心概念。为了有个全局的理解，我们先来看下我们现在项目的目录结构：

```sh
.
├── CHANGELOG.md # 基于 standard-version 生成的更新日志文件
├── README.md
├── package.json # vscode 包配置文件，诸如插件 LOGO、名字、描述、注册激活事件
├── src
│   └── extension.ts # 插件入口文件，暴露 activate 方法用于注册命令和初始化一些配置，暴露 deactivate 方法用于插件关闭前执行清理工作
├── tsconfig.json # vscode 的编译配置
├── web # 基于 umi 的 web，也是我们后边 webview 要承载的内容
└── yarn.lock
```

从目录结构可以看出，关键的文件是 `package.json` 和 `extension.ts`，我们以 helloWorld 命令为例介绍下 vscode 插件的三个核心概念。

### 1. 激活事件

**激活事件**是在 `package.json` 中的 `activationEvents` 字段声明的一个 JSON 数组对象。为了注册 helloWorld 这个命令，第一步就是注册激活事件，激活事件类型有很多，注册命令的激活事件是 `onCommand`:

```json
{
  "activationEvents": ["onCommand:webview-umi.helloWorld"]
}
```

### 2. 发布内容配置

发布内容配置（ 即 VS Code 为插件扩展提供的配置项）是 `pacakge.json` 的 `contributes` 字段，你可以在其中注册各种配置项扩展 VS Code 的能力。上一步我们注册的 helloWorld 激活事件只是告诉了 vscode 可以通过 `webview-umi.helloWorld` 命令触发。我们还需要再 `contributes.commands` 中注册我们的 `webview-umi.helloWorld` 命令：

```json
{
  "contributes": {
    "commands": [
      {
        "command": "webview-umi.helloWorld",
        "title": "Hello World"
      }
    ]
  }
}
```

### 3. VS Code API

**VS Code API** 是 VS Code 提供给插件使用的一系列 Javascript API。通过前两个核心概念的能力，我们已经注册好了命令和事件，那么下一步必然就是注册事件回调。事件回调在 vscode 中是通过 `vscode.commands.registerCommand` 函数来注册的，下面 👇🏻 是我们在入口文件 `src/extension.ts` 中注册 `webview-umi.helloWorld` 命令。

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  	...
    // 入口命令已经在 package.json 文件中定义好了，现在调用 registerCommand 方法
    // registerCommand 中的参数必须与 package.json 中的 command 保持一致
    let disposable = vscode.commands.registerCommand('webview-umi.helloWorld', () => {
        // 把你的代码写在这里，每次命令执行时都会调用这里的代码
        // ...
        // 给用户显示一个消息提示
        vscode.window.showInformationMessage('Hello World from webview-umi!');
    });
		...
}
```

## 参考

- [Bigfish VSCode 插件开发实践](https://www.cnblogs.com/cczlovexw/p/13815877.html)

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

> 本文首发于「[洛竹的官方网站](https://youngjuning.js.org/)」，同步于公众号「[洛竹早茶馆](https://cdn.jsdelivr.net/gh/youngjuning/images/20210418112129.jpeg)」和「[掘金专栏](https://juejin.cn/user/325111174662855)」。

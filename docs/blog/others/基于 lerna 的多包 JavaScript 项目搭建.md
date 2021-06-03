---
title: 基于 lerna 的多包 JavaScript 项目搭建维护笔记
cover: https://i.loli.net/2020/11/14/2VMPXulGiLD6JU8.png
tags: [掘金专栏]
---

## 开始

### 全局安装 lerna

```sh
$ npm install lerna -g
```

### 新建一个 git 仓库

```sh
$ git init lerna-repo && cd lerna-repo
```

### 初始化 lerna 项目

```sh
$ lerna init --independent
```

你的代码仓库目前应该是如下结构：

```
lerna-repo/
  packages/
  package.json
  lerna.json
```

## 创建 package

```sh
$ lerna create module-1
$ lerna create module-2
```

## yarn workspaces & Lerna Hoisting

使用 [yarn workspaces](https://yarnpkg.com/lang/zh-Hans/docs/workspaces/) 结合 Lerna useWorkspaces 可以实现 [Lerna Hoisting](https://github.com/lerna/lerna/blob/main/doc/hoist.md)。这并不是多此一举，这可以让你在统一的地方（根目录）管理依赖，这即节省时间又节省空间。

配置 lerna.json:

```json
{
  ...
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

顶级 package.json 必须包含一个 workspaces 数组:

```json
{
  "private": true,
  ...
  "workspaces": ["packages/*"]
}
```

## npm registry

### 搭建 verdaccio

> verdaccio 是一个开源轻量的 npm 私服

全局安装：

```sh
$ npm install verdaccio -g
```

配置 `~/.config/verdaccio/config.yaml` uplinks:

```
...
# a list of other known repositories we can talk to
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
  taobao:
    url: https://registry.npm.taobao.org/
  tuya:
    url: https://registry-npm.tuya-inc.top/
...
```

### 设置开机自启动

0、run `sudo npm i -g pm2`

1、run `pm2 start verdaccio` & `pm2 startup`

outputs:

```sh
[PM2] Init System found: launchd
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup launchd -u luozhu --hp /Users/luozhu
```

2、run `sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup launchd -u luozhu --hp /Users/luozhu`

outputs:

```sh
[PM2] Freeze a process list on reboot via:
$ pm2 save

[PM2] Remove init script via:
$ pm2 unstartup launchd
```

### 修改 lerna publishConfig

```json
// lerna.json
{
  "command": {
    "publish": {
      "ignoreChanges": ["ignored-file", "*.md"],
      "message": "chore(release): publish %s",
      "registry": "http://localhost:4873"
    }
  }
}
```

```json
// 各 package 的 package.json
{
  "publishConfig": {
    "registry": "http://localhost:4873"
  }
}
```

## commitlint & commitizen

> 请参考我之前的文章 [一文搞定规范化 Git Commit](https://juejin.im/post/6877462747631026190)

## 开发流程

### install

```sh
$ yarn install
# or
$ lerna bootstrap
```

### package 依赖

给指定 package 安装依赖：

```sh
$ yarn workspace module-1 add lodash
# or
$ lerna add lodash --scope module-1
```

给所有 package 安装依赖：

```sh
$ yarn workspaces add dayjs
# or
$ lerna add dayjs
```

### workspace 依赖

```sh
$ lerna add module-2 --scope module-1
```

### 共用的工具依赖

```sh
$ yarn add -W -D typescript
```

## lerna.json

- version: 当前仓库的版本，Independent mode 请设置为 `independent`
- npmClient: 指定运行命令的客户端程序（默认是 npm）
- ignoreChanges: 一个不包含在 `lerna changed/publish` 的 glob 数组。使用这个去阻止发布不必要的更新，比如修复 `README.md`
- command
  - publish
    - message: 一个 publish 时的自定义 commit 信息。详情请查看[@lerna/version](https://github.com/lerna/lerna/blob/main/commands/version#--message-msg)
    - registry: 设置自定义的 npm 代理（比如使用 verdaccio 搭建的私服）
  - version
    - conventionalCommits: `lerna version` 会自动决定 version bump 和生成 CHANGELOG 文件

## npm scripts

```json
{
  "scripts": {
    "release:beta": "lerna publish --canary --pre-dist-tag=beta --preid=beta --yes",
    "release:rc": "lerna publish prerelease --pre-dist-tag=rc --preid=rc",
    "release:next": "lerna publish prerelease --pre-dist-tag=next --preid=next",
    "release:preminor": "lerna publish preminor --pre-dist-tag=next --preid=next",
    "release:premajor": "lerna publish premajor --pre-dist-tag=next --preid=next",
    "release": "lerna publish",
    "release:minor": "lerna publish minor",
    "release:major": "lerna publish major",
    "commit": "git cz"
  }
}
```

## 链接

- [lerna 管理前端模块最佳实践](https://juejin.im/post/6844903568751722509)

---
title: nodejs
nav:
  title: '问题'
---

## 跨平台的用户家目录

[这个 PR](https://github.com/nodejs/node/pull/1791) 添加了 `os.homedir()` 并且被 nodejs 4.0.0 发布。

使用示例：

```js
const os = require('os');

console.log(os.homedir());
```

官方文档：

http://nodejs.cn/api/os/os_homedir.html

## 将指定版本设置为指定标签

```sh
npm dist-tag add @youngjuning/playground@1.0.3 latest|alpha|beta
```

## 展示 dist-tag

```sh
npm dist-tag ls @youngjuning/playground
```

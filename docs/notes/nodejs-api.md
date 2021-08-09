---
title: Nodejs API 使用笔记
nav:
  title: 笔记
  order: 2
---

## 跨平台的用户家目录

[这个 PR](https://github.com/nodejs/node/pull/1791) 添加了 `os.homedir()` 并且随着 nodejs 4.0.0 发布。

使用示例：

```js
const os = require('os');

console.log(os.homedir());
```

官方文档：

http://nodejs.cn/api/os/os_homedir.html

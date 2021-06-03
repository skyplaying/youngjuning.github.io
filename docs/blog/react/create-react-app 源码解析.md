---
title: create-react-app 源码解析
cover:
tags:
---

> 怕什么真理无穷，进一寸有一寸的欢喜。大家好，我是[@洛竹](https://github.com/youngjuning)，一名热爱编程、热爱生活的终身学习实践者。

## envinfo

envinfo 可以生成一份报告，其中包括在排除软件问题时需要的常见细节，如你的操作系统、二进制版本、浏览器、已安装的语言等等。

```js
const envinfo = require('envinfo');
envinfo
  .run(
    {
      System: ['OS', 'CPU'],
      Binaries: ['Node', 'npm', 'Yarn'],
      Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari'],
      npmPackages: ['react', 'react-dom', 'react-scripts'],
      npmGlobalPackages: ['create-react-app'],
    },
    {
      duplicates: true,
      showNotFound: true,
    },
  )
  .then(console.log);
```

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

> 本文首发于「[洛竹的官方网站](https://youngjuning.js.org/)」，同步于公众号「[洛竹早茶馆](https://cdn.jsdelivr.net/gh/youngjuning/images/20210418112129.jpeg)」和「[掘金专栏](https://juejin.cn/user/325111174662855)」。

![](https://youngjuning.js.org/img/luozhu.png)

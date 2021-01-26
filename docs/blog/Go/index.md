---
title: 推荐阅读
---

```jsx
/**
 * inline: true
 */
import React from 'react';
import ArtistList from '../../../components/List/ArtistList';

const data = [
  {
    title: 'Golang 交叉编译各个平台的二进制文件',
    outlink: 'https://studygolang.com/articles/14376',
  },
  {
    title: 'Golang 第三方命令行工具 - spf13/cobra 和 urfave/cli',
    outlink: 'https://strconv.com/posts/cli/'
  }
];

export default () => {
  return <ArtistList data={data} />;
};
```

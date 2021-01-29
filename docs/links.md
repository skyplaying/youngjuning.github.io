---
nav:
  title: 友链
title: 友链
sidemenu: false
---

```jsx
/**
 * inline: true
 */
import React from 'react';
import RepoCardList from '../components/List/RepoCardList';

export default () => {
  return (
    <RepoCardList
      data={[
        {
          title: 'dumi',
          description: '📖 为组件开发场景而生的文档工具',
          homepage: 'https://d.umijs.org/zh-CN',
          github: 'https://github.com/umijs/dumi',
        },
      ]}
    />
  );
};
```

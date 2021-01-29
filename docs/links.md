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
          title: 'Kerwin',
          description: '一切都是有可能的，甚至那些不可能的也是',
          homepage: 'https://www.kkzhilu.cn/',
          github: 'https://github.com/kkzhilu/kkzhilu',
        },
      ]}
    />
  );
};
```

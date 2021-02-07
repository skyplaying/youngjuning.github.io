---
title: React
---

<Alert type="info">
  欢迎 <a href="https://github.com/youngjuning/youngjuning.github.io/edit/main/docs//awesome/react.js">新增数据</a> 并提交 PR.
</Alert>

## API

```jsx
/**
 * inline: true
 */
import React from 'react';
import { api } from './react';
import CardList from '../../components/List/CardList';

export default () => {
  return <CardList data={api} />;
};
```

## 文章

```jsx
/**
 * inline: true
 */
import React from 'react';
import { artist } from './react';
import ArtistList from '../../components/List/ArtistList';

export default () => {
  return <ArtistList data={artist} />;
};
```

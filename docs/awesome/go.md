---
title: Go
nav:
  title: 收藏
  order: 2
---

<Alert type="info">
  欢迎 <a href="https://github.com/youngjuning/youngjuning.github.io/edit/main/docs//awesome/go.js">新增数据</a> 并提交 PR.
</Alert>

```jsx
/**
 * inline: true
 */
import React from 'react';
import RepoCardList from '../../components/List/RepoCardList';
import { common } from './go';

export default () => {
  return <RepoCardList data={common} />;
};
```

## CLI

```jsx
/**
 * inline: true
 */
import React from 'react';
import RepoCardList from '../../components/List/RepoCardList';
import { cli } from './go';

export default () => {
  return <RepoCardList data={cli} />;
};
```

## 教程

```jsx
/**
 * inline: true
 */
import React from 'react';
import { course } from './go';
import ArtistList from '../../components/List/ArtistList';

export default () => {
  return <ArtistList data={course} />;
};
```

## 文章

```jsx
/**
 * inline: true
 */
import React from 'react';
import { artist } from './go';
import ArtistList from '../../components/List/ArtistList';

export default () => {
  return <ArtistList data={artist} />;
};
```

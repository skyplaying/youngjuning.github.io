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

export default () => {
  return <ArtistList data={artist} />;
};
```

## 静态网站生成

```jsx
/**
 * inline: true
 */
import React from 'react';
import { site_generator } from './react';

export default () => {
  return <ArtistList data={site_generator} />;
};
```

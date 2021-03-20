---
title: 新媒体运营
---

```jsx
/**
 * inline: true
 */
import React from 'react';
import { common } from './media';

export default () => {
  return <CardList data={common} />;
};
```

## 微信公众号

```jsx
/**
 * inline: true
 */
import React from 'react';
import { wechat } from './media';

export default () => {
  return <CardList data={wechat} />;
};
```

## 文章

```jsx
/**
 * inline: true
 */
import React from 'react';
import { artist } from './media';

export default () => {
  return <ArtistList data={artist} />;
};
```

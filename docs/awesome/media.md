---
title: 新媒体运营
---

```jsx
/**
 * inline: true
 */
import React from 'react';
import data from './media';

export default () => {
  return <CardList data={data} />;
};
```

## 设计

```jsx
/**
 * inline: true
 */
import React from 'react';
import { design } from './media';

export default () => {
  return <CardList data={design} />;
};
```

## 免费图源

```jsx
/**
 * inline: true
 */
import React from 'react';
import { picture } from './media';

export default () => {
  return <CardList data={picture} />;
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

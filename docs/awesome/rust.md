---
title: Rust
---

<Alert type="info">
  欢迎 <a href="https://github.com/youngjuning/youngjuning.github.io/edit/main/docs//awesome/rust.js">新增数据</a> 并提交 PR.
</Alert>

```jsx
/**
 * inline: true
 */
import React from 'react';
import { common } from './rust';
import CardList from '../../components/List/CardList';

export default () => {
  return <CardList data={common} />;
};
```

## 嵌入式

```jsx
/**
 * inline: true
 */
import React from 'react';
import { embedded } from './rust';
import CardList from '../../components/List/CardList';

export default () => {
  return <CardList data={embedded} />;
};
```

## vscode 插件

```jsx
/**
 * inline: true
 */
import React from 'react';
import { vscode } from './rust';
import CardList from '../../components/List/CardList';

export default () => {
  return <CardList data={vscode} />;
};
```

## 文章

```jsx
/**
 * inline: true
 */
import React from 'react';
import { artist } from './rust';
import ArtistList from '../../components/List/ArtistList';

export default () => {
  return <ArtistList data={artist} />;
};
```

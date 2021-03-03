---
title: React Native
---

<Alert type="info">
  欢迎 <a href="https://github.com/youngjuning/youngjuning.github.io/edit/main/docs//awesome/react-native.js">新增数据</a> 并提交 PR.
</Alert>

## UI 组件库

```jsx
/**
 * inline: true
 */
import React from 'react';
import { ui_libs } from './react-native';

export default () => {
  return <CardList data={ui_libs} />;
};
```

## 工具

```jsx
/**
 * inline: true
 */
import React from 'react';
import { tools } from './react-native';

export default () => {
  return <CardList data={tools} />;
};
```

## 文章

```jsx
/**
 * inline: true
 */
import React from 'react';
import { artist } from './react-native';

export default () => {
  return <ArtistList data={artist} />;
};
```

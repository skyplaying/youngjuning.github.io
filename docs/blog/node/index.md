---
title: Node
---

<Alert type="info">
  欢迎 <a href="https://github.com/youngjuning/youngjuning.github.io/edit/main/docs/blog/node/data.js">新增数据</a> 并提交 PR.
</Alert>

### CLI

```jsx
/**
 * inline: true
 */
import React from 'react';
import { cli } from './data';

export default () => {
  return <CardList data={cli} />;
};
```

### 工具

```jsx
/**
 * inline: true
 */
import React from 'react';
import { tools } from './data';

export default () => {
  return <CardList data={tools} />;
};
```

### 单体式仓库

```jsx
/**
 * inline: true
 */
import React from 'react';
import { monorepo } from './data';

export default () => {
  return <CardList data={monorepo} />;
};
```

### 爬虫

```jsx
/**
 * inline: true
 */
import React from 'react';
import { crawler } from './data';

export default () => {
  return <CardList data={crawler} />;
};
```

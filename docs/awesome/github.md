---
title: GitHub
---

<Alert type="info">
  欢迎 <a href="https://github.com/youngjuning/youngjuning.github.io/edit/main/docs//awesome/github.js">新增数据</a> 并提交 PR.
</Alert>

## 关注的用户

```jsx
/**
 * inline: true
 */
import React from 'react';
import { users } from './github';

export default () => {
  return <CardList data={users} />;
};
```

## Actions

```jsx
/**
 * inline: true
 */
import React from 'react';
import { actions } from './github';

export default () => {
  return <CardList data={actions} />;
};
```

## profile-readme

```jsx
/**
 * inline: true
 */
import React from 'react';
import { profile } from './github';

export default () => {
  return <CardList data={profile} />;
};
```

## 电子书

```jsx
/**
 * inline: true
 */
import React from 'react';
import { ebook } from './github';

export default () => {
  return <CardList data={ebook} />;
};
```

## 工具

```jsx
/**
 * inline: true
 */
import React from 'react';
import { tools } from './github';

export default () => {
  return <CardList data={tools} />;
};
```

## 仓库

```jsx
/**
 * inline: true
 */
import React from 'react';
import { repo } from './github';

export default () => {
  return <CardList data={repo} />;
};
```

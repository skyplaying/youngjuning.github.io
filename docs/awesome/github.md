---
title: GitHub
---

<Alert type="info">
  欢迎 <a href="https://github.com/youngjuning/youngjuning.github.io/edit/main/docs//awesome/github.js">新增数据</a> 并提交 PR.
</Alert>

## Actions

```jsx
/**
 * inline: true
 */
import React from 'react';
import { actions } from './github';
import CardList from '../../components/List/CardList';

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
import CardList from '../../components/List/CardList';

export default () => {
  return <CardList data={profile} />;
};
```

## 仓库

```jsx
/**
 * inline: true
 */
import React from 'react';
import { repo } from './github';
import CardList from '../../components/List/CardList';

export default () => {
  return <CardList data={repo} />;
};
```

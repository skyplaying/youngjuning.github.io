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
import { actions } from './GitHub.js';
import RepoCardList from '../../components/List/RepoCardList';

export default () => {
  return <RepoCardList data={actions} />;
};
```

---
title: Node CLI
group:
  title: node-cli
nav:
  title: 收藏
---

```jsx
/**
 * inline: true
 */
import React from 'react';
import CardList from '../../components/RepoCardList';

const data = [
  {
    title: 'boxen',
    description: 'Create boxes in the terminal',
    npm: 'boxen',
    github: 'sindresorhus/boxen',
  },
];

export default () => {
  return <CardList data={data} />;
};
```

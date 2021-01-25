---
title: 收藏
nav:
  title: 收藏
hero:
  title: 收藏
---

#

## Node CLI

```jsx
/**
 * inline: true
 */
import React from 'react';
import CardList from '../components/RepoCardList';

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

---
title: Node
---

### CLI

```jsx
/**
 * inline: true
 */
import React from 'react';
import CardList from '../../components/List/NodeRepoCardList';

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

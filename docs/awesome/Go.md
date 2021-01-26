---
title: Go
nav:
  title: 收藏
  order: 2
---

```jsx
/**
 * inline: true
 */
import React from 'react';
import GoRepoCardList from '../../components/List/GoRepoCardList';

const data = [
  {
    title: 'Commitsar',
    description: 'Conventional commit compliance made easy',
    homepage: 'https://commitsar.tech/',
    github: 'facebook/docusaurus',
  },
  {
    title: 'GoBinaries',
    description: 'GoBinaries provides on-demand binaries for Golang projects.',
    homepage: 'https://gobinaries.com/',
    github: 'tj/gobinaries',
  },
  {
    title: 'GoProxy.io',
    description: '一个全球代理为 Go 模块而生',
    homepage: 'https://goproxy.io/zh/',
  },
];

export default () => {
  return <GoRepoCardList data={data} />;
};
```

## CLI

```jsx
/**
 * inline: true
 */
import React from 'react';
import GoRepoCardList from '../../components/List/GoRepoCardList';

const data = [
  {
    title: 'urfave/cli',
    description:
      'cli is a simple, fast, and fun package for building command line apps in Go',
    homepage: 'https://github.com/urfave/cli/blob/master/docs/v2/manual.md',
    github: 'urfave/cli',
  },
];

export default () => {
  return <GoRepoCardList data={data} />;
};
```

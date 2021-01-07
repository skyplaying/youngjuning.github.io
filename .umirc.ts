import { defineConfig } from 'dumi';

export default defineConfig({
  title: '俊宁（洛竹）',
  favicon: 'https://i.loli.net/2021/01/07/LkH3VM6oBnIuFNi.png',
  logo: 'https://i.loli.net/2021/01/07/LkH3VM6oBnIuFNi.png',
  mode: 'site',
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  metas: [
    {
      name: 'title',
      content: '杨俊宁的官方网站',
    },
    {
      name: 'keywords',
      content: 'react, javascript, typescript',
    },
    {
      name: 'description',
      content: '怕什么真理无穷，进一寸有一寸的欢喜',
    },
  ],
  scripts: [
    {
      src: 'https://utteranc.es/client.js',
      repo: 'youngjuning/youngjuning.github.io',
      'issue-number': '9',
      theme: 'github-light',
      crossorigin: 'anonymous',
      async: true,
    },
  ],
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/youngjuning/youngjuning.github.io',
    },
  ],
  // algolia: {
  //   apiKey: 'yourapikey',
  //   indexName: 'dumi',
  // },
  sitemap: {
    hostname: 'https://youngjuning.js.org',
  },
  // more config: https://d.umijs.org/config
});

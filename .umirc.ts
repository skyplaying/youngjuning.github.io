import { defineConfig } from 'dumi';

export default defineConfig({
  title: '洛竹的官方网站',
  favicon: 'https://i.loli.net/2021/03/30/7jxQfy9EHbapqt3.jpg',
  logo: 'https://i.loli.net/2021/03/30/7jxQfy9EHbapqt3.jpg',
  mode: 'site',
  hash: true,
  exportStatic: {},
  history: {
    type: 'hash',
  },
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  metas: [
    {
      name: 'title',
      content: '洛竹的官方网站',
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
  navs: [
    null,
    {
      title: '翻译系列',
      // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
      children: [
        { title: '计算机英文词汇', path: '/english' },
        { title: 'Go 语言教程系列', path: '/golang-tutorial' },
        { title: 'Cobra 中文文档', path: '/cobra' },
        { title: 'Viper 中文文档', path: '/viper' },
        { title: 'GitHub Actions', path: '/github-actions' },
      ],
    },
    {
      title: '生态',
      children: [
        {
          title: '掘金',
          path: 'https://juejin.cn/user/325111174662855/posts',
        },
        {
          title: '知乎',
          path: 'https://www.zhihu.com/people/yangjunning',
        },
        {
          title: 'GitHub',
          path: 'https://github.com/youngjuning/youngjuning.github.io',
        },
      ],
    },
    {
      title: '其他',
      children: [
        {
          title: '力扣算法题',
          path: '/leetcode',
        },
        {
          title: '快捷脚本',
          path: '/shell',
        },
      ],
    },
  ],
  sitemap: {
    hostname: 'https://youngjuning.js.org',
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  theme: {
    '@c-primary': '#007fff',
  },
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '//cdn.jsdelivr.net/gh/youngjuning/youngjuning.github.io@gh-pages/'
      : '/',
  // more config: https://d.umijs.org/config
});

import { defineConfig } from 'dumi';

export default defineConfig({
  title: '洛竹的官方网站',
  favicon: 'https://i.loli.net/2021/01/07/LkH3VM6oBnIuFNi.png',
  logo: 'https://i.loli.net/2021/01/07/LkH3VM6oBnIuFNi.png',
  mode: 'site',
  exportStatic: {},
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
        { title: '《Go 语言教程》', path: '/golang-tutorial' },
        { title: 'Cobra 中文文档', path: '/cobra' },
        { title: 'Viper 中文文档', path: '/viper' },
        { title: 'GitHub Actions', path: '/github-actions' },
      ],
    },
    {
      title: '其他',
      children: [
        {
          title: '关于洛竹',
          path: '/about',
        },
        {
          title: '营养早茶馆',
          path: '/health',
        },
        {
          title: '力扣算法题',
          path: '/leetcode',
        },
      ],
    },
    {
      title: '掘金',
      path: 'https://juejin.cn/user/325111174662855/posts',
    },
    // {
    //   title: '知乎',
    //   path: 'https://www.zhihu.com/people/yangjunning',
    //   children: [
    //     {
    //       title: '洛竹早茶馆',
    //       path: 'https://www.zhihu.com/column/c_1341734653628149760',
    //     },
    //   ],
    // },
    {
      title: 'GitHub',
      path: 'https://github.com/youngjuning/youngjuning.github.io',
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
  // more config: https://d.umijs.org/config
});

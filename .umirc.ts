import { defineConfig } from 'dumi';

export default defineConfig({
  title: '俊宁（洛竹）',
  favicon: 'https://i.loli.net/2021/01/07/LkH3VM6oBnIuFNi.png',
  logo: 'https://i.loli.net/2021/01/07/LkH3VM6oBnIuFNi.png',
  mode: 'site',
  exportStatic: {},
  hash: true,
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
      content: '俊宁的官方网站',
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
      title: '文档翻译⬇️',
      // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
      children: [
        { title: ' Cobra 中文文档', path: '/cobra' },
        { title: ' Viper 中文文档', path: '/viper' },
      ],
    },
    {
      title: '掘金',
      path: 'https://juejin.cn/user/325111174662855/posts',
    },
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

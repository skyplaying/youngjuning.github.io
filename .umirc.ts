import { defineConfig } from 'dumi';

export default defineConfig({
  title: '洛竹的官方网站',
  favicon: 'https://i.loli.net/2021/03/30/7jxQfy9EHbapqt3.jpg',
  logo: 'https://i.loli.net/2021/03/30/7jxQfy9EHbapqt3.jpg',
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
  hire: {
    title: '涂鸦智能资深前端开发工程师',
    content: `
      <p><strong>职位描述：</strong></p>
      <ul>
        <li>负责各品类行业公版输出，帮助0成本实现产品智能化；</li>
        <li>负责Tuya面板基础组件库开发及Tuya面板品类组件库开发；</li>
        <li>负责Tuya RN跨平台基础设施搭建及Tuya 小程序SDK开发；</li>
        <li>KA面板定制，实现各种酷炫交互。</li>
      </ul>
      <p><strong>职位要求：</strong></p>
      <ul>
        <li>熟悉前端相关技术，熟悉React、React Hook、TS及其生态圈；</li>
        <li>热衷技术、追究原理、探究最佳实践，具备良好的沟通能力和优秀的团队协作精神，有一定业务敏感度；</li>
        <li>对动画效果有一定钻研，对跨端技术（H5、RN、Futter）感兴趣并且有一定了解；</li>
        <li>有一定的源码阅读和分析能力(不限语言/库/框架/包)。</li>
      </ul>
      `,
    email: 'youngjuning@aliyun.com',
    slogan: '在寻找心仪的工作吗？',
  },
  // more config: https://d.umijs.org/config
});

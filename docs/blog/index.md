---
nav:
  title: 博客
title: 关于
---

## 写博客这件事

折腾博客这件事我是真的感到厌倦了，从最早搭建 WordPress 站点部署到阿里云，到折腾各种 Hexo 主题。虽说有吹嘘站点搭建的谈资了，但是内容却始终得不到沉淀。

Dumi 并不是一个很好的博客工具，甚至就不是设计用来写博客的。之所以选择它。是因为我可以很方便的写 React、React Native Demo。我既可以用它博客，还可以写组件文档，练习 React 技能。

"Less is More"，创造内容就简简单单地用 Dumi 写，分享就放掘金、SegmentFault、知乎这些平台。"The truth is endless, write it"

## 博文优选

```jsx
/**
 * inline: true
 */
import React from 'react';
import CardList from '../../components/ArtistList';

const data = [
  {
    title: '图解 Google V8 学习笔记',
    link: 'javascript/图解google-v8-学习笔记',
  },
];

export default () => {
  return <CardList data={data} />;
};
```

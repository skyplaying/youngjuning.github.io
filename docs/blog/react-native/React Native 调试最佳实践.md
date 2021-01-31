---
title: React Native 调试最佳实践
tags: ['翻译', '掘金专栏']
group:
  title: react-native
---

![](https://i.loli.net/2021/01/31/gvqORZ9pSAnCrjt.png)

<Alert>本文翻译自 [How To Debug React Native Apps Like A Pro? (Tools And Best Practices)](https://www.ideamotive.co/blog/how-to-debug-your-react-native-apps-like-a-pro)</Alert>

人非圣贤孰能无过。

这句话还（更确切地说：尤其是...）适用于软件开发者。

这就是为什么在每一个开发者的职业生涯中最重要的是知道如何处理这些失误。作为一个 React Native 开发者，我经常想要写出没有 BUG 的代码，但是当出现问题时，我需要确保我能够追踪并解决问题。

![](https://i.loli.net/2021/01/31/WhfaBT2YVbQrNPd.png)

在这篇文章中，我想讨论一些日常用于移动应用程序开发的工具和技术。我希望你可以发现一些对你的项目又帮助的东西。

## 静态检测，类型检查和格式化

## 静态检测

Linting 是执行程序的过程，用于分析潜在的语法程序错误。JavaScript 中最著名的 Linting 插件有：

- ESLint - JavaScript 类型检查和格式化工具
- Google's Closure Compiler – 一个 JavaScript 优化器，可以更快速，更简洁地重写代码并检查本机 JavaScript 函数的使用。
- JSLint – JavaScript 语法检查器和验证器

现在 ESLint 处于一统江湖的地位，也是 TypeScript 官方的 Linting 插件。

## 类型检查

我使用 TypeScript（TS）或者 Flow 来做 类型检查。两者最主要的区别是前者是编程语言，而 Flow 是类型检查器。在我看来，TS 是更优的选择，因为大量类似于自动导入、自我证明和使用下一代 JavaScript 的能力。

> 原文中说 TS 是编程语言，我不完全赞同。毕竟官方的定位也只是 JavaScript 的超集。

## 格式化代码

程序员大部分时间都在阅读代码，因此重点不是更快地阅读代码，而是快速理解代码。

为了做到快读理解代码，我们需要最有效的视觉表示。这就是为什么我们需要很好地格式化代码。

比较一下下面的代码片段：

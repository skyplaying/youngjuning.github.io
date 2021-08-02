---
title: 了不起的 rollup 之插件开发
cover: https://cdn.jsdelivr.net/gh/youngjuning/images/20210510182215.jpeg
tags: [nodejs]
---

> 怕什么真理无穷，进一寸有一寸的欢喜。大家好，我是[@洛竹](https://github.com/youngjuning)，一名热爱编程、热爱生活的终身学习实践者。

## 概述

一个 Rollup 插件是由一个或多个属性、构建钩子函数、输出钩子函数组成的对象，插件还需要符合一些官方的约定。一个插件应该作为一个包来发布，这个包导出一个可以用插件特定的选项来调用的函数，并且该函数返回一个对象。

插件允许你自定义 Rollup 的行为，比如，打包之前转换代码或者在你的 `node_modules` 文件夹中查找第三方包。

官方插件维护在 [rollup/plugins][plugins] 仓库，社区精选插件维护在 [rollup/awesome][awesome-plugins]。如果你想给某个插件提建议，请提交一个 pr。

[plugins]: https://github.com/rollup/plugins
[awesome-plugins]: https://github.com/rollup/awesome

## 一个简单的例子

下面的插件可以在不访问文件系统的前提下拦截任何 `virtual-module` 的导入。例如，如果你想在浏览器中使用 Rollup，这是必要的。它甚至可以用来替换入口点，如例子中所示。

```js
// index.js
export default function myExample() {
  return {
    name: 'my-example', // 名字会在 warnings 和 errors 中显示
    resolveId(source) {
      if (source === 'virtual-module') {
        return source; // 这表明 rollup 不应该询问其他插件或检查文件系统来寻找这个 ID。
      }
      return null; // 其他的 ID 应该按照通常的方式处理
    },
    load(id) {
      if (id === 'virtual-module') {
        return 'export default "This is virtual!"'; // "virtual-module" 的源码
      }
      return null; // 其他的 ID 应该按照通常的方式处理
    },
  };
}

// rollup.config.js
import myExample from './index';

export default {
  input: 'virtual-module', // 被我们的插件解析
  plugins: [myExample()],
  output: [
    {
      file: 'bundle.js',
      format: 'es',
    },
  ],
};
```

## 约定

- 插件应该有一个清晰的名字，并且必须带上 `rollup-plugin-` 前缀。
- 在 `package.json` 中包含 `rollup-plugin` 关键字。
- 插件应该被测试，我们推荐 mocha 或者 ava 这类开箱支持 promises 的库。
- 尽可能使用异步方法。
- 使用英文编写插件文档
- 如果合适的话，确保你的插件输出正确的 sourcemap
- 如果你的插件使用 'virtual modules'（比如帮助函数），给模块名加上 `\0` 前缀。这可以阻止其他插件执行它。

## 属性

### `name`

类型：`string`

插件的名字，在错误和警告信息中使用。

## 构建钩子函数

为了与构建过程交互，你的插件对象需要包含一些构建钩子函数。构建钩子是构建的各个阶段调用的函数。构建钩子函数可以影响构建执行方式、提供构建的信息或者在构建完成后修改构建。rollup 中有不同的构建钩子函数：

- `async`：这类 hook 也可以返回一个解析为相同类型值的 promise;否则，hook 将被标记为 `sync`。
- `first`：如果有多个插件实现了这个 hook，hook 将依次运行，直到钩子返回一个非 `null` 或非 `undefined` 的值。
- `sequential`：如果有多个插件实现了这个 hook，所有的插件都将按照指定的插件顺序运行。如果一个 hook 是异步的，这种类型的后续 hook 将一直等待，直到当前 hook 被解析。
- `parallel`：如果有多个插件实现了这个 hook，所有的插件都将按照指定的插件顺序运行。如果一个 hook 是异步的，这种类型的后续 hook 将并行运行，而不等待当前钩子。

构建钩子函数在构建阶段执行，它们被 `rollup.rollup(inputOptions)` 触发。它们主要关注在 Rollup 处理输入文件之前定位、提供和转换输入文件。构建阶段的第一个钩子是 `options`，最后一个钩子总是 `buildEnd`，除非有一个构建错误，在这种情况下 `closeBundle` 将在这之后被调用。

此外，在观察模式下，`watchChange` 钩子可以在任何时候被触发，以通知新的运行将在当前运行产生其输出后被触发。另外，当 watcher 关闭时，closeWatcher 钩子函数将被触发。

### `buildEnd`

### `buildStart`

### `closeWatcher`

### `load`

### `moduleParsed`

### `options`

### `resolveDynamicImport`

### `resolveId`

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

> 本文首发于「[洛竹的官方网站](https://youngjuning.js.org/)」，同步于公众号「[洛竹早茶馆](https://cdn.jsdelivr.net/gh/youngjuning/images/20210418112129.jpeg)」和「[掘金专栏](https://juejin.cn/user/325111174662855)」。

![](https://youngjuning.js.org/img/luozhu.png)

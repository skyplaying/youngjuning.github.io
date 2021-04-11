---
title: 「早茶」你不知道的 JavaScript 类特性
cover: https://i.loli.net/2021/04/10/RcdiXZ3YxBTp4Cm.png
tags: [搁置]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

> 建议添加：特性意义、示例、ts

## TC39 进程

这 3 个特性分别是 [class-fields][class-fields]、[static-class-features][static-class-features] 以及 [private-methods][private-methods]，目前他们都处在 TC39 进程的第三阶段，既然提到了 TC39 进程，我们就来看下 TC39 进程是什么吧！

[TC39][tc39] 指的是技术委员会（Technical Committee）第 39 号。它是 ECMA 的一部分，ECMA 是 “ECMAScript” 规范下的 JavaScript 语言标准化的机构。TC39 是一个由 JavaScript 开发者、实现者、学者等组成的团体，与社区合作维护和发展 JavaScript 的规范。

[TC39 进程][tc39-proposals] 分为 4 个阶段，我在这里以脑图的形式展示了每个阶段的含义：

<!-- TODO：TC39 进程脑图 -->

## 类字段

> [@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) 插件支持了该特性，@babel/preset-env 默认开启了该插件。

相信大家都在面试时被问过 [为什么我们要写 super(props) ？](https://overreacted.io/zh-hans/why-do-we-write-super-props/)，简单来说，一个子类构造器在 `super()` 方法调用之前是无法拿到 `this` 引用的。这同样也适用于 ES6 中的子类。调用 `super()` 时传递 props 的主要是为了在子类的构造器中访问 `this.props`。

在没有类字段时，我们初始化 `this.state` 之前，必须调用 `super()`，这显得非常蹩脚：

```jsx | pure
import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  clicked = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  reset = () => {
    this.setState({
      count: 0,
    });
  };

  render() {
    const { count } = this.state;
    return (
      <div className="App">
        <button onClick={this.clicked}>+ {count}</button>{' '}
        <button onClick={this.reset}>reset count</button>
      </div>
    );
  }
}
```

[Play in codesandbox](https://codesandbox.io/s/es5-super-0174r?file=/src/App.js)

如果我们注释掉 `super()`，程序就会抛错：

![](https://i.loli.net/2021/04/10/LMOlXAgB8xsre75.png)

幸运地是，有了 [class-fields][class-fields] 特性，我们就可以摆脱 `super()` 的束缚：

```jsx | pure
import React, { Component } from 'react';

export default class App extends Component {
  state = {
    count: 0,
  };

  clicked = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  reset = () => {
    this.setState({
      count: 0,
    });
  };

  render() {
    const { count } = this.state;
    return (
      <div className="App">
        <button onClick={this.clicked}>+ {count}</button>{' '}
        <button onClick={this.reset}>reset count</button>
      </div>
    );
  }
}
```

[Play in codesandbox](https://codesandbox.io/s/class-fields-0d55k?file=/src/App.js)

## 类静态成员

> [@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) 插件支持了该特性。

## 类的私有方法和 `getter`/`setter`

> [@babel/plugin-proposal-private-methods](https://babeljs.io/docs/en/babel-plugin-proposal-private-methods) v7.3.0+ 已经支持私有方法和私有存取器

```js
class Foo {
  // 私有属性
  #x = 0;

  // 私有方法（只能在类内部调用）
  #incrementX() {
    this.#x++;
  }

  publicIncrementX() {
    this.#incrementX();
  }

  get x() {
    return this.#x;
  }
}

const foo = new Foo();

foo.publicIncrementX();
console.log(foo.x);

//console.log(foo.#x);
// Syntax error private name #x is not defined

// foo.#incrementX();
// Syntax error private name #incrementX is not defined
```

[Play in codesandbox](https://codesandbox.io/s/private-class-properties-and-methods-6pd87)

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

[tc39]: https://tc39.es/
[tc39-proposals]: https://github.com/tc39/proposals
[class-fields]: https://github.com/tc39/proposal-class-fields
[static-class-features]: https://github.com/tc39/proposal-static-class-features
[private-methods]: https://github.com/tc39/proposal-private-methods

---
title: Go 插件每日推荐之 sprig
cover: https://i.loli.net/2021/04/05/P9reiQERWIyxfFj.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

Go 语言自带的有 [template](http://golang.org/pkg/text/template/)，但模板函数不多。Sprig 是一个提供了 100 多个常用模板函数的库。

它的灵感来自于[Twig](http://twig.sensiolabs.org/documentation)和各种 JavaScript 库中的模板函数，比如 [undererscore.js](http://underscorejs.org/)。

## 重要提示

Sprig 利用 [mergo](https://github.com/imdario/mergo) 来处理合并。在它的 v0.3.9 版本中，有一个行为变化影响了 sprig 中的模板函数的合并，目前推荐使用该软件包的 v0.3.8。使用 v0.3.9 会导致 sprig 测试失败。mergo 中的问题是 https://github.com/imdario/mergo/issues/139。

## 使用

**模板开发者**： 请使用 Sprig 的 [函数文档](http://masterminds.github.io/sprig/) 来获取超过 100 个模板函数的详细说明和代码片段。

**Go 开发者**：如果你想在你的程序中把 Sprig 作为一个库加入，我们的 API 文档可以在 [GoDoc.org](http://godoc.org/github.com/Masterminds/sprig) 找到。

### 加载 Sprig 库

加载 Sprig `FuncMap`:

```go
import (
  "github.com/Masterminds/sprig"
  "html/template"
)

// 这个例子说明，在加载模板本身之前，必须设置 FuncMap。
tpl := template.Must(
  template.New("base").Funcs(sprig.FuncMap()).ParseGlob("*.html")
)
```

### 在模板内部调用函数

按照惯例，所有函数都是小写的。这似乎遵循了 Go 中模板函数的习惯（相对于模板方法，模板方法是 `TitleCase`）。例如这个：

```
{{ "hello!" | upper | repeat 5 }}
```

将生成：

```
HELLO!HELLO!HELLO!HELLO!HELLO!
```

## 驱动我们选择函数的原则

我们遵循这些原则来决定添加哪些功能以及如何实现这些功能。

- 使用模板函数来构建布局。以下类型的操作都属于模板函数的范畴。
  - 格式化
  - 布局
  - 简单的类型转换
  - 协助处理常见格式和布局需求的实用程序（如算术）。
- 模板函数不应该返回错误，除非没有办法打印一个合理的值。例如，将一个字符串转换为一个整数，如果转换失败，不应该产生错误，而应该显示一个默认值。相反，它应该显示一个默认值。
- 简单的数学对于网格布局、分页器等是必要的。复杂的数学（除算术以外的任何事情）应该在模板之外完成。
- 模板函数只处理传入的数据。它们从不从源中检索数据。
- 最后，不要覆盖核心的 Go 模板函数。

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

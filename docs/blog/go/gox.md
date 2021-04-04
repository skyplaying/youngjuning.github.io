---
title: Go插件每日推荐之 gox
cover: https://i.loli.net/2021/04/04/VhJbqI1uD6cXQLw.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

Gox 是一个简单的、好用的 Go 交叉编译工具，它的行为很像标准的 `go build`。Gox 将为多个平台并行编译。Gox 还将为你构建交叉编译工具链。

## 安装

要安装 Gox，请使用 `go get`。我们对版本进行了标记，所以请随时查看该标记并进行编译。

```sh
$ go get github.com/mitchellh/gox
...
$ gox -h
...
```

## 使用

如果你知道如何使用 `go build`，那么你就知道如何使用 Gox。例如，要构建当前的包，不要指定任何参数，只需调用 `gox`。Gox 默认会根据你的 CPU 数量进行并行化，并默认为每个平台进行构建。

```sh
$ gox
Number of parallel builds: 4

-->      darwin/386: github.com/mitchellh/gox
-->    darwin/amd64: github.com/mitchellh/gox
-->       linux/386: github.com/mitchellh/gox
-->     linux/amd64: github.com/mitchellh/gox
-->       linux/arm: github.com/mitchellh/gox
-->     freebsd/386: github.com/mitchellh/gox
-->   freebsd/amd64: github.com/mitchellh/gox
-->     openbsd/386: github.com/mitchellh/gox
-->   openbsd/amd64: github.com/mitchellh/gox
-->     windows/386: github.com/mitchellh/gox
-->   windows/amd64: github.com/mitchellh/gox
-->     freebsd/arm: github.com/mitchellh/gox
-->      netbsd/386: github.com/mitchellh/gox
-->    netbsd/amd64: github.com/mitchellh/gox
-->      netbsd/arm: github.com/mitchellh/gox
-->       plan9/386: github.com/mitchellh/gox
```

或者说，如果你想建立一个包和子包。

```sh
$ gox ./...
...
```

或者，如果你想建立多个不同的包。

```
$ gox github.com/mitchellh/gox github.com/hashicorp/serf
...
```

或者如果你想只构建 linux 包。

```
$ gox -os="linux"
...
```

或者你只是想为构建 64 位 linux 的包。

```
$ gox -osarch="linux/amd64"
...
```

想知道更多! 只需运行 `gox -h` 即可获得帮助和其他信息。

## 与其他交叉编译工具相比

非常感谢这些其他选择的存在。它们各自在很多方面为跨平台交叉编译铺平了道路，使跨平台的交叉编译变得平易近人。

- [Dave Cheney's golang-crosscompile](https://github.com/davecheney/golang-crosscompile)：Gox 可以多平台编译，因此可以轻松运行在 Go 支持的任何平台上，而 Dave 的脚本则需要 shell。Gox 也会并行构建。而 Dave 的脚本是按顺序构建的。Gox 内置了更容易使用的 `OS/Arch` 过滤功能。
- [goxc](https://github.com/laher/goxc)：一个功能非常丰富的工具，甚至可以做到构建系统包、上传二进制文件、生成下载网页等。Gox 是一个超级轻薄的替代品，它只交叉编译二进制文件。Gox 会并行构建包，而 goxc 不会。Gox 不强制执行特定的构建二进制文件的输出结构。

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

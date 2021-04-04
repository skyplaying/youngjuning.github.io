---
title: Go 插件每日推荐之 verb
cover: https://i.loli.net/2021/04/04/MspEiJNQy7fZ9Cu.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

vert (Version Tester) 是一个简单的命令行工具，用于比较两个或多个版本，或根据模糊的版本规则测试版本。

## 基础使用

Vert 至少需要两个参数。一个基础版本和一个或多个与基础版本比较的版本。基础版本是特殊的，因为它可以是一个模糊的版本规范，而不是一个精确的版本。

```sh
$ vert 1.0.0 1.0.0
1.0.0
$ echo $?
0
```

当 `vert` 运行时，它将打印出任何匹配的版本的标准化字符串，然后将退出代码设置为它所看到的版本匹配失败的数量。

`vert` 能理解 SemVer v2 版本，所以以下内容也会通过。

```sh
$ vert v1.0.0 1
1.0.0
$ echo $?
0
```

有三点需要注意。

- 前面的 `v` 会被忽略。
- 数字被扩展为一个完整的 SemVer 字符串，因此 `1` 被扩展为 `1.0.0`和`1.1`扩展为`1.1.0`。
- 输出结果标准化为 `X.Y.Z[-PRERELEASE][+BUILD]` 的形式。

一个失败的比较是这样的。

```sh
$ vert 1.0.0 1.2.0
$ echo $?
1
```

失败的版本比较不打印任何文本，除非给定的基础版本是错误的。

```sh
$ vert 1.zoo.cheese 1.1.1
Could not parse constraint 1.zoo.cheese
```

基础版本可以是模糊的。

- `vert ">1.0" 1.1`
- `vert "^2" 2.1.3`
- `vert ">1.1.2,<1.3.4" 1.2`

而 `vert` 可以理解 alpha/beta 标记。

```sh
vert ">1.0.0-alpha.1" 1.0.0-beta.1
1.0.0-beta.1
```

可以一次比较多个版本，使用 `-s` 标志，你甚至可以对输出进行排序。

```sh
$ vert ^1 1.1.1 1.0.1 1.2.3 1.0.2 0.9 2.0
1.1.1
1.0.1
1.2.3
1.0.2
$ echo $?
2
```

在上面，我们要求 vert 提供 `1.X.Y` 范围(`^1`)内的所有版本，然后给它一个版本列表，包括该范围之外的一些版本。

`vert` 返回一个匹配的版本列表。通过返回代码，我们可以看到有两个版本匹配失败。要查看哪个失败，我们可以使用 `-f` 标志。

```sh
$ vert -f ^1 1.1.1 1.0.1 1.2.3 1.0.2 0.9 2.0
0.9.0
2.0.0
```

我们可以使用 `-s` 标志对输出进行排序：

```sh
vert -s ^1 1.1.1 1.0.1 1.2.3 1.0.2 0.9 2.0
1.0.1
1.0.2
1.1.1
1.2.3
```

最后，`vert` 可以将 `git describe` 版本转化为 SemVer，假设 Git 的标签是 SemVer。

```sh
$ vert -g ^1 $(git describe --tags)
1.0.1+32.fef45
```

在未来，我们希望增加更多的转换。如果你有任何想法，请在问题队列中告诉我们。

## 安装

假设你使用 make, [Go](http://golang.org) 版本大于等于，你可以简单地运行 `make` 来完成：

```sh
$ make all
dep ensure
dep status
PROJECT                        CONSTRAINT  VERSION  REVISION  LATEST   PKGS USED
github.com/Masterminds/semver  ^1.0.0      v1.4.0   15d8430   15d8430  1
github.com/urfave/cli          ^1.0.0      v1.20.0  cfb3883   cfb3883  1
go test .
ok  	github.com/Masterminds/vert	0.006s
go build -o vert vert.go
install -d /usr/local/bin/
install -m 755 ./vert /usr/local/bin/vert
```

这将下载 vert 到 `/usr/local/bin/vert`。

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

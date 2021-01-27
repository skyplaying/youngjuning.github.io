---
title: Cobra 中文文档
nav:
  hide: true
hero:
  title: Cobra
  desc: 一个基于 Go 的现代 CLI 框架
  image: https://cobra.dev/home/logo.png
  actions:
    - text: 英文文档
      link: https://cobra.dev/
    - text: GitHub
      link: https://github.com/spf13/cobra
---

#

<Alert type="warning">
  本人非专业翻译，也非专业 Go 开发，文档若有谬误，请勿对线，直接 <a href="https://github.com/youngjuning/youngjuning.github.io/edit/main/docs/Cobra.md">编辑</a>。
</Alert>

[spf13]: https://github.com/spf13
[viper]: https://github.com/spf13/viper
[github-cli]: https://github.com/cli/cli
[docker-cli]: https://github.com/docker/cli
[posix]: https://zh.wikipedia.org/wiki/%E5%8F%AF%E7%A7%BB%E6%A4%8D%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3
[12factor]: https://12factor.net/zh_cn/
[go-flag]: https://golang.org/pkg/flag/

## 关于

Cobra 是 G 的 CLI 框架。它包含一个用于创建功能强大的现代 CLI 应用程序的库，以及一个用于快速生成基于 Cobra 的应用程序和命令文件的工具。

Cobra 由 Go 项目成员和 hugo 作者 [spf13][spf13] 创建，已经被许多流行的 Go 项目采用，比如 [GitHub CLI][github-cli] 和 [Docker CLI][docker-cli]。

## 特性

- 简单的基于子命令的 CLIs：`app server`、`app fetch` 等；
- 完全兼容 [POSIX（可移植操作系统接口）][posix] 的标志（包括短版和长版）
- 嵌套子命令
- 全局、局部和级联的标志
- 使用 `cobra init appname` 和 `cobra add cmdname` 轻松生成应用程序和命令
- 智能提示（`app srver` ...did you mean `app server`）
- 自动生成命令和标志的帮助
- 自动识别 `-h`、`--help` 等帮助标识
- 自动为你的应用程序生成的 bash 自动完成
- 自动为你的应用程序生成 man 手册
- 命令别名，以便你可以更改内容而不会破坏它们
- 定义自己的帮助，用法等的灵活性。
- 可选与 [viper][viper] 紧密集成，可用于 [12factor][12factor] 应用程序

## 安装

Cobra 非常易用，首先使用 `go get` 命令安装最新版本。此命令将安装 `cobra` generator 的可执行文件及其依赖项：

```sh
$ go get -u github.com/spf13/cobra/cobra
```

## 概念

Cobra 构建在命令（commands）、参数（arguments）和 标志（flags）上。

**Commands** 代表动作，**Args** 是事物，**Flags** 是这些动作的修饰符。

最好的应用程序在使用时会像句子一样读起来。用户将知道如何使用该应用程序，因为他们将自然地了解如何使用它。

遵循的模式是 `APPNAME VERB NOUN --ADJECTIVE`。 或 `APPNAME COMMAND ARG --FLAG`

一些真实的例子可以更好地说明这一点。

在以下示例中，`server` 是命令，`port` 是标志：

```sh
hugo server --port=1313
```

在此命令中，我们告诉 Git 克隆 url 的内容：

```sh
git clone URL --bare
```

## 命令（Command）

命令是应用程序的核心。应用程序提供的每一个交互都包含在 Command 中。一个命令可以有子命令和可选的运行一个动作。

在上面的示例中，`server` 是命令。

[cobra.Command API](https://godoc.org/github.com/spf13/cobra#Command)

## 标志（Flags）

一个标志是一种修改命令行为的方式。Cobra 支持完全符合 [POSIX（可移植操作系统接口）][posix] 的标志和 Go [flag][go-flag] 包。

Cobra 命令可以定义一直保留到子命令的标志和仅可用于该命令的标志。

在上面的例子中，`port` 是标志。

标志的功能是 [pflag](https://github.com/spf13/pflag) 库提供的，该库是一个标准库的 fork，在维护相同接口的基础上兼容了 [POSIX（可移植操作系统接口）][posix]。

## 入门

欢迎大家提供自己的项目组织结构，但是通常基于 Cobra 的应用程序将遵循以下组织结构

<Tree title="appName">
  <ul>
    <li>
      cmd
      <small>放置命令的文件夹</small>
      <ul>
        <li>add.go</li>
        <li>your.go</li>
        <li>commands.go</li>
        <li>here.go</li>
      </ul>
    </li>
    <li>
      main.go
      <small>应用程序入口</small>
    </li>
  </ul>
</Tree>

在 Cobra 应用程序中，通常 `main.go` 文件非常。它有一个目的：初始化 Cobra。

```go
package main

import (
  "{pathToYourApp}/cmd"
)

func main() {
  cmd.Execute()
}
```

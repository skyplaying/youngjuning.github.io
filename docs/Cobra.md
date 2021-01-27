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

[spf13]: https://github.com/spf13
[viper]: https://github.com/spf13/viper
[github-cli]: https://github.com/cli/cli
[docker-cli]: https://github.com/docker/cli
[posix]: https://zh.wikipedia.org/wiki/%E5%8F%AF%E7%A7%BB%E6%A4%8D%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3
[12factor]: https://12factor.net/zh_cn/

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

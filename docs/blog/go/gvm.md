---
title: Go插件每日推荐之 gvm
cover: https://i.loli.net/2021/04/04/mbLd7kenoGjq2D8.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

GVM 提供了一个管理 Go 版本的接口。

## 特性

- 用 `gvm install [tag]` 安装/卸载 Go 版本，其中 tag 为 "60.3"、"go1"、"weekly.2011-11-08 " 或 "tip"
- 用 `gvm dif` 列出 `GOROOT` 中增加/删除的文件。
- 用`gvm pkgset [create/use/delete] [name]` 管理 `GOPATHs`。使用 `—local` 作为 `name` 来管理本地路径下的版本库(`/path/to/repo/.gvm_local`)。
- 用 `gvm listall` 列出最新发布的标签。使用 `—all` 也可以每周列出。
- 为多个版本的安装缓存最新的 Go 源码的干净副本。
- 将项目目录链接到 `GOPATH`中。

## 背景

当我们开始用围棋开发时，不匹配的依赖关系和 API 变化困扰着我们的构建过程，使其极难与其他人的变化合并。

在数次将整个`GOROOT` 毁掉并重新构建之后，我决定开发一个工具来监督这个过程。它最终演变成了今天的 gvm。

## 安装

```sh
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
```

或者如果你使用的是 zsh，只需将 `bash` 改为 `zsh`

## 安装 Go

```sh
gvm install go1.4
gvm use go1.4 [--default]
```

一旦完成，Go 将被安装在路径中并可以使用。`$GOROOT` 和 `$GOPATH` 是自动设置的。

Additional options can be specified when installing Go:

```sh
Usage: gvm install [version] [options]
  -s,  --source=SOURCE      Install Go from specified source.
  -n,  --name=NAME          Override the default name for this version.
  -pb, --with-protobuf      Install Go protocol buffers.
  -b,  --with-build-tools   Install package build tools.
  -B,  --binary             Only install from binary.
    --prefer-binary      Attempt a binary install, falling back to source.
  -h,  --help               Display this message.
```

### 编译 Go 1.5+ 的注意事项

Go 1.5+ 从工具链中删除了 C 编译器，并替换 compiler_note 为用 Go 编写的编译器。很明显，如果你还没有安装好 Go，这就会产生一个引导问题。为了编译 Go 1.5+，请先确保安装了 Go 1.4。

```sh
gvm install go1.4 -B
gvm use go1.4
export GOROOT_BOOTSTRAP=$GOROOT
gvm install go1.5
```

- [编译注意事项]: https://docs.google.com/document/d/1OaatvGhEAq7VseQ9kkavxKNAfepWy2yhPUBs96FGV28/edit

## 列出 Go 版本

列出所有已安装的 Go 版本（当前版本前缀为 `=>`）。

```sh
gvm list
```

列出所有可供下载的 Go 版本。

```sh
gvm listall
```

## 卸载

要完全删除 gvm 和所有安装的 Go 版本和包：

```sh
gvm implode
```

## Mac OS X 环境要求

- 从 https://www.mercurial-scm.org/downloads 安装 Mercurial
- 从 App Store 安装 Xcode Command Line Tools

```sh
xcode-select --install
brew update
brew install mercurial
```

## Linux 环境要求

**Debian/Ubuntu**

```sh
sudo apt-get install curl git mercurial make binutils bison gcc build-essential
```

**Redhat/Centos**

```sh
sudo yum install curl
sudo yum install git
sudo yum install make
sudo yum install bison
sudo yum install gcc
sudo yum install glibc-devel
```

- 从 http://pkgs.repoforge.org/mercurial/ 安装 Mercurial

**FreeBSD Requirements**

```
sudo pkg_add -r bash
sudo pkg_add -r git
sudo pkg_add -r mercurial
```

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

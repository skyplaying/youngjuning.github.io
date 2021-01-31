---
title: 发布一个 Homebrew 包
tags: ['掘金专栏']
---

## 相关概念

### Keg（酒桶）

安装好的脚本、软件等。比如 gh，如果有安装。执行下面的指令可查看位置：

```shell
open /usr/local/bin/gh
```

### Cellar（酒窖）

所有用 Homebrew 安装在本地的脚本、软件组成的集合。可以通过以下指令查看本地目前都安装了哪些脚本：

```shell
open /usr/local/Cellar/
```

### Formula（配方）

定义如何下载、编译和安装脚本或软件的 Ruby 脚本；

### Tap（专案）

一个包含若干 Formula 的 GitHub 专案。执行以下指令可以查看本地都有哪些 Tap：

```shell
open /usr/local/Homebrew/Library/Taps
```

官方专案库是 [Homebrew/homebrew-core](https://github.com/Homebrew/homebrew-core)，想要通过 `brew install` 直接安装都要像该库贡献 Formula。本地安装在 `/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core`。

项目初期我们没有必要急于将我们的项目发布到 Homebrew（官方也不一定给你合进去）。其实官方还提供了第三方 Tap 的机制，本文就是如何制作一个 Homebrew 包并发布到自己的 Tap 的。

## 创建 Tap

在 GitHub 上创建自己的仓库，创建仓库的命名方式必须是以 `homebrew-<demo>` 的规则命名。我们这里以 [youngjuning/homebrew-tap](https://github.com/youngjuning/homebrew-tap) 为例。并把 tap 同步到本地：

```shell
brew tap youngjuning/homebrew-tap https://github.com/youngjuning/homebrew-tap.git
```

> 注意：不要命名为 homebrew-core，之后你向 homebrew/homebrew-core 贡献代码会冲突

> 提示：我们可以执行 `cd $(brew --repository youngjuning/tap)` 打开本地 tap

## 制作 Formula

假设我们用 Go 开发了一个 CLI 工具，并构建除了二进制文件 `tpc`。接下来的步骤就是制作 Formula。

1、打出压缩包，格式必须是 `*.tar.gz`：

```shell
tar zcvf tpc_0.0.1.tar.gz tpc
```

2、然后在 [youngjuning/tpc](https://github.com/youngjuning/tpc/releases/tag/v0.0.1) 创建 Release 并将上一步生成的 tpc_0.0.1.tar.gz 文件当作附件上传。然后我们得到压缩包地址 `https://github.com/youngjuning/tpc/releases/download/v0.0.1/tpc_0.0.1.tar.gz`
供配方软连接到这个脚本文件

3、生成 Formula

```shell
brew create https://github.com/youngjuning/tpc/releases/download/v0.0.1/tpc_0.0.1.tar.gz --tap youngjuning/homebrew-tap
```

这条命令会在 `/usr/local/Homebrew/Library/Taps/youngjuning/homebrew-tap/` 下创建一个 `tpc.rb` 文件，文件名是仓库名。

然后我们打开 `/usr/local/Homebrew/Library/Taps/youngjuning/homebrew-tap/tpc.rb` 对安装方式做一下调整:

```ruby
def install
    bin.install "tpc"
end
```

做完这些操作后，在 `/usr/local/Homebrew/Library/Taps/youngjuning/homebrew-tap/` 目录下，执行 git 操作提交代码到 github

## 多版本

以上我们完成了一个简单的 Homebrew 包，还有一个要紧的问题是，如何提供历史版本。Homebrew 对此也做了约定。假如我们要提供 0.0.1 版本的 tpc，你将做如下工作：

1、新建 `tpc@0.0.1.rb` 并将 tpc.rb 中的内容复制进来。

2、将 `tpc@0.0.1.rb` 中的 `class Tpc` 修改为 `class TpcAT001`

3、url 中 的地址修改为指向 0.0.1 版本的压缩包地址

## 安装

```shell
# 后续可以使用该命令更新 tap
$ brew tap youngjuning/tap
$ brew install tpc
```

或者

```sh
$ brew install youngjuning/tap/tpc
```

## 升级

```sh
$ brew upgrade youngjuning/tap/tpc
```

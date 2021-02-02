---
title: 向 Deno 学习脚本的管理
---

## 前言 🌱

如果你使用过 Deno、Go 或者配置过 Android Studio，那么你一定对配置环境变量不陌生。那么如果我们自己写了一个脚本或者命令行工具，如何分享给朋友们玩呢？最简单的当然是直接把脚本放出去，供别人手动下载和手动配置环境变量。但这既不优雅，也不利于传播，本文就是研读了 Deno 的安装机制后，总结出的一套可用的二进制可执行文件分发教程。

> Deno 在 [v1.7.0](https://github.com/denoland/deno/releases/tag/v1.7.0) 支持了 [交叉编译](https://github.com/denoland/deno/pull/9141)，本文就以 Deno 实现一个简单的 CLI 工具 并分发给 MacOS、Linux、Windows 用户。

## Deno 安装方式分析

从官网中，我们可以看到 Deno 有多种安装方式，主要有：

- With Shell（Linux/MacOS）：`curl -fsSL https://deno.land/x/install/install.sh | sh`
- With PowerShell（Windows）：`iwr https://deno.land/x/install/install.ps1 -useb | iex`
- With Homebrew：`brew install deno`

并且还可以安装特定版本：

- With Shell: `curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.0.0`
- With PowerShell: `$v="1.0.0"; iwr https://deno.land/x/install/install.ps1 -useb | iex`

其中 Homebrew 方式需要将安装脚本合并到 [homebrew-core](https://github.com/Homebrew/homebrew-core)，但是我们的脚本一般比较小众，可以参考 [不会吧？不会吧！还有人不会发 Homebrew 包？](https://juejin.cn/post/6922347045692899336) 发布到自己的 `tap` 中。对于 Shell 和 PowerShell 是我们本文要研究的。

## 准备一个项目

我这边已经准备好了一个简单的 Deno 项目 [youngjuning/seve](https://github.com/youngjuning/seve)。如果你对 Deno 开发感兴趣，可以阅读 [Deno 从入门到跑路 | 🏆 技术专题第一期征文](https://juejin.cn/post/6854573220432248839) 入门。

### 编译项目

我们可以使用 `deno compile --unstable --target=<target>` 命令把我们的项目编译成二进制可执行文件，可选的 target 有：

- x86_64-unknown-linux-gnu
- x86_64-pc-windows-msvc
- x86_64-apple-darwin
- aarch64-apple-darwin

我们编写一个 `compile.sh` 来批量编译出各个平台的产物（记得执行 `chmod +x 755 compile.sh` 赋予脚本可执行权限）。

```sh
#!/bin/bash
name="seve"
deno compile --unstable --lite --target=x86_64-unknown-linux-gnu index.ts
zip -o -q -m ${name}-x86_64-unknown-linux-gnu.zip ${name}

deno compile --unstable --lite --target=x86_64-pc-windows-msvc -o ./${name}.exe index.ts
zip -o -q -m ${name}-x86_64-pc-windows-msvc.zip ${name}.exe

deno compile --unstable --lite --target=x86_64-apple-darwin index.ts
zip -o -q -m ${name}-x86_64-apple-darwin.zip ${name}

deno compile --unstable --lite --target=aarch64-apple-darwin index.ts
zip -o -q -m ${name}-aarch64-apple-darwin.zip ${name}
```

以上脚本会生成以下文件，我们不需要把它们上传到代码库中，所以请在 `.gitignore` 中忽略它们。

![](https://i.loli.net/2021/02/02/M3QBNCJWqUfYh8Z.png)

## Windows 安装脚本

首先我们来看下 deno_install 中的脚本 `install.ps1`：

```sh
#!/usr/bin/env pwsh
# Copyright 2018 the Deno authors. All rights reserved. MIT license.
# TODO(everyone): Keep this script simple and easily auditable.

$ErrorActionPreference = 'Stop'

if ($v) {
  $Version = "v${v}"
}
if ($args.Length -eq 1) {
  $Version = $args.Get(0)
}

$DenoInstall = $env:DENO_INSTALL
$BinDir = if ($DenoInstall) {
  "$DenoInstall\bin"
} else {
  "$Home\.deno\bin"
}

$DenoZip = "$BinDir\deno.zip"
$DenoExe = "$BinDir\deno.exe"
$Target = 'x86_64-pc-windows-msvc'

# GitHub requires TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$DenoUri = if (!$Version) {
  "https://github.com/denoland/deno/releases/latest/download/deno-${Target}.zip"
} else {
  "https://github.com/denoland/deno/releases/download/${Version}/deno-${Target}.zip"
}

if (!(Test-Path $BinDir)) {
  New-Item $BinDir -ItemType Directory | Out-Null
}

Invoke-WebRequest $DenoUri -OutFile $DenoZip -UseBasicParsing

if (Get-Command Expand-Archive -ErrorAction SilentlyContinue) {
  Expand-Archive $DenoZip -Destination $BinDir -Force
} else {
  if (Test-Path $DenoExe) {
    Remove-Item $DenoExe
  }
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  [IO.Compression.ZipFile]::ExtractToDirectory($DenoZip, $BinDir)
}

Remove-Item $DenoZip

$User = [EnvironmentVariableTarget]::User
$Path = [Environment]::GetEnvironmentVariable('Path', $User)
if (!(";$Path;".ToLower() -like "*;$BinDir;*".ToLower())) {
  [Environment]::SetEnvironmentVariable('Path', "$Path;$BinDir", $User)
  $Env:Path += ";$BinDir"
}

Write-Output "Deno was installed successfully to $DenoExe"
Write-Output "Run 'deno --help' to get started"
```

这是 [powershell 文件](https://docs.microsoft.com/zh-cn/powershell/?view=powershell-7.1)，这里不做过多语法解释，我们看其中的核心代码：

```sh
...
$Target = 'x86_64-pc-windows-msvc'
...
$DenoUri = if (!$Version) {
  "https://github.com/denoland/deno/releases/latest/download/deno-${Target}.zip"
} else {
  "https://github.com/denoland/deno/releases/download/${Version}/deno-${Target}.zip"
}
```

从这个可以看出，deno 的安装包是以 zip 的形式存在 GitHub Release 的，并且依托 Tag 实现了版本管理。下图便是 Deno 1.7.1 release 的附件：

![](https://i.loli.net/2021/02/02/zZ8qnam3f6G4pMU.png)

> Deno 从构建到发布这些步骤全都是 GitHub Action 自动实现的，感兴趣的我可以再写一篇解析 Deno 的自动化流程。

### 自定义安装脚本

1、手动新建一个 [Release](https://github.com/youngjuning/seve/releases/tag/v0.0.1) 并把上面编译出来的压缩包以附件的形式上传：

![](https://i.loli.net/2021/02/02/YS51VeLclnJibqz.png)

2、将上面的脚本中的命名改成我们自己的脚本：

> 如果你有 cdn 可以把它上传到 cdn 上，我这里就上传到 github 上了。

```sh
#!/usr/bin/env pwsh
# Copyright 2018 the Seve authors. All rights reserved. MIT license.
# TODO(everyone): Keep this script simple and easily auditable.

$ErrorActionPreference = 'Stop'

if ($v) {
  $Version = "v${v}"
}
if ($args.Length -eq 1) {
  $Version = $args.Get(0)
}

$SeveInstall = $env:SEVE_INSTALL
$BinDir = if ($SeveInstall) {
  "$SeveInstall\bin"
}
else {
  "$Home\.seve\bin"
}

$SeveZip = "$BinDir\seve.zip"
$SeveExe = "$BinDir\seve.exe"
$Target = 'x86_64-pc-windows-msvc'

# GitHub requires TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$DenoUri = if (!$Version) {
  "https://github.com/youngjuning/seve/releases/latest/download/seve-${Target}.zip"
}
else {
  "https://github.com/youngjuning/seve/releases/download/${Version}/seve-${Target}.zip"
}

if (!(Test-Path $BinDir)) {
  New-Item $BinDir -ItemType Directory | Out-Null
}

Invoke-WebRequest $DenoUri -OutFile $SeveZip -UseBasicParsing

if (Get-Command Expand-Archive -ErrorAction SilentlyContinue) {
  Expand-Archive $SeveZip -Destination $BinDir -Force
}
else {
  if (Test-Path $SeveExe) {
    Remove-Item $SeveExe
  }
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  [IO.Compression.ZipFile]::ExtractToDirectory($SeveZip, $BinDir)
}

Remove-Item $SeveZip

$User = [EnvironmentVariableTarget]::User
$Path = [Environment]::GetEnvironmentVariable('Path', $User)
if (!(";$Path;".ToLower() -like "*;$BinDir;*".ToLower())) {
  [Environment]::SetEnvironmentVariable('Path', "$Path;$BinDir", $User)
  $Env:Path += ";$BinDir"
}

Write-Output "Seve was installed successfully to $SeveExe"
Write-Output "Run 'seve --help' to get started"
```

---
title: Go 插件每日推荐之 go-msi
cover: https://i.loli.net/2021/04/04/aDFCMWzux1ngPh8.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

go-msi 包帮助开发者为 Go 项目生成 msi 包。

这个工具是 [go-github-release workflow](https://github.com/mh-cbon/go-github-release) 的一部分。

可以在 [这里](https://github.com/mh-cbon/go-msi/tree/master/testing/hello) 查看更多示例。

## 安装

### Go

```sh
go get github.com/mh-cbon/go-msi
```

### 二进制

```sh
choco source add -n=mh-cbon -s="https://api.bintray.com/nuget/mh-cbon/choco"
choco install go-msi
```

### Chocolatey

```sh
choco install go-msi
```

### linux rpm/deb 仓库

```sh
wget -O - https://raw.githubusercontent.com/mh-cbon/latest/master/bintray.sh \
| GH=mh-cbon/go-msi sh -xe
# or
curl -L https://raw.githubusercontent.com/mh-cbon/latest/master/bintray.sh \
| GH=mh-cbon/go-msi sh -xe
```

### linux rpm/deb 独立包

```sh
curl -L https://raw.githubusercontent.com/mh-cbon/latest/master/install.sh \
| GH=mh-cbon/go-msi sh -xe
# or
wget -q -O - --no-check-certificate \
https://raw.githubusercontent.com/mh-cbon/latest/master/install.sh \
| GH=mh-cbon/go-msi sh -xe
```

## 使用

### 所需环境

- A windows machine (see [here](https://github.com/mh-cbon/go-msi/blob/master/appveyor-recipe.md) for an appveyor file, see [here](https://github.com/mh-cbon/go-msi/blob/master/unice-recipe.md) for unix friendly users)
- windows 用户请查看 [这里](https://github.com/mh-cbon/go-msi/blob/master/appveyor-recipe.md)，unix 用户请查看 [这里](https://github.com/mh-cbon/go-msi/blob/master/unice-recipe.md)
- wix >= 3.10
- 添加 wix 二进制位置到你的 `PATH`
- 使用 `check-env`子命令获取报告

### 工作流

一个简单的例子：

- 创建一个类似 [这个](https://github.com/mh-cbon/go-msi/blob/master/wix.json) 的 `wix.json` 文件
- 你必须为每个应用程序用 `go-msi set-guid` 来设置的 guid。
- 运行 `go-msi make --msi your_program.msi --version 0.0.2`

### 配置文件

`wix.json` 文件描述了你的源代码和生成的 msi 文件之间的打包规则。

请 [查看演示 json 文件](https://github.com/mh-cbon/go-msi/blob/master/testing/hello/wix.json)

如果没有明白，就提交一个 isseue

当你遇到各种问题时，一定要仔细读文档和 [stackoverflow](https://stackoverflow.com)

- http://wixtoolset.org/documentation/
- http://stackoverflow.com/questions/tagged/wix

如果你想知道 `INSTALLDIR`，`[INSTALLDIR]` 是什么，这是 wix 规则的一部分，请查看他们的文档。

### 证书文件

注意许可证文件，它必须是一个 `rtf` 文件，必须用 `Windows1252`charset 编码。我已经提供了一些工具来帮助解决这个问题。

## wix 模板

为了简单起见，我们提供了一个默认的安装流程，你可以查看 [这里](https://github.com/mh-cbon/go-msi/tree/master/templates)

你可以创建一个新的，用于自己的个性化。你只需要注意重现已经存在的 go 模板。定义了 "文件"、"目录"、"环境变量"、"许可证 "和 "快捷键"。

我想你的大部分改动都是关于 `WixUI_HK.wxs` 文件的。

## Cli

### `go-msi -h`

```sh
NAME:
   go-msi - Easy msi pakage for Go

USAGE:
   go-msi <cmd> <options>

VERSION:
   0.0.0

COMMANDS:
     check-json          Check the JSON wix manifest
     check-env           Provide a report about your environment setup
     set-guid            Sets appropriate guids in your wix manifest
     generate-templates  Generate wix templates
     to-windows          Write Windows1252 encoded file
     to-rtf              Write RTF formatted file
     gen-wix-cmd         Generate a batch file of Wix commands to run
     run-wix-cmd         Run the batch file of Wix commands
     make                All-in-one command to make MSI files
     choco               Generate a chocolatey package of your msi files
     help, h             Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --help, -h     show help
   --version, -v  print the version
```

### `go-msi check-env -h`

```sh
NAME:
   go-msi check-env - Provide a report about your environment setup

USAGE:
   go-msi check-env [arguments...]
```

### `go-msi check-json -h`

```sh
NAME:
   go-msi check-json - Check the JSON wix manifest

USAGE:
   go-msi check-json [command options] [arguments...]

OPTIONS:
   --path value, -p value  Path to the wix manifest file (default: "wix.json")
```

### `go-msi set-guid -h`

```sh
NAME:
   go-msi set-guid - Sets appropriate guids in your wix manifest

USAGE:
   go-msi set-guid [command options] [arguments...]

OPTIONS:
   --path value, -p value  Path to the wix manifest file (default: "wix.json")
   --force, -f             Force update the guids
```

### `go-msi make -h`

```sh
NAME:
   go-msi make - All-in-one command to make MSI files

USAGE:
   go-msi make [command options] [arguments...]

OPTIONS:
   --path value, -p value     Path to the wix manifest file (default: "wix.json")
   --src value, -s value      Directory path to the wix templates files (default: "/home/mh-cbon/gow/bin/templates")
   --out value, -o value      Directory path to the generated wix cmd file (default: "/tmp/go-msi645264968")
   --arch value, -a value     A target architecture, amd64 or 386 (ia64 is not handled)
   --msi value, -m value      Path to write resulting msi file to
   --version value            The version of your program
   --license value, -l value  Path to the license file
   --keep, -k                 Keep output directory containing build files (useful for debug)
```

### `go-msi choco -h`

```sh
NAME:
   go-msi choco - Generate a chocolatey package of your msi files

USAGE:
   go-msi choco [command options] [arguments...]

OPTIONS:
   --path value, -p value           Path to the wix manifest file (default: "wix.json")
   --src value, -s value            Directory path to the wix templates files (default: "/home/mh-cbon/gow/bin/templates/choco")
   --version value                  The version of your program
   --out value, -o value            Directory path to the generated chocolatey build file (default: "/tmp/go-msi697894350")
   --input value, -i value          Path to the msi file to package into the chocolatey package
   --changelog-cmd value, -c value  A command to generate the content of the changlog in the package
   --keep, -k                       Keep output directory containing build files (useful for debug)
```

### `go-msi generate-templates -h`

```sh
NAME:
   go-msi generate-templates - Generate wix templates

USAGE:
   go-msi generate-templates [command options] [arguments...]

OPTIONS:
   --path value, -p value     Path to the wix manifest file (default: "wix.json")
   --src value, -s value      Directory path to the wix templates files (default: "/home/mh-cbon/gow/bin/templates")
   --out value, -o value      Directory path to the generated wix templates files (default: "/tmp/go-msi522345138")
   --version value            The version of your program
   --license value, -l value  Path to the license file
```

### `go-msi to-windows -h`

```sh
NAME:
   go-msi to-windows - Write Windows1252 encoded file

USAGE:
   go-msi to-windows [command options] [arguments...]

OPTIONS:
   --src value, -s value  Path to an UTF-8 encoded file
   --out value, -o value  Path to the ANSI generated file
```

### `go-msi to-rtf -h`

```sh
NAME:
   go-msi to-rtf - Write RTF formatted file

USAGE:
   go-msi to-rtf [command options] [arguments...]

OPTIONS:
   --src value, -s value  Path to a text file
   --out value, -o value  Path to the RTF generated file
   --reencode, -e         Also re encode UTF-8 to Windows1252 charset
```

### `go-msi gen-wix-cmd -h`

```sh
NAME:
   go-msi gen-wix-cmd - Generate a batch file of Wix commands to run

USAGE:
   go-msi gen-wix-cmd [command options] [arguments...]

OPTIONS:
   --path value, -p value  Path to the wix manifest file (default: "wix.json")
   --src value, -s value   Directory path to the wix templates files (default: "/home/mh-cbon/gow/bin/templates")
   --out value, -o value   Directory path to the generated wix cmd file (default: "/tmp/go-msi844736928")
   --arch value, -a value  A target architecture, amd64 or 386 (ia64 is not handled)
   --msi value, -m value   Path to write resulting msi file to
```

### `go-msi run-wix-cmd -h`

```sh
NAME:
   go-msi run-wix-cmd - Run the batch file of Wix commands

USAGE:
   go-msi run-wix-cmd [command options] [arguments...]

OPTIONS:
   --out value, -o value  Directory path to the generated wix cmd file (default: "/tmp/go-msi773158361")
```

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

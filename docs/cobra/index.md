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
  本人非专业翻译，也非专业 Go 开发，文档若有谬误，请勿对线，直接 <a href="https://github.com/youngjuning/youngjuning.github.io/edit/main/docs/cobra/index.md">编辑</a>。
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

一个标志是一种修饰命令行为的方式。Cobra 支持完全符合 [POSIX（可移植操作系统接口）][posix] 的标志和 Go [flag][go-flag] 包。

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

## 使用 Cobra 生成器

Cobra 提供了 CLI 来创建您的应用程序和添加任意你想要的命令。这是将 Cobra 集成到您的应用程序中的最简单方法。

[这里](/cobra/generator) 你可以查看更多关于生成器的资料。

## 使用 Cobra 库

要手动接入 Cobra，您需要创建一个 `main.go` 文件和 `rootCmd` 文件。您可以选择提供合适的其他命令。

## 创建 rootCmd

Cobra 不需要任何特殊的构造函数。只需创建您的命令。

理想情况下，将其放置在 `/cmd/root.go` 中：

```go
// rootCmd 代表没有调用子命令时的基础命令
var rootCmd = &cobra.Command{
	Use:   "hugo",
	Short: "Hugo is a very fast static site generator",
  Long: `A Fast and Flexible Static Site Generator built with
                love by spf13 and friends in Go.
                Complete documentation is available at http://hugo.spf13.com`,
  // 如果有相关的 action 要执行，请取消下面这行代码的注释
  // Run: func(cmd *cobra.Command, args []string) { },
}

// Execute 将所有子命令添加到root命令并适当设置标志。会被 main.main() 调用一次。
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
```

您还将在 `init()` 函数中定义标志并处理配置。例子如下：

```go
// cmd/root.go
package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"

	homedir "github.com/mitchellh/go-homedir"
	"github.com/spf13/viper"
)

var cfgFile string
var projectBase string
var userLicense string

// rootCmd 代表没有调用子命令时的基础命令
var rootCmd = &cobra.Command{
	Use:   "hugo",
	Short: "Hugo is a very fast static site generator",
  Long: `A Fast and Flexible Static Site Generator built with
                love by spf13 and friends in Go.
                Complete documentation is available at http://hugo.spf13.com`,
  // 如果有相关的 action 要执行，请取消下面这行代码的注释
  // Run: func(cmd *cobra.Command, args []string) { },
}

// Execute 将所有子命令添加到root命令并适当设置标志。会被 main.main() 调用一次。
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)
	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.cobra.yaml)")
	rootCmd.PersistentFlags().StringVarP(&projectBase, "projectbase", "b", "", "base project directory eg. github.com/spf13/")
	rootCmd.PersistentFlags().StringP("author", "a", "YOUR NAME", "Author name for copyright attribution")
	rootCmd.PersistentFlags().StringVarP(&userLicense, "license", "l", "", "Name of license for the project (can provide `licensetext` in config)")
	rootCmd.PersistentFlags().Bool("viper", true, "Use Viper for configuration")
	viper.BindPFlag("author", rootCmd.PersistentFlags().Lookup("author"))
	viper.BindPFlag("projectbase", rootCmd.PersistentFlags().Lookup("projectbase"))
	viper.BindPFlag("useViper", rootCmd.PersistentFlags().Lookup("viper"))
	viper.SetDefault("author", "NAME HERE <EMAIL ADDRESS>")
	viper.SetDefault("license", "apache")
}

func initConfig() {
	// Don't forget to read config either from cfgFile or from home directory!
	if cfgFile != "" {
		// Use config file from the flag.
		viper.SetConfigFile(cfgFile)
	} else {
		// Find home directory.
		home, err := homedir.Dir()
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}

		// Search config in home directory with name ".cobra" (without extension).
		viper.AddConfigPath(home)
		viper.SetConfigName(".cobra")
	}

	if err := viper.ReadInConfig(); err != nil {
		fmt.Println("Can't read config:", err)
		os.Exit(1)
	}
}
```

## 创建 main.go

有了根命令，你需要一个 main 函数去执行它。为了清晰起见，`Execute` 应该在根目录上运行，尽管可以在任何命令上调用它。

在 Cobra 应用中，`main.go` 是非常简单的。它只有一个作用——初始化 Cobra。

```go
// main.go
package main

import (
  "{pathToYourApp}/cmd"
)

func main() {
  cmd.Execute()
}
```

## 创建额外的命令

可以定义其他命令，并且通常在 `cmd/` 目录中为每个命令提供自己的文件。

如果要创建 `version` 命令，则可以创建 `cmd/version.go` 并使用以下命令进行填充：

```go
// cmd/version.go
package cmd

import (
  "fmt"

  "github.com/spf13/cobra"
)

func init() {
  rootCmd.AddCommand(versionCmd)
}

var versionCmd = &cobra.Command{
  Use:   "version",
  Short: "Print the version number of Hugo",
  Long:  `All software has versions. This is Hugo's`,
  Run: func(cmd *cobra.Command, args []string) {
    fmt.Println("Hugo Static Site Generator v0.9 -- HEAD")
  },
}
```

## 使用标志

标志提供修饰符以控制命令的操作方式。

由于标志是在不同位置定义和使用的，我们需要在外部定义一个具有正确作用域的变量，以分配要使用的标志。

```go
var verbose bool
var source string
```

这里有两种不同分配标志的方法。

#### 持久标志

标志可以是 "persistent" 的，这意味着该标志将可用于分配给它的命令以及该命令下的每个命令。对于全局标志，将标志分配为根上的持久标志。

```go
rootCmd.PersistentFlags().BoolVarP(&verbose, "verbose", "v", false, "verbose output")
```

#### 本地标志

也可以在本地分配一个标志，该标志仅适用于该特定命令。

```go
rootCmd.Flags().StringVarP(&source, "source", "s", "", "Source directory to read from")
```

#### 父命令上的本地标志 <Badge>🧐</Badge>

默认情况下，Cobra 仅解析目标命令上的本地标志，而忽略父命令上的任何本地标志。通过启用 `Command.TraverseChildren`，Cobra 将在执行目标命令之前解析每个命令上的本地标志

```go
command := cobra.Command{
  Use: "print [OPTIONS] [COMMANDS]",
  TraverseChildren: true,
}
```

### 用配置绑定标志

您还可以将标志与 [viper][viper] 绑定：

```go
var author string

func init() {
  rootCmd.PersistentFlags().StringVar(&author, "author", "YOUR NAME", "Author name for copyright attribution")
  viper.BindPFlag("author", rootCmd.PersistentFlags().Lookup("author"))
}
```

在此示例中，持久标记 `author` 与 viper 绑定。请注意，当用户未提供 `--author` 标志时，变量 `author` 不会设置为 `config` 中的值。

更多信息请查看 [viper 文档](/viper#与标志一起使用)。

### 必需标志

标志默认是可选的。如果你想在缺少标志时命令报错，请设置该标志为必需：

```go
var region string

rootCmd.Flags().StringVarP(&region, "region", "r", "", "AWS region (required)")
rootCmd.MarkFlagRequired("region")
```

### 位置和自定义参数

可以使用 Command 的 Args 字段指定位置参数的验证。

下面的验证符是内置的：

- `NoArgs` - 如果有任何位置参数，该命令将报告错误。
- `ArbitraryArgs` - 命令将接受任意参数
- `OnlyValidArgs` - 如果 Command 的 `ValidArgs` 字段中不存在该位置参数，则该命令将报告错误。
- `MinimumNArgs(int)` - 如果不存在至少 N 个位置参数，则该命令将报告错误。
- `MaximumNArgs(int)` - 如果存在超过 N 个位置参数，则该命令将报告错误。
- `ExactArgs(int)` - 如果不存在 N 个位置参数，则该命令将报告错误。
- `ExactValidArgs(int)` - 如果没有确切的 N 个位置参数，或者如果 Command 的 ValidArgs 字段中不存在该位置参数，则该命令将报告并出错。
- `RangeArgs(min, max)` - 如果 args 的数目不在期望的 args 的最小和最大数目之间，则该命令将报告并出错。

内置验证符使用实例：

```go
var cmd = &cobra.Command{
	Use:   "hello",
	Short: "hello",
	Args:  cobra.MinimumNArgs(2),
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Hello, World!")
	},
}
```

<Alert type="error">如果只传递一个位置参数会报 `Error: requires at least 2 arg(s), only received 1` 的警告。</Alert>

设置自定义验证器的示例：

```go
var cmd = &cobra.Command{
  Short: "hello",
  Args: func(cmd *cobra.Command, args []string) error {
    if len(args) < 1 {
      return errors.New("requires at least one arg")
    }
    if myapp.IsValidColor(args[0]) {
      return nil
    }
    return fmt.Errorf("invalid color specified: %s", args[0])
  },
  Run: func(cmd *cobra.Command, args []string) {
    fmt.Println("Hello, World!")
  },
}
```

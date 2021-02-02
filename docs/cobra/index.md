---
title: Cobra 中文文档
nav:
  hide: true
cover: https://i.loli.net/2021/02/02/skn4I8acrQuMOqK.png
---

<Alert type="warning">
  本人非专业翻译，也非专业 Go 开发，文档若有谬误，请勿对线，直接 <a href="https://github.com/youngjuning/youngjuning.github.io/edit/main/docs/cobra/index.md">编辑</a>。原文档请 <a href="https://cobra.dev/">点击</a> 查看。
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

### 命令（Command）

命令是应用程序的核心。应用程序提供的每一个交互都包含在 Command 中。一个命令可以有子命令和可选的运行一个动作。

在上面的示例中，`server` 是命令。

[cobra.Command API](https://godoc.org/github.com/spf13/cobra#Command)

### 标志（Flags）

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

### 使用 Cobra 生成器

Cobra 提供了 CLI 来创建您的应用程序和添加任意你想要的命令。这是将 Cobra 集成到您的应用程序中的最简单方法。

[这里](/cobra/generator) 你可以查看更多关于生成器的资料。

### 使用 Cobra 库

要手动接入 Cobra，您需要创建一个 `main.go` 文件和 `rootCmd` 文件。您可以选择提供合适的其他命令。

#### 创建 rootCmd

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

### 创建 main.go

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

### 创建额外的命令

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

### 使用标志

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

#### 用配置绑定标志

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

#### 必需标志

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

### 示例

在下面的例子中，我们定义了三个命令。两个在顶层，一个（`cmdTimes`）是子命令。在这种情况下，根目录不可执行，这意味着需要一个子命令。通过不为 `rootCmd` 提供 `Run` 来实现。

我们只为一个命令定义了一个标志。

关于标志的文档在 [pflag](/cobra/pflag)。

```go
package main

import (
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

func main() {
	var echoTimes int

	var cmdPrint = &cobra.Command{
		Use:   "Print [string to print]",
		Short: "Print anything to the screen",
		Long: `print is for printing anything back to the screen.
For many years people have printed back to the screen.`,
		Args: cobra.MinimumNArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("Print: " + strings.Join(args, " "))
		},
	}

	var cmdEcho = &cobra.Command{
		Use:   "echo [string to echo]",
		Short: "Echo anything to the screen",
		Long: `echo is for echoing anything back.
Echo works a lot like print, except it has a child command.`,
		Args: cobra.MinimumNArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("Print: " + strings.Join(args, " "))
		},
	}

	var cmdTimes = &cobra.Command{
		Use:   "times [# times] [string to echo]",
		Short: "Echo anyting to the screen more times",
		Long: `echo things multiple times back to the user y providing
		a count and a string.`,
		Args: cobra.MinimumNArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			for i := 0; i < echoTimes; i++ {
				fmt.Println("Echo: " + strings.Join(args, " "))
			}
		},
	}

	cmdTimes.Flags().IntVarP(&echoTimes, "times", "t", 1, "times to echo the input")

	// 设置根命令
	var rootCmd = &cobra.Command{Use: "app"}
	rootCmd.AddCommand(cmdPrint, cmdEcho)
	cmdEcho.AddCommand(cmdTimes)

	// 初始化应用
	rootCmd.Execute()
}
```

更复杂的应用，请参考 [Hugo](https://github.com/gohugoio/hugo) 或者 [GitHub CLI](https://github.com/cli/cli)。

### 帮助命令

当你添加了子命令，Cobra 会自动添加一些帮助命令。当你执行 `app help` 命令时会显示帮助信息。另外，`help` 还支持其他命令作为输入参数。举例来说，你有一个没有额外配置的 `create` 命令，`app help create` 是有效的。每一个命令还会自动获取一个 `--help` 标志。

#### 示例

以下输出由 Cobra 自动生成。 除了命令和标志定义外，什么都不需要。

![](https://i.loli.net/2021/02/01/Mi51jfXQE39ZFcT.png)

`help` 就像其他命令一样。并没有特殊的逻辑或行为。实际上，你可以根据需要提供自己的服务。

#### 定义你自己的 help

你可以使用下面的方法提供你自己的 Help 命令或模板。

```go
cmd.SetHelpCommand(cmd *Command)
cmd.setHelpCommand(f func(*Command, []string))
cmd.setHelpTemplate(s string)
```

后两者也适用于所有子命令。

### 使用信息

当用户提供无效的标志或无效的命令时，Cobra 会通过向用户显示 `usage` 进行响应。

![](https://i.loli.net/2021/02/01/vtlzqAo7eDJwhM1.png)

#### 定义你自己的使用信息

你可以提供你自己的 usage 函数或模板。像 `help` 一样，函数和模板可通过公共方法重写：

```go
cmd.SetUsageFunc(f func(*Command) error)
cmd.SetUsageTemplate(s string)
```

可以参考 [GitHub CLI](https://github.com/cli/cli/blob/dcf5a27f5343ea0e9b3ef71ca37a4c3948102667/pkg/cmd/root/root.go#L63) 的写法。

### 版本标志

如果给根命令设置了 `Version` 字段，Cobra 会添加一个顶级的 `--version` 标志。运行带有 `–version` 标志的应用程序，将使用版本模板将版本打印到 stdout。模板可以使用 `cmd.SetVersionTemplate(s string)` 函数自定义。

> `SetVersionTemplate` 的使用可以参考 [GitHub CLI](https://github.com/cli/cli/blob/dcf5a27f5343ea0e9b3ef71ca37a4c3948102667/pkg/cmd/root/root.go#L67)

### PreRun 和 PostRun Hooks

可以在执行命令之前和之后运行一个函数。`PersistentPreRun` 和 `PreRun` 函数将在 `Run` 之前执行。`PersistentPostRun` 和 `PostRun` 会在 `Run` 之后运行。如果子级未声明自己的 `Persistent * Run` 函数，则子级将继承父级的。这些函数的执行顺续如下：

- PersistentPreRun
- PreRun
- Run
- PostRun
- PersistentPostRun

下面这个包含了两个命令的例子使用了这些特性。当子命令执行时，它会运行根命令的 `PersistentPreRun`，但是不会运行根命令的 `PersistentPostRun`：

```go
package main

import (
	"fmt"

	"github.com/spf13/cobra"
)

func main() {
	var rootCmd = &cobra.Command{
		Use:   "root [sub]",
		Short: "My root command",
		PersistentPreRun: func(cmd *cobra.Command, args []string) {
			fmt.Printf("Inside rootCmd PersistentPreRun with args: %v\n", args)
		},
		PreRun: func(cmd *cobra.Command, args []string) {
			fmt.Printf("Inside rootCmd PreRun with args: %v\n", args)
		},
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Printf("Inside rootCmd Run with args: %v\n", args)
		},
		PostRun: func(cmd *cobra.Command, args []string) {
			fmt.Printf("Inside rootCmd PostRun with args: %v\n", args)
		},
		PersistentPostRun: func(cmd *cobra.Command, args []string) {
			fmt.Printf("Inside rootCmd PersistentPostRun with args: %v\n", args)
		},
	}

	subCmd := &cobra.Command{
		Use:   "sub [no options!]",
		Short: "My subcommand",
		PreRun: func(cmd *cobra.Command, args []string) {
			fmt.Printf("Inside subCmd PreRun with args: %v\n", args)
		},
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Printf("Inside subCmd Run with args: %v\n", args)
		},
		PostRun: func(cmd *cobra.Command, args []string) {
			fmt.Printf("Inside subCmd PostRun with args: %v\n", args)
		},
		PersistentPostRun: func(cmd *cobra.Command, args []string) {
			fmt.Printf("Inside subCmd PersistentPostRun with args: %v\n", args)
		},
	}

	rootCmd.AddCommand(subCmd)

	rootCmd.SetArgs([]string{""})
	rootCmd.Execute()
	fmt.Println()
	rootCmd.SetArgs([]string{"sub", "arg1", "arg2"})
	rootCmd.Execute()
}
```

输出：

```sh
Inside rootCmd PersistentPreRun with args: []
Inside rootCmd PreRun with args: []
Inside rootCmd Run with args: []
Inside rootCmd PostRun with args: []
Inside rootCmd PersistentPostRun with args: []

Inside rootCmd PersistentPreRun with args: [arg1 arg2]
Inside subCmd PreRun with args: [arg1 arg2]
Inside subCmd Run with args: [arg1 arg2]
Inside subCmd PostRun with args: [arg1 arg2]
Inside subCmd PersistentPostRun with args: [arg1 arg2]
```

### "unknown command" 时的提示

当 `"unknown command"` 错误发生时，Cobra 会自动打印提示。这和 git 命令的行为一致。比如

```sh
$ hugo srever
Error: unknown command "srever" for "hugo"

Did you mean this?
        server

Run 'hugo --help' for usage.
```

系统会根据注册的每个子命令自动生成建议，并使用[萊文斯坦距離](https://zh.wikipedia.org/wiki/%E8%90%8A%E6%96%87%E6%96%AF%E5%9D%A6%E8%B7%9D%E9%9B%A2)的实现。每个匹配最小距离 2（忽略大小写）的注册命令都将显示为建议。

如果需要禁用建议或在命令中调整字符串距离，请使用：

```go
cmd.DisableSuggestions = true
```

或

```go
cmd.SuggestionsMinimumDistance = 1
```

您还可以使用 `SuggestFor` 属性显式为给定命令设置建议的名称。这样就可以针对不是距离很近的字符串提出建议，但是对于您的命令集和不希望使用别名的命令来说，它们都是有意义的。比如：

```sh
$ kubectl remove
Error: unknown command "remove" for "kubectl"

Did you mean this?
        delete

Run 'kubectl help' for usage.
```

### 为你的命令生成文档

Cobra 可以基于子命令、标志等生成文档。可用格式如下：

- [Markdown](https://youngjuning.js.org/cobra/md_docs)
- [ReStructured Text](https://youngjuning.js.org/cobra/rest_docs)
- [Man Page](https://youngjuning.js.org/cobra/man_docs)

### Generating bash completions

Cobra 可以生成 bash-completion 文件。如果你给你的命令添加了更多的信息，这些自动提示的分析会非常强大和灵活。更是信息请阅读[Bash Completions](https://youngjuning.js.org/cobra/bash_completions)

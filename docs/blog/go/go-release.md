---
title: Go 插件每日推荐之 go-release
cover: https://i.loli.net/2021/04/03/QDuCqAmPnhB6GER.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

go-release 是我封装的第一个 Go 插件，它是一个基于 github release 的版本控制工具。

## 为什么要使用？

我们假设下面的场景：

1. 你有一个二进制可执行文件并发布在 GitHub release 上，就像 Deno 做的那样。
2. 你想要实现和 `deno upgrade` 类似的命令。

> 那么这个插件可以帮你做这件事。

## 安装

```sh
$ go get github.com/youngjuning/go-release
```

## Example

```go
package main

import "github.com/youngjuning/go-release"

func main() {
  update, err := release.CheckUpdate("denoland", "deno", "0.0.1")
  if err != nil {
    panic(err)
  }
  if update.IsUpdate {
    fmt.Printf("Latest version is %v.\n",update.LatestVersion) // out: Latest version is 1.7.1.
    // Run upgrade command
  }
}
```

## 在 Cobra 中使用

```go
package main

import (
	"fmt"

	"github.com/codeskyblue/go-sh"
	"github.com/spf13/cobra"
	"github.com/youngjuning/go-release"
)

const Version = "0.0.1"

func checkUpgrade(current string, force bool) {
	if force {
		fmt.Println("Looking up latest version")
	}
	update, err := release.CheckUpdate("youngjuning", "tpc", current)
	if err != nil {
		panic(err)
	}
	if update.IsUpdate {
		if force {
			fmt.Printf("Found latest version %v \n", update.LatestVersion)
		} else {
			fmt.Printf("Found tpc latest version %v \n", update.LatestVersion)
		}
		// bin while install to "~/.tuya/bin/tpc".Please use in your case.
		// tpc is the string from tpc-*.zip.Please use in your case.
		// Run upgrade command
		if !force {
			fmt.Println("\nPress any key to exit.")
		}
	} else {
		if force {
			fmt.Printf("Local tpc version %v is the most recent release \n", current)
		}
	}
}

var rootCmd = &cobra.Command{
	Use:     "tpc",
	Version: Version,
	Run: func(cmd *cobra.Command, args []string) {
		sh.Command("tpc", "-h").Run()
	},
	PersistentPostRun: func(cmd *cobra.Command, args []string) {
		sh.Command("bash", "-c", "tpc upgrade --force=false").Start()
	},
}

var cmdUpgrade = &cobra.Command{
	Use: "upgrade",
	Run: func(cmd *cobra.Command, args []string) {
		force, _ := cmd.Flags().GetBool("force")
		checkUpgrade(Version, force)
	},
	PersistentPostRun: func(cmd *cobra.Command, args []string) {},
}

func main() {
	cmdUpgrade.Flags().Bool("force", true, "Force to upgrade")
	rootCmd.AddCommand(cmdUpgrade)
	rootCmd.Execute()
}
```

## Test

```bash
➜  go-release (main) ✗ go test -v .
=== RUN   TestRelease
    release_test.go:18: Latest version is 1.8.0.
    release_test.go:25: Latest Release URL is https://github.com/denoland/deno/releases/latest.
--- PASS: TestRelease (0.68s)
PASS
ok  	github.com/youngjuning/go-release	0.795s
```

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

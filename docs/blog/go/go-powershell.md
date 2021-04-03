---
title: Go 插件每日推荐之 go-powershell
cover: https://i.loli.net/2021/04/03/wAOh2D9gcmbKYsx.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

该软件包的灵感来自[jPowerShell](https://github.com/profesorfalken/jPowerShell)
，它允许运行和远程控制 PowerShell 会话。如果你没有要执行的静态脚本，而是执行动态运行
命令，那么请使用它。

## 安装

```sh
go get github.com/bhendo/go-powershell
```

## 使用

要启动 PowerShell Shell，你需要一个后台。后台进程启动并控制实际的 powershell.exe 进程。在大多数情况下，你会想要使用本地后台，该后台仅使用 `os/exec` 启动该过程。

```go
package main

import (
	"fmt"

	ps "github.com/bhendo/go-powershell"
	"github.com/bhendo/go-powershell/backend"
)

func main() {
	// 选择一个后台
	back := &backend.Local{}

  // 开启一个本地 powershell 进程
	shell, err := ps.New(back)
	if err != nil {
		panic(err)
	}
	defer shell.Exit()

	// ... 和它交互
	stdout, stderr, err := shell.Execute("Get-WmiObject -Class Win32_Processor")
	if err != nil {
		panic(err)
	}

	fmt.Println(stdout)
}
```

## 远程会话

你可以使用现有的 PS Shell 来使 PSSession cmdlet 连接到远程电脑。你可以使用会话中间件来代替手动处理，它负责身份验证。请注意，你仍然可以使用 原始 shell 在运行 Powershell 主机进程的计算机上执行命令。

```go
package main

import (
	"fmt"

	ps "github.com/bhendo/go-powershell"
	"github.com/bhendo/go-powershell/backend"
	"github.com/bhendo/go-powershell/middleware"
)

func main() {
	// 挑选一个后台
	back := &backend.Local{}

  // 开启一个本地 powershell 进程
	shell, err := ps.New(back)
	if err != nil {
		panic(err)
	}

  // 准备远程会话配置
	config := middleware.NewSessionConfig()
	config.ComputerName = "remote-pc-1"

  // 通过包装已存在的会话中间件来创建一个新的 shell
	session, err := middleware.NewSession(shell, config)
	if err != nil {
		panic(err)
	}
	defer session.Exit() //也将关闭底层的 ps shell！

	// everything run via the session is run on the remote machine
  // 会话相关的事情都是运行在远程及其上的
	stdout, stderr, err = session.Execute("Get-WmiObject -Class Win32_Processor")
	if err != nil {
		panic(err)
	}

	fmt.Println(stdout)
}
```

请注意，单个 shell 实例与远程一样不能安全地并发使用会话。你可以根据需要使用相同的 Shell 进行尽可能多的远程会话，但是你必须按顺序执行命令。如果需要并发，你可以创建多个 PowerShell 进程（即多次调用 `.New()`）。

另外，请注意，你执行的所有命令都包装在特殊的回显中语句来分隔 `stdout`/`stderr` 流。在执行命令 `.Execute()` 之后，因此，你将无法再访问 `$ LastExitCode` 并获得有意义的结果。

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

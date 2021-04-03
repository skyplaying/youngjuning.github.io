---
title: Go 插件每日推荐之 go-sh
cover: https://i.loli.net/2021/04/03/uKqsF59NI6jod2C.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

## 安装

```sh
go get github.com/codeskyblue/go-sh
```

## 管道示例

```go
package main

import "github.com/codeskyblue/go-sh"

func main() {
  sh.Command("echo", "hello\tworld").Command("cut", "-f2").Run()
}
```

因为我喜欢 `os/exec`，所以 `go-sh` 和它非常相似。 但是，`go-sh` 提供了更好的开发体验。

这是它的一些特性：

- 保持环境变量（比如 `export`）
- 支持别名 (例如 shell 中的别名)
- 记住当前的目录
- 管道命令
- 内置 shell 命令 `echo` 和 `test`
- timeout 支持

Examples are important:

- sh: `echo hello`
- go: `sh.Command("echo", "hello").Run()`

- sh: `export BUILD_ID=123`
- go: `s = sh.NewSession().SetEnv("BUILD_ID", "123")`

- sh: `alias ll='ls -l'`
- go: `s = sh.NewSession().Alias('ll', 'ls', '-l')`

- sh: `(cd /; pwd)`
- go: `sh.Command("pwd", sh.Dir("/")).Run()`

- sh: `test -d data || mkdir data`
- go: `if ! sh.Test("dir", "data") { sh.Command("mkdir", "data").Run() }`

- sh: `cat first second | awk '{print $1}'`
- go: `sh.Command("cat", "first", "second").Command("awk", "{print $1}").Run()`

- sh: `count=$(echo "one two three" | wc -w)`
- go: `count, err := sh.Echo("one two three").Command("wc", "-w").Output()`

- sh(in ubuntu): `timeout 1s sleep 3`
- go: `c := sh.Command("sleep", "3"); c.Start(); c.WaitTimeout(time.Second) # default SIGKILL`
- go: `out, err := sh.Command("sleep", "3").SetTimeout(time.Second).Output() # set session timeout and get output)`

- sh: `echo hello | cat`
- go: `out, err := sh.Command("cat").SetInput("hello").Output()`

- sh: `cat # read from stdin`
- go: `out, err := sh.Command("cat").SetStdin(os.Stdin).Output()`

- sh: `ls -l > /tmp/listing.txt # write stdout to file`
- go: `err := sh.Command("ls", "-l").WriteStdout("/tmp/listing.txt")`

如果您需要保留 `env` 和 `dir`，则最好创建一个会话：

```go
session := sh.NewSession()
session.SetEnv("BUILD_ID", "123")
session.SetDir("/")
# 然后调用 cmd
session.Command("echo", "hello").Run()
# 设置 ShowCMD 为 true 来调试程序
session.ShowCMD = true
```

默认情况下，仅当最后一个命令以非零状态退出时，管道才会返回错误。但是，你也可以启用 `bash` 之类的 `pipefail` 选项。在这种情况下，如果任何命令失败，则管道将返回错误；对于多个失败的命令，管道将返回最右边的失败命令的错误。

```go
session := sh.NewSession()
session.PipeFail = true
session.Command("cat", "unknown-file").Command("echo").Run()
```

默认情况下，管道的标准错误设置为上一个命令的标准错误。但是，你也可以使用 `session.PipeStdErrors = true` 将所有命令的标准错误合并到管道的标准错误中。

## 使用 Go shell 的原因

有时我们需要编写 Shell 脚本，但是 Shell 脚本不擅长跨平台工作，而 Go 则擅长于此。是否有使用 Go 编写类似脚本的 Shell 的好方法呢？ 答案是使用 go-sh 帮助你更方便的工作。

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

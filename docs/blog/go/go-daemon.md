---
title: Go 插件每日推荐之 go-daemon
cover: https://i.loli.net/2021/04/04/sqenki8pJDcLA6K.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

在 Go 中编写系统守护进程的库。

现在只支持基于 UNIX 的操作系统（不支持 Windows）。但是这个库只在 Linux 和 OSX 上进行了测试，所以如果你有能力在其他平台上测试这个库，请给我[反馈](https://github.com/sevlyar/go-daemon/issues/26)，谢谢。

请随时给我发送错误报告和修复。非常感谢所有的贡献者。

> 在一个多任务的电脑操作系统中，守护进程（英语：daemon，/ˈdiːmən/或/ˈdeɪmən/）是一种在后台执行的电脑程序。此类程序会被以进程的形式初始化。守护进程程序的名称通常以字母“d”结尾：例如，syslogd 就是指管理系统日志的守护进程。——维基百科

## 特性

- Go 协程安全的守护进程；
- 内置使用 pid 文件；
- 轻松处理系统信号；
- 守护进程的控制。

## 安装

```sh
go get github.com/sevlyar/go-daemon
```

你可以使用 [gopkg.in](http://labix.org/gopkg.in)：

```
go get gopkg.in/sevlyar/go-daemon.v0
```

如果你想在生产项目中使用该库，请使用 vendoring。因为在发布 v1.0 版本之前，我无法确保向后兼容。

## 示例

### 基础使用

```go
package main

import (
	"fmt"
	"html"
	"log"
	"net/http"

	"github.com/sevlyar/go-daemon"
)

// 要终止守护进程，使用:
// kill `cat sample.pid`。
func main() {
	cntxt := &daemon.Context{
		PidFileName: "sample.pid",
		PidFilePerm: 0644,
		LogFileName: "sample.log",
		LogFilePerm: 0640,
		WorkDir:     "./",
		Umask:       027,
		Args:        []string{"[go-daemon sample]"},
	}

	d, err := cntxt.Reborn()
	if err != nil {
		log.Fatal("Unable to run: ", err)
	}
	if d != nil {
		return
	}
	defer cntxt.Release()

	log.Print("- - - - - - - - - - - - - - -")
	log.Print("daemon started")

	serveHTTP()
}

func serveHTTP() {
	http.HandleFunc("/", httpHandler)
	http.ListenAndServe("127.0.0.1:8080", nil)
}

func httpHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("request from %s: %s %q", r.RemoteAddr, r.Method, r.URL)
	fmt.Fprintf(w, "go-daemon: %q", html.EscapeString(r.URL.Path))
}
```

### 信号处理

```go
package main

import (
	"flag"
	"github.com/sevlyar/go-daemon"
	"log"
	"os"
	"syscall"
	"time"
)

var (
	signal = flag.String("s", "", `Send signal to the daemon:
  quit — graceful shutdown
  stop — fast shutdown
  reload — reloading the configuration file`)
)

func main() {
	flag.Parse()
	daemon.AddCommand(daemon.StringFlag(signal, "quit"), syscall.SIGQUIT, termHandler)
	daemon.AddCommand(daemon.StringFlag(signal, "stop"), syscall.SIGTERM, termHandler)
	daemon.AddCommand(daemon.StringFlag(signal, "reload"), syscall.SIGHUP, reloadHandler)

	cntxt := &daemon.Context{
		PidFileName: "sample.pid",
		PidFilePerm: 0644,
		LogFileName: "sample.log",
		LogFilePerm: 0640,
		WorkDir:     "./",
		Umask:       027,
		Args:        []string{"[go-daemon sample]"},
	}

	if len(daemon.ActiveFlags()) > 0 {
		d, err := cntxt.Search()
		if err != nil {
			log.Fatalf("Unable send signal to the daemon: %s", err.Error())
		}
		daemon.SendCommands(d)
		return
	}

	d, err := cntxt.Reborn()
	if err != nil {
		log.Fatalln(err)
	}
	if d != nil {
		return
	}
	defer cntxt.Release()

	log.Println("- - - - - - - - - - - - - - -")
	log.Println("daemon started")

	go worker()

	err = daemon.ServeSignals()
	if err != nil {
		log.Printf("Error: %s", err.Error())
	}

	log.Println("daemon terminated")
}

var (
	stop = make(chan struct{})
	done = make(chan struct{})
)

func worker() {
LOOP:
	for {
		time.Sleep(time.Second) // this is work to be done by worker.
		select {
		case <-stop:
			break LOOP
		default:
		}
	}
	done <- struct{}{}
}

func termHandler(sig os.Signal) error {
	log.Println("terminating...")
	stop <- struct{}{}
	if sig == syscall.SIGQUIT {
		<-done
	}
	return daemon.ErrStop
}

func reloadHandler(sig os.Signal) error {
	log.Println("configuration reloaded")
	return nil
}
```

## 工作原理

我们不能在 Golang 的运行时使用 `fork` 系统调用，因为在这种情况下，子进程不会继承线程和协程。该库使用了一个简单的技巧：

它运行自己的副本，并带有一个标记--一个预定义的环境变量。该变量对进程的可用性意味着在子进程的副本中执行。因此，如果没有设置标记--库会执行父库的操作，并运行带有标记的自己的副本，如果设置了标记--库会执行子库的操作。

```go
func main() {
	Pre()

	context := new(Context)
	child, _ := context.Reborn()

	if child != nil {
		PostParent()
	} else {
		defer context.Release()
		PostChild()
	}
}
```

![](https://i.loli.net/2021/04/04/DMXag3TZxcfrtoR.png)

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

---
title: Go 插件每日推荐之 grab
cover: https://i.loli.net/2021/04/04/2xmPZgCU9EqQlNe.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

Grab 是一个用于从互联网上下载文件的 Go 包。

## 安装

```sh
$ go get github.com/cavaliercoder/grab
```

## 特性

- 同时监控下载进度
- 自动恢复未完成的下载
- 从内容头或 URL 路径猜测文件名。
- 使用 `context.Context` 安全地取消下载。
- 使用校验码验证下载
- 同时下载成批的文件
- 应用速率限制器

需要 Go 1.7 以上版本，版本管理可以查看另一篇文章[Go 插件每日推荐之 gvm](https://juejin.cn/post/6947189794719924254)

## 示例

下面的例子下载了免费电子书 《An Introduction to Programming in Go》。到当前工作目录中。

```go
resp, err := grab.Get(".", "http://www.golang-book.com/public/pdf/gobook.pdf")
if err != nil {
	log.Fatal(err)
}

fmt.Println("Download saved to", resp.Filename)
```

下面这个更完整的例子可以进行更精细的控制，并定期打印下载进度，直到下载完成。第二次运行该示例时，会自动恢复之前的下载，并提前退出。

```go
package main

import (
	"fmt"
	"os"
	"time"

	"github.com/cavaliercoder/grab"
)

func main() {
	// 创建客户端
	client := grab.NewClient()
	req, _ := grab.NewRequest(".", "http://www.golang-book.com/public/pdf/gobook.pdf")

	// 开始下载
	fmt.Printf("Downloading %v...\n", req.URL())
	resp := client.Do(req)
	fmt.Printf("  %v\n", resp.HTTPResponse.Status)

	// 开始 UI 循环
	t := time.NewTicker(500 * time.Millisecond)
	defer t.Stop()

Loop:
	for {
		select {
		case <-t.C:
			fmt.Printf("  transferred %v / %v bytes (%.2f%%)\n",
				resp.BytesComplete(),
				resp.Size(),
				100*resp.Progress())

		case <-resp.Done:
			// 下载完成
			break Loop
		}
	}

	// 检查错误
	if err := resp.Err(); err != nil {
		fmt.Fprintf(os.Stderr, "Download failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("Download saved to ./%v \n", resp.Filename)

	// Output:
	// Downloading http://www.golang-book.com/public/pdf/gobook.pdf...
	//   200 OK
	//   transferred 42970 / 2893557 bytes (1.49%)
	//   transferred 1207474 / 2893557 bytes (41.73%)
	//   transferred 2758210 / 2893557 bytes (95.32%)
	// Download saved to ./gobook.pdf
}
```

## 设计权衡

Grab 的主要用例是同时从远程文件存储库下载数千个大文件，而远程文件是不可更改的。例子包括操作系统包存储库或 ISO 库。

Grab 的目标是提供稳健、合理的默认值。这些默认值通常使用的 HTTP 规范，或者通过模仿常见的网络客户端（如 cURL、wget 和常见的网络浏览器）的行为。

Grab 的目标是无状态。唯一存在的状态是你的远程文件。希望下载的文件和可能已经完成、部分完成或尚未创建的本地副本。这样做的好处是，本地文件系统不会被额外的状态文件（如`.crdownload` 文件）弄得很乱。这种方法的缺点是，grab 必须对以下情况做出假设：本地和远程状态；具体来说，它们没有被另一个程序修改过。

如果本地或远程文件在 grab 以外的地方被修改，而你又下载了 grab 文件，那么你就会发现你的文件已经被修改了。文件，本地文件很可能会被损坏。在这种情况下，你可以考虑将远程文件变成不可更改的。

Grab 旨在为更复杂的功能实现最佳的功能。通过可扩展的接口，而不是重新实施。例如：你可以提供你自己的 Hash 算法来计算文件校验和，或者你自己的速率限制器实施（以及所有相关的权衡）。

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

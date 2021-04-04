---
title: Go插件每日推荐之 pb
cover: https://i.loli.net/2021/04/04/Zxon2JVL5ITBPsd.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

Go 的终端进度条

## 安装

```sh
go get github.com/cheggaaa/pb/v3。
```

v1 的文档在 [这里](https://github.com/cheggaaa/pb/blob/master/README_V1.md)

## 快速启动

```go
package main

import (
	"time"

	"github.com/cheggaaa/pb/v3"
)

func main() {
	count := 100000
  // 创建并开启一个新的进度条
	bar := pb.StartNew(count)

  // 基于Default模板开启一个进度条
	// bar := pb.Default.Start(count)

  // 基于 Simple 模板开启一个进度条
	// bar := pb.Simple.Start(count)

  // 基于 Full 模板开启一个进度条
	// bar := pb.Full.Start(count)

	for i := 0; i < count; i++ {
		bar.Increment()
		time.Sleep(time.Millisecond)
	}
	bar.Finish()
}
```

结果将是这样的。

```sh
> go run test.go
37158 / 100000 [================>_______________________________] 37.16% 1m11s
```

## 设置

```go
// 创建进度条
bar := pb.New(count)

// 每秒刷新一次（默认 200ms）
bar.SetRefreshRate(time.Second)

// 强制设置 `io.Writer`，默认是 `os.Stderr`
bar.SetWriter(os.Stdout)

// bar will format numbers as bytes (B, KiB, MiB, etc)
// 进度条会在内部把数字转为字节(B, KiB, MiB 等)
bar.Set(pb.Bytes, true)

// bar use SI bytes prefix names (B, kB) instead of IEC (B, KiB)
// 进度条使用 SI 字节前缀（B，KB）代替 IEC（B，KiB）
bar.Set(pb.SIBytesPrefix, true)

// 设置自定义 进度条模板
bar.SetTemplateString(myTemplate)

// 检查设置的模板的正确性
if err = bar.Err(); err != nil {
    return
}

// 开启一个进度条
bar.Start()
```

## IO 操作的进度条

```go
package main

import (
	"crypto/rand"
	"io"
	"io/ioutil"

	"github.com/cheggaaa/pb/v3"
)

func main() {

	var limit int64 = 1024 * 1024 * 500
	// we will copy 200 Mb from /dev/rand to /dev/null
       // 我们将从 `/dev/rand` 拷贝 200 Mb 文件到 `/dev/null/
	reader := io.LimitReader(rand.Reader, limit)
	writer := ioutil.Discard

	// 开启一个新的进度条
	bar := pb.Full.Start64(limit)
	// 创建 proxy reader
	barReader := bar.NewProxyReader(reader)
  // 从 proxy reader 拷贝
	io.Copy(writer, barReader)
	// 完成进度条
	bar.Finish()
}
```

## 自定义进度条模板

基于内置的文本/模板包进行渲染。你可以使用现有的 pb 的元素或创建你自己的元素。

所有可用的元素都在 `element.go` 文件中描述。

### 一个例子中的所有元素。

```go
tmpl := `{{ red "With funcs:" }} {{ bar . "<" "-" (cycle . "↖" "↗" "↘" "↙" ) "." ">"}} {{speed . | rndcolor }} {{percent .}} {{string . "my_green_string" | green}} {{string . "my_blue_string" | blue}}`
// 基于 pb 的模板开启一个进度条
bar := pb.ProgressBarTemplate(tmpl).Start64(limit)
// 为 string 元素设置值
bar.Set("my_green_string", "green").
	Set("my_blue_string", "blue")
```

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

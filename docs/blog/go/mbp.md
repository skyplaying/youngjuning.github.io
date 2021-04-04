---
title: Go 插件每日推荐之 mbp
cover: https://i.loli.net/2021/04/04/cRfVE7kH2WhuxIb.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

**mpb** 是一个用于在终端应用程序中渲染进度条的 Go 库。

## 特性

- **多条进度条**：支持多个进度条
- **动态总数**：进度条运行时设置总数
- **动态添加/删除**：动态添加或删除进度条
- **取消**：取消整个渲染过程
- **预定义装饰器**：时间、基于 [EWMA](https://github.com/VividCortex/ewma) 的 ETA、百分比、字节计数器。
- **装饰器的宽度同步**：在多个进度条之间同步装饰器的宽度。

## 使用

### 渲染单个进度条

```go
package main

import (
    "math/rand"
    "time"

    "github.com/vbauerster/mpb/v6"
    "github.com/vbauerster/mpb/v6/decor"
)

func main() {
    // 使用自定义的宽度初始化进度条容器
    p := mpb.New(mpb.WithWidth(64))

    total := 100
    name := "Single Bar:"
    // 添加单个进度条，这个进度条会继承容器的宽度
    bar := p.Add(int64(total),
        // 使用自定义的样式填充进度条
        mpb.NewBarFiller("╢▌▌░╟"),
        mpb.PrependDecorators(
            // 右边一格显示我们的名字
            decor.Name(name, decor.WC{W: len(name) + 1, C: decor.DidentRight}),
            // 用 `done` 消息替换 ETA 装饰器，`OnComplete` 事件。
            decor.OnComplete(
                decor.AverageETA(decor.ET_STYLE_GO, decor.WC{W: 4}), "done",
            ),
        ),
        mpb.AppendDecorators(decor.Percentage()),
    )
    // 模拟一些工作
    max := 100 * time.Millisecond
    for i := 0; i < total; i++ {
        time.Sleep(time.Duration(rand.Intn(10)+1) * max / 10)
        bar.Increment()
    }
    // 等着我们的进度条完成并清理
    p.Wait()
}
```

### 渲染多进度条

```go
var wg sync.WaitGroup
// 传递 &wg（可选的），所以 p 最终会等等它
p := mpb.New(mpb.WithWaitGroup(&wg))
total, numBars := 100, 3
wg.Add(numBars)

for i := 0; i < numBars; i++ {
    name := fmt.Sprintf("Bar#%d:", i)
    bar := p.AddBar(int64(total),
        mpb.PrependDecorators(
            // 简单的 name 装饰器
            decor.Name(name),
            // decor.DSyncWidth 使列宽同步化。
            decor.Percentage(decor.WCSyncSpace),
        ),
        mpb.AppendDecorators(
            // 用 `done` 消息替换 ETA 装饰器，`OnComplete` 事件。
            decor.OnComplete(
                decor.EwmaETA(decor.ET_STYLE_GO, 60), "done",
            ),
        ),
    )
    // 模拟一些工作
    go func() {
        defer wg.Done()
        rng := rand.New(rand.NewSource(time.Now().UnixNano()))
        max := 100 * time.Millisecond
        for i := 0; i < total; i++ {
            start := time.Now()
            time.Sleep(time.Duration(rng.Intn(10)+1) * max / 10)
            bar.Increment()
            bar.DecoratorEwmaUpdate(time.Since(start))
        }
    }()
}
p.Wait()
```

### [Dynamic total](https://github.com/vbauerster/mpb/blob/master/_examples/dynTotal/main.go)

![](https://i.loli.net/2021/04/04/3alSbAVwx2hm5Gq.png)

### [Complex example](https://github.com/vbauerster/mpb/blob/master/_examples/complex/main.go)

![](https://i.loli.net/2021/04/04/KVZlptCMT5b8kmW.png)

### [Bytes counters](https://github.com/vbauerster/mpb/blob/master/_examples/io/main.go)

![](https://i.loli.net/2021/04/04/J2tnaGMCr3YmDgv.png)

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

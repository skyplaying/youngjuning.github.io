---
title: Go 插件每日推荐之 spinner
cover: https://i.loli.net/2021/04/03/SzLyxThVPpjGCi5.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

spinner 是一个简单的包，可以向任何终端应用程序中添加一个 spinner /progress 指示器。可以在下面找到示例，也可以在 examples 目录中找到完整的示例。

有关该库及其功能的更多详细信息，请在安装后参考本地的 godoc。

## 安装

```bash
go get github.com/briandowns/spinner
```

## 可用的字符集

(由其切片索引编号)

| 索引 | 字符集                                                                                                                                                                      | GIF                                                                         |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 0    | `←↖↑↗→↘↓↙`                                                                                                                                                                  | ![Sample Gif](https://github.com/briandowns/spinner/raw/master/gifs/0.gif)  |
| 1    | `▁▃▄▅▆▇█▇▆▅▄▃▁`                                                                                                                                                             | ![1.gif](https://i.loli.net/2021/04/03/hR98ciqVfkzyS5l.gif)                 |
| 2    | `▖▘▝▗`                                                                                                                                                                      | ![2.gif](https://i.loli.net/2021/04/03/KTpGLWrfRS1JzAl.gif)                 |
| 3    | `┤┘┴└├┌┬┐`                                                                                                                                                                  | ![3.gif](https://i.loli.net/2021/04/03/eMdfHxJhFXO7SrW.gif)                 |
| 4    | `◢◣◤◥`                                                                                                                                                                      | ![4.gif](https://i.loli.net/2021/04/03/JjkPo3LueAWZBCO.gif)                 |
| 5    | `◰◳◲◱`                                                                                                                                                                      | ![5.gif](https://i.loli.net/2021/04/03/Eog9qrxy5tFIDP3.gif)                 |
| 6    | `◴◷◶◵`                                                                                                                                                                      | ![6.gif](https://i.loli.net/2021/04/03/BePwy1gHoXpTYNS.gif)                 |
| 7    | `◐◓◑◒`                                                                                                                                                                      | ![7.gif](https://i.loli.net/2021/04/03/iwozU4uGyYIrCeO.gif)                 |
| 8    | `.oO@*`                                                                                                                                                                     | ![Sample Gif](https://github.com/briandowns/spinner/raw/master/gifs/8.gif)  |
| 9    | `\|/-\` | ![9.gif](https://i.loli.net/2021/04/03/2jBAOgTUsi7mP1h.gif)                                                                                                       |
| 10   | `◡◡⊙⊙◠◠`                                                                                                                                                                    | ![10.gif](https://i.loli.net/2021/04/03/c1mYoHzbrwpsASd.gif)                |
| 11   | `⣾⣽⣻⢿⡿⣟⣯⣷`                                                                                                                                                                  | ![Sample Gif](https://github.com/briandowns/spinner/raw/master/gifs/11.gif) |
| 12   | `>))'> >))'> >))'> >))'> >))'> <'((< <'((< <'((<`                                                                                                                           | ![Sample Gif](https://github.com/briandowns/spinner/raw/master/gifs/12.gif) |
| 13   | `⠁⠂⠄⡀⢀⠠⠐⠈`                                                                                                                                                                  | ![13.gif](https://i.loli.net/2021/04/03/doeySsLYtF3cwEb.gif)                |
| 14   | `⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏`                                                                                                                                                                | ![14.gif](https://i.loli.net/2021/04/03/klc7BrNj658hHLp.gif)                |
| 15   | `abcdefghijklmnopqrstuvwxyz`                                                                                                                                                | ![15.gif](https://i.loli.net/2021/04/03/ujdzovwLbf9G8IW.gif)                |
| 16   | `▉▊▋▌▍▎▏▎▍▌▋▊▉`                                                                                                                                                             | ![16.gif](https://i.loli.net/2021/04/03/v15IrLMA2RpFJgf.gif)                |
| 17   | `■□▪▫`                                                                                                                                                                      | ![17.gif](https://i.loli.net/2021/04/03/faHeS9jCYhVnwyJ.gif)                |
| 18   | `←↑→↓`                                                                                                                                                                      | ![18.gif](https://i.loli.net/2021/04/03/KUOfp8AzR3a1gTs.gif)                |
| 19   | `╫╪`                                                                                                                                                                        | ![19.gif](https://i.loli.net/2021/04/03/sMYcBQ4PJfDZHkl.gif)                |
| 20   | `⇐⇖⇑⇗⇒⇘⇓⇙`                                                                                                                                                                  | ![Sample Gif](https://github.com/briandowns/spinner/raw/master/gifs/20.gif) |
| 21   | `⠁⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈⠈`                                                                                                                                             | ![21.gif](https://i.loli.net/2021/04/03/yh2HYItCwnV5zZM.gif)                |
| 22   | `⠈⠉⠋⠓⠒⠐⠐⠒⠖⠦⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈`                                                                                                                                                  | ![Sample Gif](https://github.com/briandowns/spinner/raw/master/gifs/22.gif) |
| 23   | `⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠴⠲⠒⠂⠂⠒⠚⠙⠉⠁`                                                                                                                                                  | ![Sample Gif](https://github.com/briandowns/spinner/raw/master/gifs/23.gif) |
| 24   | `⠋⠙⠚⠒⠂⠂⠒⠲⠴⠦⠖⠒⠐⠐⠒⠓⠋`                                                                                                                                                         | ![24.gif](https://i.loli.net/2021/04/03/4UqHxzAT2IJByej.gif)                |
| 25   | `ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ`                                                                                                                   | ![25.gif](https://i.loli.net/2021/04/03/dIp3vmM1RCB4XtN.gif)                |
| 26   | `. .. ...`                                                                                                                                                                  | ![26.gif](https://i.loli.net/2021/04/03/xWSXfhCnpAvEKIg.gif)                |
| 27   | `▁▂▃▄▅▆▇█▉▊▋▌▍▎▏▏▎▍▌▋▊▉█▇▆▅▄▃▂▁`                                                                                                                                            | ![27.gif](https://i.loli.net/2021/04/03/agkunpxzMNv138m.gif)                |
| 28   | `.oO°Oo.`                                                                                                                                                                   | ![28.gif](https://i.loli.net/2021/04/03/i9wuvoZcp1FkQ8B.gif)                |
| 29   | `+x`                                                                                                                                                                        | ![29.gif](https://i.loli.net/2021/04/03/QB4dgbw98r132OJ.gif)                |
| 30   | `v<^>`                                                                                                                                                                      | ![30.gif](https://i.loli.net/2021/04/03/LelKaBCZJP8xEgY.gif)                |
| 31   | `>>---> >>---> >>---> >>---> >>---> <---<< <---<< <---<< <---<< <---<<`                                                                                                     | ![Sample Gif](https://github.com/briandowns/spinner/raw/master/gifs/31.gif) |
| 32   | `\| \|\| \|\|\| \|\|\|\| \|\|\|\|\| \|\|\|\|\|\| \|\|\|\|\| \|\|\|\| \|\|\| \|\| \|`                                                                                        | ![Sample Gif](https://github.com/briandowns/spinner/raw/master/gifs/32.gif) |
| 33   | `[] [=] [==] [===] [====] [=====] [======] [=======] [========] [=========] [==========]`                                                                                   | ![Sample Gif](https://github.com/briandowns/spinner/raw/master/gifs/33.gif) |
| 34   | `(*---------) (-*--------) (--*-------) (---*------) (----*-----) (-----*----) (------*---) (-------*--) (--------*-) (---------*)`                                         | ![34.gif](https://i.loli.net/2021/04/03/CtZmufKlxWFRkYG.gif)                |
| 35   | `█▒▒▒▒▒▒▒▒▒ ███▒▒▒▒▒▒▒ █████▒▒▒▒▒ ███████▒▒▒ ██████████`                                                                                                                    | ![35.gif](https://i.loli.net/2021/04/03/6IpAVjuOrXaTG9J.gif)                |
| 36   | `[ ] [=> ] [===> ] [=====> ] [======> ] [========> ] [==========> ] [============> ] [==============> ] [================> ] [==================> ] [===================>]` | ![36.gif](https://i.loli.net/2021/04/03/PDoTg3NbYpe4yJI.gif)                |
| 37   | `🕐 🕑 🕒 🕓 🕔 🕕 🕖 🕗 🕘 🕙 🕚 🕛`                                                                                                                                       | ![37.gif](https://i.loli.net/2021/04/03/fmzgCTP8I9RQxiK.gif)                |
| 38   | `🕐 🕜 🕑 🕝 🕒 🕞 🕓 🕟 🕔 🕠 🕕 🕡 🕖 🕢 🕗 🕣 🕘 🕤 🕙 🕥 🕚 🕦 🕛 🕧`                                                                                                   | ![38.gif](https://i.loli.net/2021/04/03/UItKdMxTSP2NerY.gif)                |
| 39   | `🌍 🌎 🌏`                                                                                                                                                                  | ![39.gif](https://i.loli.net/2021/04/03/UExr4TtpqOiVGma.gif)                |
| 40   | `◜ ◝ ◞ ◟`                                                                                                                                                                   | ![40.gif](https://i.loli.net/2021/04/03/3uLeA5BjHrgSc2h.gif)                |
| 41   | `⬒ ⬔ ⬓ ⬕`                                                                                                                                                                   | ![41.gif](https://i.loli.net/2021/04/03/gE5CH8oNFmbKjSs.gif)                |
| 42   | `⬖ ⬘ ⬗ ⬙`                                                                                                                                                                   | ![42.gif](https://i.loli.net/2021/04/03/QAlqubHTFzm8af4.gif)                |
| 43   | `[>>> >] []>>>> [] [] >>>> [] [] >>>> [] [] >>>> [] [] >>>>[] [>> >>]`                                                                                                      | ![43.gif](https://i.loli.net/2021/04/03/BawSXzDi6PW97xK.gif)                |

## 特性

- 开始
- 停止
- 重启
- 反转方向
- 更新 spinner 字符集
- 更新 spinner 速度
- 前缀或者后缀文字
- 修改 spinner 颜色、背景色和文字属性
- 获取 spinner 状态
- 链，管道，重定向输出
- 在 spinner 完成时输出最终字符串

## 示例

```Go
package main

import (
	"github.com/briandowns/spinner"
	"time"
)

func main() {
	s := spinner.New(spinner.CharSets[9], 100*time.Millisecond)  // 构建新的 spinner
	s.Start()                                                    // 开始
	time.Sleep(4 * time.Second)                                  // 模拟真实的工作
	s.Stop()
}
```

## 更新字符集并重启 spinner

```Go
s.UpdateCharSet(spinner.CharSets[1])  // 用不同的字符集更新 spinner
s.Restart()                           // 重启 spinner
time.Sleep(4 * time.Second)
s.Stop()
```

## 更新旋转速度并重新启动微调器

```Go
s.UpdateSpeed(200 * time.Millisecond) // 更新 spinner 转动的速度
s.Restart()
time.Sleep(4 * time.Second)
s.Stop()
```

## 反转 spinner 旋转的方向

```Go
s.Reverse() // 反转 spinner 旋转的方向
s.Restart()
time.Sleep(4 * time.Second)
s.Stop()
```

## 提供你自己的 spinner

或者给我发送一个 issue 或者 pull request 添加到项目里。

```Go
someSet := []string{"+", "-"}
s := spinner.New(someSet, 100*time.Millisecond)
```

## spinner 的前缀和后缀文字

```Go
s.Prefix = "prefixed text: " // spinner 前缀
s.Suffix = "  :appended text" // spinner 后缀
```

## 设置或改变 spinner 的颜色

默认颜色是 white。spinner 需要重启来应用改变。

```Go
s.Color("red") // 设置 spinner 颜色为 red
```

您可以同时指定背景色和前景色，以及其他属性，例如 `bold` 或 `underline`。

```Go
s.Color("red", "bold") // Set the spinner color to a bold red 设置 spinner 为粗体红色
```

或将背景设置为黑色，将前景设置为粗体红色：

```Go
s.Color("bgBlack", "bold", "fgRed")
```

下面是完整的 color 和属性列表：

```
// default colors
red
black
green
yellow
blue
magenta
cyan
white

// attributes
reset
bold
faint
italic
underline
blinkslow
blinkrapid
reversevideo
concealed
crossedout

// foreground text
fgBlack
fgRed
fgGreen
fgYellow
fgBlue
fgMagenta
fgCyan
fgWhite

// foreground Hi-Intensity text
fgHiBlack
fgHiRed
fgHiGreen
fgHiYellow
fgHiBlue
fgHiMagenta
fgHiCyan
fgHiWhite

// background text
bgBlack
bgRed
bgGreen
bgYellow
bgBlue
bgMagenta
bgCyan
bgWhite

// background Hi-Intensity text
bgHiBlack
bgHiRed
bgHiGreen
bgHiYellow
bgHiBlue
bgHiMagenta
bgHiCyan
bgHiWhite
```

## 生成数字序列

```Go
setOfDigits := spinner.GenerateNumberSequence(25)  // 生成25位数字的字符串
s := spinner.New(setOfDigits, 100*time.Millisecond)
```

## 获取 spinner 状态

```Go
fmt.Println(s.Active())
```

## Unix 管道和重定向

由 [dekz](https://github.com/dekz) 建议并撰写的功能

将 Spinner Writer 设置为 Stderr 可以增强向链，管道或重定向输出的功能，从而向用户显示进度。

这是此时设置 Writer 的首选方法。

```go
s := spinner.New(spinner.CharSets[11], 100*time.Millisecond, spinner.WithWriter(os.Stderr))
s.Suffix = " Encrypting data..."
s.Start()
// Encrypt the data into ciphertext
fmt.Println(os.Stdout, ciphertext)
```

```sh
> myprog encrypt "Secret text" > encrypted.txt
⣯ Encrypting data...
```

```sh
> cat encrypted.txt
1243hjkbas23i9ah27sj39jghv237n2oa93hg83
```

## 最终字符串输出

spinner/indicator 完成后添加其他输出。最终输出字符串可以是多行的，并将被写入配置了 `io.Writer` 的任何地方。

```Go
s := spinner.New(spinner.CharSets[9], 100*time.Millisecond)
s.FinalMSG = "Complete!\nNew line!\nAnother one!\n"
s.Start()
time.Sleep(4 * time.Second)
s.Stop()
```

输出：

```sh
Complete!
New line!
Another one!
```

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

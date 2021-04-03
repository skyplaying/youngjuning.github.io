---
title: Go 插件每日推荐之 chalk
cover: https://i.loli.net/2021/04/04/1fi6a5XmCTqnDMu.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

Chalk 是用于对控制台和终端输出进行样式设置的 Go 包。

查看 godoc 中的使用示例：http://godoc.org/github.com/ttacon/chalk

该 API 很简洁，有默认的 Colors 和 TextStyles 可以混合使用以创建更强烈的样式。样式和颜色可以用普通字符串打印（即`fmt.Sprintf(chalk.Red)`），但是样式、颜色和文本样式更适合用于特定样式文字区隔（例如 `fmt.Println(chalk.Red.Color("this is red")`）或 `fmt.Println(myStyle.Style("这是带下划线的蓝色文本"))`）。

## Examples

你可以在 examples 目录中找到一些 chalk 的简单示例：

```go
package main

import (
	"fmt"

	"github.com/ttacon/chalk"
)

func main() {
  // 你可以使用颜色
	fmt.Println(chalk.Red, "Writing in colors", chalk.Cyan, "is so much fun", chalk.Reset)
	fmt.Println(chalk.Magenta.Color("You can use colors to color specific phrases"))

  // 你可以使用文本样式
	fmt.Println(chalk.Bold.TextStyle("We can have bold text"))
	fmt.Println(chalk.Underline.TextStyle("We can have underlined text"))
	fmt.Println(chalk.Bold, "But text styles don't work quite like colors :(")

  // 你可以使用样式
	blueOnWhite := chalk.Blue.NewStyle().WithBackground(chalk.White)
	fmt.Printf("%s%s%s\n", blueOnWhite, "And they also have backgrounds!", chalk.Reset)
	fmt.Println(
		blueOnWhite.Style("You can style strings the same way you can color them!"))
	fmt.Println(
		blueOnWhite.WithTextStyle(chalk.Bold).
			Style("You can mix text styles with colors, too!"))

	// 借助 go 的功能，你还可以轻松制作样式功能
	lime := chalk.Green.NewStyle().
		WithBackground(chalk.Black).
		WithTextStyle(chalk.Bold).
		Style
	fmt.Println(lime("look at this cool lime text!"))
}

```

输出：

![screenshot](https://raw.githubusercontent.com/ttacon/chalk/master/img/chalk_example.png)

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

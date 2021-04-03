---
title: Go 插件每日推荐之 go-promptui
cover: https://i.loli.net/2021/04/03/wD92IeCxkgmAUfs.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

命令行应用程序的交互式提示。

我们之所以建立 Promptui，是因为我们想让使用 [manifold cli](https://github.com/manifoldco/manifold-cli) 探索云服务变得简单而有趣

## 预览

![promptui](https://media.giphy.com/media/xUNda0Ngb5qsogLsBi/giphy.gif)

Promptui 是一个库，提供了一个简单的界面来创建 go 的命令行提示符。它可以很容易地集成到 [spf13/cobra](https://github.com/spf13/cobra)、 [urfave/cli](https://github.com/urfave/cli) 或任意 go CLI 程序。

Promptui 有两个输入模式：

- `Prompt` 为用户提供了单行输入。提示支持可选的实时验证、确认和遮罩输入。
- `Select` 提供了可供选择的选项列表。选择支持分页、搜索、详细视图和自定义模板。

## 基础使用

### Prompt

```go
package main

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/manifoldco/promptui"
)

func main() {
	validate := func(input string) error {
		_, err := strconv.ParseFloat(input, 64)
		if err != nil {
			return errors.New("Invalid number")
		}
		return nil
	}

	prompt := promptui.Prompt{
		Label:    "Number",
		Validate: validate,
	}

	result, err := prompt.Run()

	if err != nil {
		fmt.Printf("Prompt failed %v\n", err)
		return
	}

	fmt.Printf("You choose %q\n", result)
}
```

### Select

```go
package main

import (
	"fmt"

	"github.com/manifoldco/promptui"
)

func main() {
	prompt := promptui.Select{
		Label: "Select Day",
		Items: []string{"Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
			"Saturday", "Sunday"},
	}

	_, result, err := prompt.Run()

	if err != nil {
		fmt.Printf("Prompt failed %v\n", err)
		return
	}

	fmt.Printf("You choose %q\n", result)
}
```

### confirm

```go
package main

import (
	"fmt"

	"github.com/manifoldco/promptui"
)

func main() {
	prompt := promptui.Prompt{
		Label:     "Delete Resource",
		IsConfirm: true,
	}

	result, err := prompt.Run()

	if err != nil {
		fmt.Printf("Prompt failed %v\n", err)
		return
	}

	fmt.Printf("You choose %q\n", result)
}
```

### 更多示例

查看完整列表 [examples](https://github.com/manifoldco/promptui/tree/master/_examples)

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

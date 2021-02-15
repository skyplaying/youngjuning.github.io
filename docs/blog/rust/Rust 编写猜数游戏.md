---
title: Rust 编写猜数游戏
tags: [掘金专栏]
cover: https://i.loli.net/2021/02/15/TSfMxtmOLvqcn7w.png
order: 3
---

这两天洛竹因为被人喷太菜，文章还到处发。在这里对大家说抱歉了，我道歉的点是不该为了曝光率转发到各个前端群，这笔记我还是会坚持写，坚持发出来给大家看。——虽菜但瘾

经过两天的思考以及大佬解惑之后，我悟出的真谛是：**学习新技能最好的状态是有兴趣、有地方分享以及有志同道合的人一起交流。**

## 处理用户输入

猜数游戏第一部分会请求用户进行输入，上代码：

```rust
use std::io;

fn main() {
    println!("Guess the number!");

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failded to read line");

    println!("You guessed: {}", guess);
}
```

**声明导入：**

- `use std::is;` 语句：把标准库（[std](https://github.com/rust-lang/rust/tree/master/library/std/src/io)）中的 `io` 模块引入当前的作用域中。
- Rust 默认会将预导入（prelude）模块内的条目自动引入每一段程序的作用域中，它包含了一小部分相当常用的类型。如果你需要的模块不在预导入模块内，那么我们就必须使用 `use` 语句来显式地进行导入声明。
- `std::id` 库包含了许多有用的功能，我们可以使用它来获得用户的输入数据。

**使用变量来存储值：**

- `let mut guess = String::new();`

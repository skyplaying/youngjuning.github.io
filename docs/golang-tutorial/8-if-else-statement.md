---
title: if else 语句
tags: [掘金专栏]
order: 8
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文翻译自 [Golang tutorial series](https://golangbot.com/learn-golang-series/)
>
> 本文同步于公众号洛竹早茶馆，转载请联系作者。

`if` is a statement that has a boolean condition and it executes a block of code if that condition evaluates to `true`. It executes an alternate else block if the condition evaluates to `false`. In this tutorial, we will look at the various syntaxes and ways of using if statement.

## If statement syntax

The syntax of the `if` statement is provided below

```go
if condition {
}
```

If the `condition` is true, the lines of code between the braces `{` and `}` is executed.

Unlike in other languages like C, the braces `{ }` are mandatory even if there is only one line of code between the brace`s{ }`.

## Example

Let's write a simple program to find out whether a number is even or odd.

```go
package main

import (
    "fmt"
)

func main() {
    num := 10
    if num%2 == 0 { //checks if number is even
        fmt.Println("The number", num, "is even")
        return
    }
    fmt.Println("The number", num, "is odd")
}
```

[Run in Playground](https://play.golang.org/p/RRxkgK07ul4)

In the above program, the condition `num%2` in line no. 9 finds whether the remainder of dividing `num` by `2` is zero or not. Since it is `0` in this case, the text `The number 10 is even` is printed and the program returns.

## If else statement

The `if` statement has an optional `else` construct which will be executed if the condition in the `if` statement evaluates to `false`.

```go
if condition {
} else {
}
```

In the above snippet, if `condition` evaluates to `false`, then the lines of code between `else {` and `}` will be executed.

Let's rewrite the program to find whether the number is odd or even using `if else` statement.

```go
package main

import (
    "fmt"
)

func main() {
    num := 11
    if num%2 == 0 { //checks if number is even
        fmt.Println("the number", num, "is even")
    } else {
        fmt.Println("the number", num, "is odd")
    }
}
```

[Run in playground](https://play.golang.org/p/bMevwhJhguO)

In the above code, instead of returning if the condition is `true` as we did in the previous section, we create an `else` statement that will be executed if the condition is `false`. In this case, since `11` is odd, the if condition is `false` and the lines of code within the `else` statement is executed. The above program will print.

```
the number 11 is odd
```

## If ... else if ... else statement

The if statement also has optional `else if` and `else` components. The syntax for the same is provided below

```go
if condition1 {
...
} else if condition2 {
...
} else {
...
}
```

The condition is evaluated for the truth from the top to bottom.

In the above statement if `condition1` is true, then the lines of code within `if condition1 {` and the closing brace `}` are executed.

If `condition1` is `false` and `condition2` is `true`, then the lines of code within `else if condition2 {` and the next closing brace `}` is executed.

If both `condition1` and `condition2` are false, then the lines of code in the else statement between `else {` and `}` are executed.

There can be any number of `else if` statements.

In general, whichever `if` or `else if`'s condition evaluates to `true`, it's corresponding code block is executed. If none of the conditions are true then `else` block is executed.

Let's write a program that uses `else if`.

```go
package main

import (
    "fmt"
)

func main() {
    num := 99
    if num <= 50 {
        fmt.Println(num, "is less than or equal to 50")
    } else if num >= 51 && num <= 100 {
        fmt.Println(num, "is between 51 and 100")
    } else {
        fmt.Println(num, "is greater than 100")
    }
}
```

[Run in playground](https://play.golang.org/p/VNPbCiK9eXT)

In the above program, the condition `else if num >= 51 && num <= 100` in line no. 11 is `true` and hence the program will print

```
99 is between 51 and 100
```

## If with assignment

There is one more variant of `if` which includes an optional shorthand assignment statement that is executed before the condition is evaluated. Its syntax is

```go
if assignment-statement; condition {
}
```

In the above snippet, `assignment-statement` is first executed before the condition is evaluated.

Let's rewrite the program which finds whether the number is even or odd using the above syntax.

```go
package main

import (
    "fmt"
)

func main() {
    if num := 10; num % 2 == 0 { //checks if number is even
        fmt.Println(num,"is even")
    }  else {
        fmt.Println(num,"is odd")
    }
}
```

[Run in playground](https://play.golang.org/p/_X9q4MWr4s)

In the above program `num` is initialized in the `if` statement in line no. 8. One thing to be noted is that `num` is available only for access from inside the `if` and `else`. i.e. the scope of `num` is limited to the `if else` blocks. If we try to access `num` from outside the `if` or `else`, the compiler will complain. This syntax often comes in handy when we declare a variable just for the purpose of `if else` construct. Using this syntax in such cases ensures that the scope of the variable is only within the `if else` statement.

## Gotcha

The `else` statement should start in the same line after the closing curly brace `}` of the if statement. If not the compiler will complain.

Let's understand this by means of a program.

```go
package main

import (
    "fmt"
)

func main() {
    num := 10
    if num % 2 == 0 { //checks if number is even
        fmt.Println("the number is even")
    }
    else {
        fmt.Println("the number is odd")
    }
}
```

[Run in playground](https://play.golang.org/p/RYNqZZO2F9)

In the program above, the `else` statement does not start in the same line after the closing `}` of the if statement in line no. 11. Instead, it starts in the next line. This is not allowed in Go. If you run this program, the compiler will output the error,

```
./prog.go:12:5: syntax error: unexpected else, expecting }
```

The reason is because of the way Go inserts semicolons automatically. You can read about the semicolon insertion rule here https://golang.org/ref/spec#Semicolons.

In the rules, it's specified that a semicolon will be inserted after closing brace `}`, if that is the final token of the line. So a semicolon is automatically inserted after the if statement's closing braces `}` in line no. 11 by the Go compiler.

So our program actually becomes

```go
...
if num%2 == 0 {
      fmt.Println("the number is even")
};  //semicolon inserted by Go Compiler
else {
      fmt.Println("the number is odd")
}
```

after semicolon insertion. The compiler would have inserted a semicolon in line no. 4 of the above snippet.

Since `if{...} else {...}` is one single statement, a semicolon should not be present in the middle of it. Hence this program fails to compile. Therefore it is a syntactical requirement to place the `else` in the same line after the if statement's closing brace `}`.

I have rewritten the program by moving the else after the closing `}` of the if statement to prevent the automatic semicolon insertion.

```go
package main

import (
    "fmt"
)

func main() {
    num := 10
    if num%2 == 0 { //checks if number is even
        fmt.Println("the number is even")
    } else {
        fmt.Println("the number is odd")
    }
}
```

[Run in playground](https://play.golang.org/p/hv_27vbIBC)

Now the compiler will be happy and so are we 😃.

## Idiomatic Go

We have seen various if-else constructs and we have in fact seen multiple ways to write the same program. For example, we have seen multiple ways to write a program that checks whether the number is even or odd using different `if else` constructs. Which one is the idiomatic way of coding in Go? In Go's philosophy, it is better to avoid unnecessary branches and indentation of code. It is also considered better to return as early as possible. I have provided the program from the previous section below,

```go
package main

import (
    "fmt"
)

func main() {
    if num := 10; num % 2 == 0 { //checks if number is even
        fmt.Println(num,"is even")
    }  else {
        fmt.Println(num,"is odd")
    }
}
```

[Run in playground](https://play.golang.org/p/_X9q4MWr4s)

The idiomatic way of writing the above program in Go's philosophy is to avoid the else and return from the `if` if the condition is true.

```go
package main

import (
    "fmt"
)

func main() {
    num := 10;
    if num%2 == 0 { //checks if number is even
        fmt.Println(num, "is even")
        return
    }
    fmt.Println(num, "is odd")

}
```

[Run in playground](https://play.golang.org/p/N8A5tPLnVYr)

In the above program, as soon as we find out the number is even, we return immediately. This avoids the unnecessary else code branch. This is the way things are done in Go 😃. Please keep this in mind whenever writing Go programs.

This brings us to the end of this tutorial. I hope you enjoyed reading. Please leave your valuable comments and feedback.

If you would like to advertise on this website, hire me, or if you have any other development requirements please email to naveen[at]golangbot[dot]com.

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

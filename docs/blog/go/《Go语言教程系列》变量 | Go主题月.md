---
title: 《Go语言教程系列》变量 | Go主题月
cover: https://i.loli.net/2021/03/25/Xm1h3jqHJwMYAbs.jpg
tags: [掘金专栏, 洛竹早茶馆]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文翻译自 [Golang tutorial series](https://golangbot.com/learn-golang-series/)
>
> 本文同步于公众号洛竹早茶馆，转载请联系作者。

This is the third tutorial in our Golang tutorial series and it deals with variables in Golang.

You can read [《Go 语言教程系列》Hello World | Go 主题月](https://juejin.cn/post/6942876429625327653) to learn about configuring Go and running the hello world program.

## What is a variable?

Variable is the name given to a memory location to store a value of a specific type. There are various syntaxes to declare variables in Go. Let's look at them one by one.

## Declaring a single variable

**var name type** is the syntax to declare a single variable.

```go
package main

import "fmt"

func main() {
  var age int // variable declaration
  fmt.Println("My age is", age)
}
```

[Run in playground](https://play.golang.org/p/bycpQlMWyw-)

The statement `var age int` declares a variable named `age` of type `int`.We have not assigned any value to this variable. If a variable is not assigned any value, Go automatically initializes it with the **zero value** of the variable's type. In this case, age is assigned the value `0`, which is the zero value of `int`. If you run this program, you can see the following output.

```go
My age is 0
```

A variable can be assigned to any value of its type. In the above program, `age` can be assigned any integer value.

```go
package main

import "fmt"

func main() {
  var age int // variable declaration
  fmt.Println("My age is", age)
  age = 29 //assignment
  fmt.Println("My age is", age)
  age = 54 //assignment
  fmt.Println("My new age is", age)
}
```

[Run in playground](https://play.golang.org/p/dP8hG83Gj3K)

The above program will print the following output.

```go
My age is  0
My age is 29
My new age is 54
```

## Declaring a variable with an initial value

A variable can also be provided an initial value when it is declared. The following is the syntax to declare a variable with an initial value.

```go
var name type = initialvalue
```

```go
package main

import "fmt"

func main() {
  var age int = 29 // variable declaration with initial value

  fmt.Println("My age is", age)
}
```

[Run in playground](https://play.golang.org/p/zWtpqINuJlA)

In the above program, `age` is a variable of type `int` and has initial value `29`.The above program will print the following output.

```
My age is 29
```

It shows that age has been initialized with the value 29.

## Type inference

If a variable has an initial value, Go will automatically be able to infer the type of that variable using that initial value. Hence if a variable has an initial value, the `type` in the variable declaration can be removed.

If the variable is declared using the following syntax

```go
var name = initialvalue
```

Go will automatically infer the type of that variable from the initial value.

In the following example, we can see that the type `int` of the variable `age` has been removed in line no. 6. Since the variable has an initial value `29`, Go can infer that it is of type `int`.

```go
package main

import "fmt"

func main() {
  var age = 29 // type will be inferred
  fmt.Println("My age is", age)
}
```

[Run in playground](https://play.golang.org/p/i99Xzzz9XBD)

## Multiple variable declaration

Multiple variables can be declared using a single statement.

`var name1, name2 type = initialvalue1, initialvalue2` is the syntax for multiple variable declaration.

```go
package main

import "fmt"

func main() {
  var width, height int = 100, 50 //declaring multiple variables

  fmt.Println("width is", width, "height is", height)
}
```

[Run in playground](https://play.golang.org/p/4aOQyt55ah)

The type can be removed if the variables have an initial value. Since the above program has initial values for variables, the `int` type can be removed.

```go
package main

import "fmt"

func main() {
    var width, height = 100, 50 //"int" is dropped

    fmt.Println("width is", width, "height is", height)
}
```

[Run in playground](https://play.golang.org/p/sErofTJ6g-)

The above program will `print width is 100 height is 50` as the output.

As you would have probably guessed by now, if the initial value is not specified for width and height, they will have `0` assigned as their initial value.

```go
package main

import "fmt"

func main() {
  var width, height int
  fmt.Println("width is", width, "height is", height)
  width = 100
  height = 50
  fmt.Println("new width is", width, "new height is", height)
}
```

[Run in playground](https://play.golang.org/p/aPegNR4MAA_q)

The above program will print

```
width is 0 height is 0
new width is 100 new height is 50
```

There might be cases where we would want to declare variables belonging to different types in a single statement. The syntax for doing that is

```go
var (
      name1 = initialvalue1
      name2 = initialvalue2
)
```

The following program uses the above syntax to declare variables of different types.

```go
package main

import "fmt"

func main() {
    var (
        name   = "naveen"
        age    = 29
        height int
    )
    fmt.Println("my name is", name, ", age is", age, "and height is", height)
}
```

[Run in playground](https://play.golang.org/p/7pkp74h_9L)

Here we declare a variable `name` of type `string`, `age` and `height` of type int. (We will discuss the various types available in Golang in the next tutorial).

Running the above program will print

```
my name is naveen , age is 29 and height is 0
```

## Short hand declaration

Go also provides another concise way to declare variables. This is known as short hand declaration and it uses `:=` operator.

`name := initialvalue` is the short hand syntax to declare a variable.

The following program uses the short hand syntax to declare a variable `count` initialized to `10`. Go will automatically infer that `count` is of type `int` since it has been initialized with the integer value `10`.

```go
package main

import "fmt"

func main() {
    count := 10
    fmt.Println("Count =",count)
}
```

[Run in playground](https://play.golang.org/p/L5_8aru7VQM)

The above program will print,

```
Count = 10
```

It is also possible to declare multiple variables in a single line using short hand syntax.

```go
package main

import "fmt"

func main() {
  name, age := "naveen", 29 //short hand declaration

  fmt.Println("my name is", name, "age is", age)
}
```

[Run in playground](https://play.golang.org/p/ctqgw4w6kx)

The above program declares two variables `name` and `age` of type `string` and `int` respectively.

If you run the above program, you can see `my name is naveen age is 29` getting printed.

Short hand declaration requires initial values for all variables on the left-hand side of the assignment. The following program will print an error `assignment mismatch: 2 variables but 1 values`. This is because **age has not been assigned a value**.

```go
package main

import "fmt"

func main() {
  name, age := "naveen" //error

  fmt.Println("my name is", name, "age is", age)
}
```

[Run in playground](https://play.golang.org/p/wZd2HmDvqw)

Short hand syntax can only be used when at least one of the variables on the left side of `:=` is newly declared. Consider the following program,

```go
package main

import "fmt"

func main() {
    a, b := 20, 30 // declare variables a and b
    fmt.Println("a is", a, "b is", b)
    b, c := 40, 50 // b is already declared but c is new
    fmt.Println("b is", b, "c is", c)
    b, c = 80, 90 // assign new values to already declared variables b and c
    fmt.Println("changed b is", b, "c is", c)
}
```

[Run in playground](https://play.golang.org/p/MSUYR8vazB)

In the above program, in line no. 8, **b** has already been declared but **c** is newly declared and hence it works and outputs

```
a is 20 b is 30
b is 40 c is 50
changed b is 80 c is 90
```

Whereas if we run the program below,

```go
package main

import "fmt"

func main() {
    a, b := 20, 30 //a and b declared
    fmt.Println("a is", a, "b is", b)
    a, b := 40, 50 //error, no new variables
}
```

[Run in playground](https://play.golang.org/p/EYTtRnlDu3)

it will print error `/prog.go:8:10: no new variables on left side of :=` This is because both the variables **a** and **b** have already been declared and there are no new variables in the left side of `:=` in line no. 8

Variables can also be assigned values which are computed during run time. Consider the following program,

```go
package main

import (
    "fmt"
    "math"
)

func main() {
    a, b := 145.8, 543.8
    c := math.Min(a, b)
    fmt.Println("Minimum value is", c)
}
```

[Run in playground](https://play.golang.org/p/Kk84pOyFgQB)

In the above program [math](https://golang.org/pkg/math/) is a package and [Min](https://golang.org/pkg/math/#Min) is a function in that package. Don't worry about it right now, we will discuss packages and functions in detail in the upcoming tutorials. All we need to know is, the value of `c` is calculated at run time and it's the minimum of `a` and `b`. The program above will print,

```
Minimum value is  145.8
```

Since Go is strongly typed, variables declared as belonging to one type cannot be assigned a value of another type. The following program will print an error `cannot use "naveen" (type string) as type int in assignment` because `age` is declared as type `int` and we are trying to assign a `string` value to it.

```go
package main

func main() {
    age := 29      // age is int
    age = "naveen" // error since we are trying to assign a string to a variable of type int
}
```

[Run in playground](https://play.golang.org/p/K5rz4gxjPj)

Thanks for reading. Please post your feedback and queries in the comments section.

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

---
title: Go 语法学习笔记
---

## 常亮和变量

### 常量

```go
package main

func main() {
  const name = "俊宁"
  name = "洛竹" // cannot assign to name
}
```

### 变量

```go
package main

import(
  "fmt"
)

func main() {
  var name = "俊宁"
  fmt.Printf("My name is %v.", name)

  name = "洛竹"
  fmt.Printf("My name is %v.)
}
```

### 短声明变量

短声明不仅声明语句更短，而且可以在无法使用 `var` 的地方使用

```go
package main

func main() {
  var count = 10
  count := 10
  fmt.Println(count)
}
```

`for` 循环中使用短声明：

```go
for count := 0; count < 10; count++ {
  fmt.Println(count)
}
```

`if` 语句中使用短声明来声明变量：

```go
package main

import(
  "math/rand"
)

func main() {
  if num:= rand.Intn(3); num == 0 {
    fmt.Println("Space Adventures")
  } else if num == 1 {
    fmt.Println("SpaceX")
  } else {
    fmt.Println("Virgin Galactic")
  }
}
```

在 switch 语句里使用短声明来声明变量

```go
package main

import(
  "fmt"
  "math/rand"
)
func main()  {
  switch num := rand.Intn(10); num {
  case 0:
    fmt.Println("Space Adventures")
  case 1:
    fmt.Println("SpaceX")
  case 2:
    fmt.Println("Virgin Galactic")
  default:
    fmt.Println("Random spaceline #", num)
  }
}
```

## 作用域

### 块级作用域

Go 的块级作用域就是 `{}`。

```go
package main

import (
 "fmt"
 "strings"
)

func main() {
  if strings.Contains("俊宁", "宁") {
    name := "俊宁"
    fmt.Println(name)
  }
  fmt.Println(name) // undefined: name
}
```

### package 作用域

短声明不可以用来声明 package 作用域的变量。在 main 函数外声明的变量拥有 package 作用域。如果 main package 有多个函数，那么该变量对它们都可见。

```go
package main

import (
 "fmt"
 "strings"
)

var name = "俊宁"

func main() {
  fmt.Println(name)
}

func sayHi() {
  fmt.Println("Hello", name)
}
```

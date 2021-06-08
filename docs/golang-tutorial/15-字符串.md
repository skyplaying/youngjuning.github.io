---
title: 字符串
cover: https://i.loli.net/2021/04/03/LcCR12iF5Vy7rwI.png
tags: [掘金专栏]
order: 15
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号洛竹早茶馆，转载请联系作者。
>
> 本文翻译自 [Golang tutorial series](https://golangbot.com/learn-golang-series/)
>
> 创作不易，养成习惯，素质三连！

在 Go 中，String 值得特别一提，因为与其他语言相比，它们在实现上有所不同。

## String 是什么？

**在 Go 中，一个字符串是字节的一个切片。字符串可以通过将一组字符放在双引号内来创建**

让我们看看一个简单的例子，创建一个 `string` 并打印出来。

```go
package main

import (
    "fmt"
)

func main() {
    name := "Hello World"
    fmt.Println(name)
}
```

[Run in playground](https://play.golang.org/p/o9OVDgEMU0)

上述程序将打印 `Hello World`。

Go 中的字符串是 [符合 Unicode 标准](https://naveenr.net/unicode-character-set-and-utf-8-utf-16-utf-32-encoding/) 并且是 [UTF-8 编码](https://naveenr.net/unicode-character-set-and-utf-8-utf-16-utf-32-encoding/) 的。

## 访问一个字符串的单个字节

由于字符串是字节的一个切片，所以可以访问字符串的每个字节。

```go
package main

import (
    "fmt"
)

func printBytes(s string) {
    fmt.Printf("Bytes: ")
    for i := 0; i < len(s); i++ {
      fmt.Printf("%x ", s[i])
    }
}

func main() {
  name := "Hello World"
    fmt.Printf("String: %s\n", name) // 输入的字符串被打印出来
    printBytes(name)
}
```

[Run in playground](https://play.golang.org/p/B3KgBBQhiN9)

`%s` 是用于打印字符串的格式化标识符。`len(s)` 返回字符串中的字节数，我们使用 `for` 循环以十六进制符号打印这些字节。`%x` 是十六进制的格式指定符。上述程序的输出结果是：

```sh
String: Hello World
Bytes: 48 65 6c 6c 6f 20 57 6f 72 6c 64
```

这是 `Hello World` 的 [Unicode UT8 编码](<https://mothereff.in/utf-8#Hello World>) 值. 为了更好地理解字符串，需要对 Unicode 和 UTF-8 有一个基本的了解。 我推荐阅读 https://naveenr.net/unicode-character-set-and-utf-8-utf-16-utf-32-encoding/ 了解更多 Unicode 和 UTF-8 的知识。

## 访问字符串的单个字符

让我们对上述程序稍作修改，以打印字符串的字符。

```go
package main

import (
    "fmt"
)

func printBytes(s string) {
    fmt.Printf("Bytes: ")
    for i := 0; i < len(s); i++ {
        fmt.Printf("%x ", s[i])
    }
}

func printChars(s string) {
    fmt.Printf("Characters: ")
    for i := 0; i < len(s); i++ {
        fmt.Printf("%c ", s[i])
    }
}

func main() {
    name := "Hello World"
    fmt.Printf("String: %s\n", name)
    printChars(name)
    fmt.Printf("\n")
    printBytes(name)
}
```

[Run in playground](https://play.golang.org/p/ZkXmyVNsqv7)

`%c` 格式化标识符用于打印 `printChars` 方法中字符串参数中的字符。该程序打印的是：

```
String: Hello World
Characters: H e l l o   W o r l d
Bytes: 48 65 6c 6c 6f 20 57 6f 72 6c 64
```

虽然上面的程序看起来是访问字符串的单个字符的合法方式，但这有一个严重的错误。让我们来看看这个错误是什么。

```go
package main

import (
    "fmt"
)

func printBytes(s string) {
    fmt.Printf("Bytes: ")
    for i := 0; i < len(s); i++ {
        fmt.Printf("%x ", s[i])
    }
}

func printChars(s string) {
    fmt.Printf("Characters: ")
    for i := 0; i < len(s); i++ {
        fmt.Printf("%c ", s[i])
    }
}

func main() {
    name := "Hello World"
    fmt.Printf("String: %s\n", name)
    printChars(name)
    fmt.Printf("\n")
    printBytes(name)
    fmt.Printf("\n\n")
    name = "Señor"
    fmt.Printf("String: %s\n", name)
    printChars(name) //
    fmt.Printf("\n")
    printBytes(name)
}
```

[Run in playground](https://play.golang.org/p/2hyVf8l9fiO)

上述程序的输出是

```
String: Hello World
Characters: H e l l o   W o r l d
Bytes: 48 65 6c 6c 6f 20 57 6f 72 6c 64

String: Señor
Characters: S e Ã ± o r
Bytes: 53 65 c3 b1 6f 72
```

我们试图打印 **Señor** 的字符，但它输出 **S e Ã ± o r**，这是错误的。为什么这个程序对 `Señor` 会出错，而对 `Hello World` 却能完全正常工作。原因是 `ñ` 的 Unicode 码位是 `U+00F1`，其 [UTF-8 编码](https://mothereff.in/utf-8#%C3%B1) 占用了 2 个字节 `c3` 和 `b1`。我们试图打印字符，假设每个代码点是一个字节，这是错误的。**在 UTF-8 编码中，一个代码点可以占用 1 个以上的字节。**那么我们如何解决这个问题？这就需要 **rune** 拯救我们的地方了。

## Rune

Rune 是 Go 中的一个内置类型，它是 `int32` 的别名。Rune 在 Go 中代表一个 Unicode 代码点。不管这个代码点占用多少字节，它都可以用 Rune 来表示。让我们修改上面的程序，用 Rune 来打印字符。

```go
package main

import (
    "fmt"
)

func printBytes(s string) {
    fmt.Printf("Bytes: ")
    for i := 0; i < len(s); i++ {
        fmt.Printf("%x ", s[i])
    }
}

func printChars(s string) {
    fmt.Printf("Characters: ")
    runes := []rune(s) // 字符串被转换为 runes 的切片
    // 然后我们对其进行循环，并显示这些字符。
    for i := 0; i < len(runes); i++ {
        fmt.Printf("%c ", runes[i])
    }
}

func main() {
    name := "Hello World"
    fmt.Printf("String: %s\n", name)
    printChars(name)
    fmt.Printf("\n")
    printBytes(name)
    fmt.Printf("\n\n")
    name = "Señor"
    fmt.Printf("String: %s\n", name)
    printChars(name)
    fmt.Printf("\n")
    printBytes(name)
}
```

[Run in playground](https://play.golang.org/p/n8rsfagm2SJ)

上述程序打印出：

```sh
String: Hello World
Characters: H e l l o   W o r l d
Bytes: 48 65 6c 6c 6f 20 57 6f 72 6c 64

String: Señor
Characters: S e ñ o r
Bytes: 53 65 c3 b1 6f 72
```

上述输出是完美的。只是我们想要的 😀。

## 使用 `for range` 循环访问单个 Rune

上面的程序是一个完美的方式来迭代一个字符串的各个 Rune。但是 Go 为我们提供了一种更简单的方法，即使用 `for range` 循环来实现这一目的。

```go
package main

import (
    "fmt"
)

func charsAndBytePosition(s string) {
    // 使用 for range 循环迭代 string
    for index, rune := range s {
        fmt.Printf("%c starts at byte %d\n", rune, index)
    }
}

func main() {
    name := "Señor"
    charsAndBytePosition(name)
}
```

[Run in playground](https://play.golang.org/p/0ldNBeffjYI)

循环返回 Rune 开始的字节的位置，同时返回 Rune 的位置。这个程序输出：

```
S starts at byte 0
e starts at byte 1
ñ starts at byte 2
o starts at byte 4
r starts at byte 5
```

从上面的输出可以看出，`ñ` 占用了 2 个字节，因为下一个字符 `o` 是从第 4 字节开始的，而不是第 3 字节 😀。

## 从一个字节片中创建一个字符串

```go
package main

import (
    "fmt"
)

func main() {
    byteSlice := []byte{0x43, 0x61, 0x66, 0xC3, 0xA9}
    str := string(byteSlice)
    fmt.Println(str)
}
```

[Run in playground](https://play.golang.org/p/Vr9pf8X8xO)

`byteSlice` 包含字符串 `Café`的 [UTF-8 编码](https://mothereff.in/utf-8#Caf%C3%A9) 十六进制字节。该程序打印出

```
Café
```

如果我们有相当于十六进制的十进制值，怎么办？上面的程序能工作吗？让我们来看看。

```go
package main

import (
    "fmt"
)

func main() {
    byteSlice := []byte{67, 97, 102, 195, 169} // 十进制相当于 {'\x43', '\x61', '\x66', '\xC3', '\xA9'}
    str := string(byteSlice)
    fmt.Println(str)
}
```

[Run in playground](https://play.golang.org/p/jgsRowW6XN)

小数点值也可以，上述程序也会打印出 `Café`。

## Creating a string from a slice of runes

```go
package main

import (
    "fmt"
)

func main() {
    runeSlice := []rune{0x0053, 0x0065, 0x00f1, 0x006f, 0x0072}
    str := string(runeSlice)
    fmt.Println(str)
}
```

[Run in playground](https://play.golang.org/p/m8wTMOpYJP)

In the above program `runeSlice` contains the Unicode code points of the string `Señor` in hexadecimal. The program outputs

```
Señor
```

## String length

The `RuneCountInString(s string) (n int)` function of the [utf8 package](<https://golang.org/pkg/unicode/utf8/#RuneCountInString >) can be used to find the length of the string. This method takes a string as an argument and returns the number of runes in it.

As we discussed earlier, `len(s)` is used to find the number of bytes in the string and it doesn't return the string length. As we already discussed, some Unicode characters have code points that occupy more than 1 byte. Using `len` to find out the length of those strings will return the incorrect string length.

```go
package main

import (
    "fmt"
    "unicode/utf8"
)

func main() {
    word1 := "Señor"
    fmt.Printf("String: %s\n", word1)
    fmt.Printf("Length: %d\n", utf8.RuneCountInString(word1))
    fmt.Printf("Number of bytes: %d\n", len(word1))

    fmt.Printf("\n")
    word2 := "Pets"
    fmt.Printf("String: %s\n", word2)
    fmt.Printf("Length: %d\n", utf8.RuneCountInString(word2))
    fmt.Printf("Number of bytes: %d\n", len(word2))
}
```

[Run in playground](https://play.golang.org/p/KBQg1qagnfC)

The output of the above program is

```
String: Señor
Length: 5
Number of bytes: 6

String: Pets
Length: 4
Number of bytes: 4
```

The above output confirms that `len(s)` and `RuneCountInString(s)` return different values 😀.

## String comparison

The `==` operator is used to compare two strings for equality. If both the strings are equal, then the result is `true` else it's `false`.

```go
package main

import (
    "fmt"
)

func compareStrings(str1 string, str2 string) {
    if str1 == str2 {
        fmt.Printf("%s and %s are equal\n", str1, str2)
        return
    }
    fmt.Printf("%s and %s are not equal\n", str1, str2)
}

func main() {
    string1 := "Go"
    string2 := "Go"
    compareStrings(string1, string2)

    string3 := "hello"
    string4 := "world"
    compareStrings(string3, string4)

}
```

[Run in playground](https://play.golang.org/p/JEAMexbvJ1s)

In the `compareStrings` function above, line no. 8 compares whether the two strings `str1` and `str2` are equal using the `==` operator. If they are equal, it prints a corresponding message and the [function](https://golangbot.com/functions/) returns.

The above program prints,

```
Go and Go are equal
hello and world are not equal
```

## String concatenation

There are multiple ways to perform string concatenation in Go. Let's look at a couple of them.

The most simple way to perform string concatenation is using the `+` operator.

```go
package main

import (
    "fmt"
)

func main() {
    string1 := "Go"
    string2 := "is awesome"
    result := string1 + " " + string2
    fmt.Println(result)
}
```

[Run in playground](https://play.golang.org/p/RCL8SGkrBe9)

In the program above, in line no. 10, `string1` is concatenated to `string2` with a space in the middle. This program prints,

```
Go is awesome
```

The second way to concatenate strings is using the [Sprintf](https://golang.org/pkg/fmt/#Sprintf) function of the fmt package.

The `Sprintf` function formats a string according to the input format specifier and returns the resulting string. Let's rewrite the above program using `Sprintf` function.

```go
package main

import (
    "fmt"
)

func main() {
    string1 := "Go"
    string2 := "is awesome"
    result := fmt.Sprintf("%s %s", string1, string2)
    fmt.Println(result)
}
```

[Run in playground](https://play.golang.org/p/AgqI29aQQDu)

In line no. 10 of the program above, `%s %s` is the format specifier input for `Sprintf`. This format specifier takes two strings as input and has a space in between. This will concatenate the two strings with a space in the middle. The resulting string is stored in `result`. This program also prints,

```
Go is awesome
```

## Strings are immutable

Strings are immutable in Go. Once a string is created it's not possible to change it.

```go
package main

import (
    "fmt"
)

func mutate(s string)string {
    s[0] = 'a'//any valid unicode character within single quote is a rune
    return s
}
func main() {
    h := "hello"
    fmt.Println(mutate(h))
}
```

[Run in playground](https://play.golang.org/p/bv4SlSd_hp)

In line no. 8 of the above program, we try to change the first character of the string to `'a'`. Any valid Unicode character within a single quote is a rune. We try to assign the rune `a` to the zeroth position of the slice. This is not allowed since the string is immutable and hence the program fails to compile with error **./prog.go:8:7: cannot assign to s\[0\]**

To workaround this string immutability, strings are converted to a [slice](https://golangbot.com/arrays-and-slices/) of runes. Then that slice is mutated with whatever changes are needed and converted back to a new string.

```go
package main

import (
    "fmt"
)

func mutate(s []rune) string {
    s[0] = 'a'
    return string(s)
}
func main() {
    h := "hello"
    fmt.Println(mutate([]rune(h)))
}
```

[Run in playground](https://play.golang.org/p/GL1cm17IP1)

In line no.7 of the above program, the `mutate` function accepts a rune slice as an argument. It then changes the first element of the slice to `'a'`, converts the rune back to string and returns it. This method is called from line no. 13 of the program. `h` is converted to a slice of runes and passed to `mutate` in line no. 13. This program outputs `aello`

I have created a single program in GitHub which includes everything we discussed. You can download it [here](https://github.com/golangbot/stringsexplained).

That's it for strings. Have a great day.

Please share your valuable comments and feedback.

Like my tutorials\? Please [support the content](https://golangbot.com/support-the-content/).

**Next tutorial \- [Pointers](https://golangbot.com/pointers/)**

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

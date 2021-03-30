---
title: 字符串
cover:
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号洛竹早茶馆，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

Welcome to tutorial no. 14 in [Golang tutorial series](https://golangbot.com/learn-golang-series/).

Strings deserve a special mention in Go as they are different in implementation when compared to other languages.

### What is a String\?

**A string is a [slice](https://golangbot.com/arrays-and-slices/) of bytes in Go. Strings can be created by enclosing a set of characters inside double quotes `" "`.**

Let's look at a simple example that creates a `string` and prints it.

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

[Run in playground](<https://play.golang.org/p/o9OVDgEMU0 >)

The above program will print `Hello World`.

Strings in Go are [Unicode compliant](https://naveenr.net/unicode-character-set-and-utf-8-utf-16-utf-32-encoding/) and are [UTF-8 Encoded](https://naveenr.net/unicode-character-set-and-utf-8-utf-16-utf-32-encoding/).

### Accessing individual bytes of a string

Since a string is a slice of bytes, it's possible to access each byte of a string.

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
    fmt.Printf("String: %s\n", name)
    printBytes(name)
}
```

[Run in playground](https://play.golang.org/p/B3KgBBQhiN9)

**\%s is the format specifier to print a string.** In line no. 16, the input string is printed. In line no. 9 of the program above, **len\(s\) returns the number of bytes in the string** and we use a [for loop](https://golangbot.com/loops/) to print those bytes in hexadecimal notation. **\%x is the format specifier for hexadecimal.** The above program outputs

```
String: Hello World
Bytes: 48 65 6c 6c 6f 20 57 6f 72 6c 64
```

These are the [Unicode UT8-encoded](<https://mothereff.in/utf-8#Hello World>) values of `Hello World`. A basic understanding of Unicode and UTF-8 is needed to understand strings better. I recommend reading <https://naveenr.net/unicode-character-set-and-utf-8-utf-16-utf-32-encoding/> to know more about Unicode and UTF-8.

### Accessing individual characters of a string

Let's modify the above program a little bit to print the characters of the string.

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

[Run in playground](<https://play.golang.org/p/ZkXmyVNsqv7 >)

In line no.17 of the program above, **\%c format specifier is used to print the characters of the string** in the `printChars` method. The program prints

```
String: Hello World
Characters: H e l l o   W o r l d
Bytes: 48 65 6c 6c 6f 20 57 6f 72 6c 64
```

Although the above program looks like a legitimate way to access the individual characters of a string, this has a serious bug. Let's find out what that bug is.

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
    printChars(name)
    fmt.Printf("\n")
    printBytes(name)
}
```

[Run in playground](<https://play.golang.org/p/2hyVf8l9fiO >)

The output of the above program is

```
String: Hello World
Characters: H e l l o   W o r l d
Bytes: 48 65 6c 6c 6f 20 57 6f 72 6c 64

String: Señor
Characters: S e Ã ± o r
Bytes: 53 65 c3 b1 6f 72
```

In line no. 30 of the program above, we are trying to print the characters of **Señor** and it outputs **S e Ã ± o r** which is wrong. Why does this program break for `Señor` when it works perfectly fine for `Hello World`. The reason is that the Unicode code point of `ñ` is `U+00F1` and its [UTF-8 encoding](https://mothereff.in/utf-8#%C3%B1) occupies 2 bytes `c3` and `b1`. We are trying to print characters assuming that each code point will be one byte long which is wrong. **In UTF-8 encoding a code point can occupy more than 1 byte.** So how do we solve this\? This is where **rune** saves us.

### Rune

A rune is a builtin [type](https://golangbot.com/types/) in Go and it's the alias of int32. Rune represents a Unicode code point in Go. It doesn't matter how many bytes the code point occupies, it can be represented by a rune. Let's modify the above program to print characters using a rune.

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
    runes := []rune(s)
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

In line no. 16 of the program above, the string is converted to a [slice](https://golangbot.com/arrays-and-slices/) of runes. We then loop over it and display the characters. This program prints,

```
String: Hello World
Characters: H e l l o   W o r l d
Bytes: 48 65 6c 6c 6f 20 57 6f 72 6c 64

String: Señor
Characters: S e ñ o r
Bytes: 53 65 c3 b1 6f 72
```

The above output is perfect. Just want we wanted 😀.

### Accessing individual runes using for range loop

The above program is a perfect way to iterate over the individual runes of a string. But Go offers us a much easier way to do this using the **for range** loop.

```go
package main

import (
    "fmt"
)

func charsAndBytePosition(s string) {
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

In line no.8 of the program above, the string is iterated using `for range` loop. The loop returns the position of the byte where the rune starts along with the rune. This program outputs

```
S starts at byte 0
e starts at byte 1
ñ starts at byte 2
o starts at byte 4
r starts at byte 5
```

From the above output, it's clear that `ñ` occupies 2 bytes since the next character `o` starts at byte 4 instead of byte 3 😀.

### Creating a string from a slice of bytes

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

_byteSlice_ in line no. 8 of the program above contains the [UTF-8 Encoded](https://mothereff.in/utf-8#Caf%C3%A9) hex bytes of the string `Café`. The program prints

```
Café
```

What if we have the decimal equivalent of hex values. Will the above program work\? Let's check it out.

```go
package main

import (
    "fmt"
)

func main() {
    byteSlice := []byte{67, 97, 102, 195, 169}//decimal equivalent of {'\x43', '\x61', '\x66', '\xC3', '\xA9'}
    str := string(byteSlice)
    fmt.Println(str)
}
```

[Run in playground](https://play.golang.org/p/jgsRowW6XN)

Decimal values also work and the above program will also print `Café`.

### Creating a string from a slice of runes

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

### String length

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

### String comparison

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

### String concatenation

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

### Strings are immutable

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

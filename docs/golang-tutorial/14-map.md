---
title: Map
cover:
tags: [掘金专栏]
order: 14
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号洛竹早茶馆，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

Welcome to tutorial no. 13 in [Golang tutorial series](https://golangbot.com/learn-golang-series/).

### What is a map\?

A map is a builtin type in Go that is used to store key-value pairs. Let's take the example of a startup with a few employees. For simplicity, let's assume that the first name of all these employees is unique. We are looking for a data structure to store the salary of each employee. A map will be a perfect fit for this use case. The name of the employee can be the key and the salary can be the value. Maps are similar to dictionaries in other languages such as Python.

### How to create a map\?

A map can be created by passing the [type](/types) of key and value to the `make` function. The following is the syntax to create a new map.

```
make(map[type of key]type of value)
```

```go
employeeSalary := make(map[string]int)
```

The above line of code creates a map named `employeeSalary` which has `string` keys and `int` values.

```go
package main

import (
    "fmt"
)

func main() {
    employeeSalary := make(map[string]int)
    fmt.Println(employeeSalary)
}
```

[Run in Playground](https://play.golang.org/p/EoaQ_Xwz66Z)

The program above creates a map named `employeeSalary` with `string` key and `int` value. The above program will print,

```
map[]
```

Since we have not added any elements to the map, it's empty.

### Adding items to a map

The syntax for adding new items to a map is the same as that of [arrays](/arrays-and-slices/). The program below adds some new employees to the `employeeSalary` map.

```go
package main

import (
    "fmt"
)

func main() {
    employeeSalary := make(map[string]int)
    employeeSalary["steve"] = 12000
    employeeSalary["jamie"] = 15000
    employeeSalary["mike"] = 9000
    fmt.Println("employeeSalary map contents:", employeeSalary)
}
```

[Run in playground](<https://play.golang.org/p/-IUSnvdgF2I >)

We have added three employees `steve`, `jamie` and `mike` and their corresponding salaries.

The above program prints,

```
employeeSalary map contents: map[steve:12000 jamie:15000 mike:9000]
```

It is also possible to initialize a map during the declaration itself.

```go
package main

import (
    "fmt"
)

func main() {
    employeeSalary := map[string]int {
        "steve": 12000,
        "jamie": 15000,
    }
    employeeSalary["mike"] = 9000
    fmt.Println("employeeSalary map contents:", employeeSalary)
}
```

[Run in playground](<https://play.golang.org/p/oR_j4jkJflf >)

The above program declares `employeeSalary` and adds two elements to it during the declaration itself. Later one more element with key `mike` is added. The program prints

```
employeeSalary map contents: map[jamie:15000 mike:9000 steve:12000]
```

It's not necessary that only [string](/strings) types should be keys. All comparable types such as boolean, integer, float, complex, string, ... can also be keys. Even user-defined types such as [structs](/structs) can be keys. If you would like to know more about comparable types, please visit <http://golang.org/ref/spec#Comparison_operators>

### Zero value of a map

The zero value of a map is `nil`. If you try to add elements to a `nil` map, a run-time [panic](https://golangbot.com/panic-and-recover/) will occur. Hence the map has to be initialized before adding elements.

```go
package main

func main() {
    var employeeSalary map[string]int
    employeeSalary["steve"] = 12000
}
```

[Run in playground](https://play.golang.org/p/DH8gJVjn6M2)

In the above program, `employeeSalary` is `nil` and we are trying to add a new key to the map. The program will panic with error

`panic: assignment to entry in nil map`

### Retrieving value for a key from a map

Now that we have added some elements to the map, let's learn how to retrieve them. `map[key]` is the syntax to retrieve elements of a map.

```go
package main

import (
    "fmt"
)

func main() {
    employeeSalary := map[string]int{
        "steve": 12000,
        "jamie": 15000,
        "mike": 9000,
    }
    employee := "jamie"
    salary := employeeSalary[employee]
    fmt.Println("Salary of", employee, "is", salary)
}
```

[Run in playground](<https://play.golang.org/p/qthGPQ6pj0Z >)

The above program is pretty straightforward. The salary of the employee `jamie` is retrieved and printed. The program prints

```
Salary of jamie is 15000
```

What will happen if an element is not present\? The map will return the zero value of the type of that element. In the case of `employeeSalary` map, if we try to access an element which is not present, the zero value of `int` which is `0` will be returned.

```go
package main

import (
    "fmt"
)

func main() {
    employeeSalary := map[string]int{
        "steve": 12000,
        "jamie": 15000,
    }
    fmt.Println("Salary of joe is", employeeSalary["joe"])
}
```

[Run in playground](<https://play.golang.org/p/iVal_ll7iN7 >)

The output of the above program is

```
Salary of joe is 0
```

The above program returns the salary of joe as `0`. There will be no runtime error when we try to retrieve the value for a key that is not present in the map.

### Checking if a key exists

In the above section we learned that when a key is not present, the zero value of the type will be returned. This doesn't help when we want to find out whether the key actually exists in the map.

For example, we want to know whether an key is present in the `employeeSalary` map.

```go
value, ok := map[key]
```

The above is the syntax to find out whether a particular key is present in a map. If `ok` is true, then the key is present and its value is present in the variable `value`, else the key is absent.

```go
package main

import (
    "fmt"
)

func main() {
    employeeSalary := map[string]int{
        "steve": 12000,
        "jamie": 15000,
    }
    newEmp := "joe"
    value, ok := employeeSalary[newEmp]
    if ok == true {
        fmt.Println("Salary of", newEmp, "is", value)
        return
    }
    fmt.Println(newEmp, "not found")

}
```

[Run in playground](https://play.golang.org/p/Y4n1p4yfdVi)

In the above program, in line no. 13, `ok` will be false since `joe` is not present. Hence the program will print,

```
joe not found
```

### Iterate over all elements in a map

The `range` form of the `for` loop is used to iterate over all elements of a map.

```go
package main

import (
    "fmt"
)

func main() {
    employeeSalary := map[string]int{
        "steve": 12000,
        "jamie": 15000,
        "mike":  9000,
    }
    fmt.Println("Contents of the map")
    for key, value := range employeeSalary {
        fmt.Printf("employeeSalary[%s] = %d\n", key, value)
    }

}
```

[Run in playground](<https://play.golang.org/p/rz8U_g2slb0 >)

The above program outputs,

```
Contents of the map
employeeSalary[mike] = 9000
employeeSalary[steve] = 12000
employeeSalary[jamie] = 15000
```

_One important fact is that the order of the retrieval of values from a map when using `for range` is not guaranteed to be the same for each execution of the program. It is also not the same as the order in which the elements were added to the map_

### Deleting items from a map

_[delete\(map, key\)](https://golang.org/pkg/builtin/#delete)_ is the syntax to delete `key` from a `map`. The delete [function](/functions) does not return any value.

```go
package main

import (
    "fmt"
)

func main() {
    employeeSalary := map[string]int{
        "steve": 12000,
        "jamie": 15000,
        "mike": 9000,
    }
    fmt.Println("map before deletion", employeeSalary)
    delete(employeeSalary, "steve")
    fmt.Println("map after deletion", employeeSalary)

}
```

[Run in playground](<https://play.golang.org/p/u0WCB-Ta_dB >)

The above program deletes the key `steve` and it prints

```
map before deletion map[steve:12000 jamie:15000 mike:9000]
map after deletion map[mike:9000 jamie:15000]
```

If we try to delete a key that is not present in the map, there will be no runtime error.

### Map of structs

So far we have only been storing the salary of the employee in the map. Wouldn't it be nice if we are able to store the country of each employee in the map too\? This can be achieved by using a map of [structs](/structs). The employee can be represented as a struct containing fields salary and country and they will be stored in the map with a string key and struct value. Let's write a program to understand how this can be done.

```go
package main

import (
    "fmt"
)

type employee struct {
    salary  int
    country string
}

func main() {
    emp1 := employee{
        salary:  12000,
        country: "USA",
    }
    emp2 := employee{
        salary:  14000,
        country: "Canada",
    }
    emp3 := employee{
        salary:  13000,
        country: "India",
    }
    employeeInfo := map[string]employee{
        "Steve": emp1,
        "Jamie": emp2,
        "Mike":  emp3,
    }

    for name, info := range employeeInfo {
        fmt.Printf("Employee: %s Salary:$%d  Country: %s\n", name, info.salary, info.country)
    }

}
```

[Run in playground](<https://play.golang.org/p/wbGhkyZld1a >)

In the above program, `employee` struct contains fields `salary` and `country`. We create three employees `emp1`, `emp2` and `emp3`.

In line no. 25, we initialize a map with key type `string` and value type `employee` with the three employees we created.

The map is iterated in line no. 31 and the employee details are printed in the next line. This program will print,

```
Employee: Mike Salary:$13000  Country: India
Employee: Steve Salary:$12000  Country: USA
Employee: Jamie Salary:$14000  Country: Canada
```

### Length of the map

Length of the map can be determined using the [len](https://golang.org/pkg/builtin/#len) function.

```go
package main

import (
    "fmt"
)

func main() {
    employeeSalary := map[string]int{
        "steve": 12000,
        "jamie": 15000,
    }
    fmt.Println("length is", len(employeeSalary))

}
```

[Run in playground](<https://play.golang.org/p/vDxsqn6g-0p >)

_len\(employeeSalary\)_ in the above program returns the length of the map. The above program prints,

```
length is 2
```

### Maps are reference types

Similar to [slices](https://golangbot.com/arrays-and-slices/), maps are reference types. When a map is assigned to a new variable, they both point to the same internal data structure. Hence changes made in one will reflect in the other.

```go
package main

import (
    "fmt"
)

func main() {
    employeeSalary := map[string]int{
        "steve": 12000,
        "jamie": 15000,
        "mike": 9000,
    }
    fmt.Println("Original employee salary", employeeSalary)
    modified := employeeSalary
    modified["mike"] = 18000
    fmt.Println("Employee salary changed", employeeSalary)

}
```

[Run in playground](<https://play.golang.org/p/hWouI1KvEb_i >)

In line no. 14 of the above program, `employeeSalary` is assigned to `modified`. In the next line, the salary of `mike` is changed to `18000` in the `modified` map. Mike's salary will now be `18000` in `employeeSalary` too. The program outputs,

```
Original employee salary map[jamie:15000 mike:9000 steve:12000]
Employee salary changed map[jamie:15000 mike:18000 steve:12000]
```

Similar is the case when maps are passed as parameters to functions. When any change is made to the map inside the function, it will be visible to the caller also.

### Maps equality

Maps can't be compared using the `==` operator. The `==` can be only used to check if a map is `nil`.

```go
package main

func main() {
    map1 := map[string]int{
        "one": 1,
        "two": 2,
    }

    map2 := map1

    if map1 == map2 {
    }
}
```

[Run in playground](<https://play.golang.org/p/MALqDyWkcT >)

The above program will fail to compile with error

```
invalid operation: map1 == map2 (map can only be compared to nil)
```

One way to check whether two maps are equal is to compare each one's individual elements one by one. The other way is using [reflection](https://golangbot.com/reflection/). I would encourage you to write a program for this and make it work :\).

I have compiled all the concepts we have discussed in a single program. You can download it from [github](https://github.com/golangbot/maps).

This brings us to the end of this tutorial. Hope you enjoyed it. Please leave your comments.

**Next tutorial \- [Strings](https://golangbot.com/strings/)**

Like my tutorials\? Please show your support by [donating](https://golangbot.com/support-the-content/). Your donations will help me create more awesome tutorials.

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

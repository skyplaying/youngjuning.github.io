---
title: Packages
tags: [掘金专栏]
order: 7
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文翻译自 [Golang tutorial series](https://golangbot.com/learn-golang-series/)
>
> 本文同步于公众号洛竹早茶馆，转载请联系作者。

## What are packages and why are they used?

So far we have seen Go programs that have only one file with a main [function](https://golangbot.com/functions/) and a couple of other functions. In real-world scenarios, this approach of writing all source code in a single file is not scalable. It becomes impossible to reuse and maintain code written this way. This is where packages are helpful.

**Packages are used to organize Go source code for better reusability and readability. Packages are a collection of Go sources files that reside in the same directory. Packages provide code compartmentalization and hence it becomes easy to maintain Go projects.**

For example, let's say we are writing a finance application in Go and some of the functionalities are simple interest calculation, compound interest calculation and loan calculation. One simple way to organize this application is by functionality. We can create packages `simpleinterest`, `compoundinterest` and `loan`. If the `loan` package needs to calculate the simple interest, it can simply do so by importing the `simpleinterest` package. This way the code is reused.

We will learn packages by creating a simple application to determine the simple interest given principal, interest rate and the time duration in years.

## main function and main package

Every executable Go application must contain the main function. This function is the entry point for execution. The main function should reside in the main package.

**`package packagename` specifies that a particular source file belongs to package `packagename`. This should be the first line of every go source file.**

Let's get started by creating the main function and main package for our application.

Run the command below to create a directory named `learnpackage` inside the current user's `Documents` directory.

```
mkdir ~/Documents/learnpackage/
```

Create a file named `main.go` inside our `learnpackage` directory with the following contents.

```go
package main

import "fmt"

func main() {
    fmt.Println("Simple interest calculation")
}
```

The line of code `package main` specifies that this file belongs to the main package. The `import "packagename"` statement is used to import an existing package. `packagename.FunctionName()` is the syntax to call a function in a package.

In line no. 3, we import the `fmt` package to use the `Println` function. The `fmt` is a standard package and is available inbuilt as a part of the Go standard library. Then there is the main function which prints `Simple interest calculation`

Compile the above program by moving to the `learnpackage` directory using

```sh
cd ~/Documents/learnpackage/
```

and typing the following command

```sh
go install
```

If all went well, our binary will be compiled and will be ready for execution. Type the command `learnpackage` in the terminal and you will see the following output.

```sh
Simple interest calculation
```

If you don't understand how `go install` works or if you get the error

```sh
go install: no install location for directory /home/naveen/Documents/learnpackage outside GOPATH
For more details see: 'go help gopath'
```

please visit <https://golangbot.com/hello-world-gomod/> to know more.

## Go Module

We will structure the code in such a way that all functionalities related to simple interest are in `simpleinterest` package. To do that we need to create a custom package `simpleinterest` which will contain the function to calculate the simple interest. Before creating custom packages, we need to understand **[Go Modules](https://golangbot.com/books/)** first, since **Go Modules** are needed to create custom packages.

**A Go Module is nothing but a collection of Go packages.** Now this question might come to your mind. Why do we need Go modules to create a custom package\? The answer is **the import path for the custom package we create is derived from the name of the go module**. In addition to this, all the other third-party packages\(such as source code from github\) which our application uses will be present in the `go.mod` file along with the version. This `go.mod` file is created when we create a new module. You will understand this better in the next section.

Another question might popup in our minds. How come we got away without creating a [Go module](https://golangbot.com/books/) till now\? The answer is, we never created our own custom package till now in this [tutorial series](https://golangbot.com/learn-golang-series/) and hence no Go module was needed.

Enough of theory :\). Let's get into action and create our go module and custom package.

## Creating a Go module

Make sure you are inside the directory `learnpackage` by typing `cd ~/Documents/learnpackage/`. Inside this directory run the following command to create a go module named _learnpackage_.

```sh
go mod init learnpackage
```

The above command will create a file named `go.mod`. The following will be the contents of the file.

```sh
module learnpackage

go 1.13
```

The line `module learnpackage` specifies that the module's name is `learnpackage`. As we mentioned earlier, `learnpackage` will be the base path to import any package created inside this module. The line `go 1.13` specifies that the files in this module use go version `1.13`.

## Create the simple interest custom package

**Source files belonging to a package should be placed in separate folders of their own. It is a convention in Go to name this folder with the same name as the package.**

Let's create a folder named `simpleinterest` inside the `learnpackage` folder. `mkdir simpleinterest` will create this folder for us.

All files inside the _simpleinterest_ folder should start with the line `package simpleinterest` as they all belong to the `simpleinterest` package.

Create a file `simpleinterest.go` inside the _simpleinterest_ folder.

The following will be the directory structure of our application.

```
├── learnpackage
│   ├── go.mod
│   ├── main.go
│   └── simpleinterest
│       └── simpleinterest.go
```

Add the following code to the `simpleinterest.go` file.

```go
package simpleinterest

//Calculate calculates and returns the simple interest for a principal p, rate of interest r for time duration t years
func Calculate(p float64, r float64, t float64) float64 {
    interest := p * (r / 100) * t
    return interest
}
```

In the above code, we have created a function `Calculate` which calculates and returns the simple interest. This function is self-explanatory. It calculates and returns the simple interest.

_Note that the function name **Calculate** starts with caps. This is essential and we will explain shortly why this is needed._

## Importing custom package

To use a custom package we must import it first. The import path is the name of the module appended by the subdirectory of the package and the package name. In our case the module name is `learnpackage` and the package `simpleinterest` is in the `simpleinterest` folder directly under `learnpackage`

```
├── learnpackage
│   └── simpleinterest
```

So the line `import "learnpackage/simpleinterest"` will import the _simpleinterest_ package.

In case we have a directory structure like this

```
learnpackage
│   └── finance
│       └── simpleinterest
```

then the import statement would be `import "learnpackage/finance/simpleinterest"`

Add the following code to `main.go`

```go
package main

import (
    "fmt"
    "learnpackage/simpleinterest"
)

func main() {
    fmt.Println("Simple interest calculation")
    p := 5000.0
    r := 10.0
    t := 1.0
    si := simpleinterest.Calculate(p, r, t)
    fmt.Println("Simple interest is", si)
}
```

The above code imports the `simpleinterest` package and uses the `Calculate` function to find the simple interest. Packages in the standard library don't need the module name prefix and hence "fmt" works without the module prefix. When the application is run, the output will be

```
Simple interest calculation
Simple interest is 500
```

## A bit more on go install

Now that we understand how packages work, it's time to talk a little bit more about `go install`. Go tools like `go install` work in the context of the current directory. Let's understand what that means. Till now we have been running `go install` from the directory `~/Documents/learnpackage/`. If we try to run it from any other directory, it will fail.

Try cding into `cd ~/Documents/` and then running `go install learnpackage`. It will fail with the following error.

```
can't load package: package learnpackage: cannot find package "learnpackage" in any of:
    /usr/local/Cellar/go/1.13.7/libexec/src/learnpackage (from $GOROOT)
    /Users/nramanathan/go/src/learnpackage (from $GOPATH)
```

Let's understand the reason behind this error. `go install` takes an optional package name as a parameter\(in our case the package name is `learnpackage`\) and it tries to compile the main function if the package exists in the current directory from which it is run or in the parent directory or it's parent directory and so on.

We are in `Documents` directory and there is no `go.mod` file there and hence `go install` complains that it cannot find the package `learnpackage`.

When we move to `~/Documents/learnpackage/`, there is a `go.mod` file there and our module name is `learnpackage` in that `go.mod` file.

so `go install learnpackage` will work from inside the `~/Documents/learnpackage/` directory.

But so far we have just been using `go install` and we did not specify the package name. If no package name is specified, `go install` will default to the module name in the current working directory. That's why when `go install` is run without any package name from `~/Documents/learnpackage/` it worked. So the following 3 commands are equivalent when run from `~/Documents/learnpackage/`

```
go install

go install .

go install learnpackage
```

I also mentioned that `go install` has the ability to recursively search the parent directory for a go.mod file. Let's check whether that works.

```
cd ~/Documents/learnpackage/simpleinterest/
```

The above command will take us to the `simpleinterest` directory. From that directory run

```undefined
go install learnpackage
```

Go install will successfully find a `go.mod file` in the parent directory `learnpackage` that has the module `learnpackage` defined and hence it works :\).

## Exported Names

We capitalized the function `Calculate` in the Simple interest package. This has a special meaning in Go. Any [variable](https://golangbot.com/variables/) or function which starts with a capital letter are exported names in go. Only exported functions and variables can be accessed from other packages. In our case, we want to access `Calculate` function from the main package. Hence this is capitalized.

If the function name is changed from `Calculate` to `calculate` in `simpleinterest.go`, and if we try to call the function using `simpleinterest.calculate(p, r, t)` in main.go, the compiler will error

```
# learnpackage
./main.go:13:8: cannot refer to unexported name simpleinterest.calculate
./main.go:13:8: undefined: simpleinterest.calculate
```

Hence if you want to access a function outside of a package, it should be capitalized.

## init function

Each package in Go can contain an `init` function. The `init` function must not have any return type and it must not have any parameters. The init function cannot be called explicitly in our source code. It will be called automatically when the package is initialized. The init function has the following syntax

```go
func init() {
}
```

The `init` function can be used to perform initialization tasks and can also be used to verify the correctness of the program before the execution starts.

The order of initialization of a package is as follows

1.  Package level variables are initialised first
2.  init function is called next. A package can have multiple init functions \(either in a single file or distributed across multiple files\) and they are called in the order in which they are presented to the compiler.

If a package imports other packages, the imported packages are initialized first.

A package will be initialized only once even if it is imported from multiple packages.

Let's make some modifications to our application to understand `init` functions.

To start with let's add the `init` function to the `simpleinterest.go` file.

```go
package simpleinterest

import "fmt"

/*
 * init function added
 */
func init() {
    fmt.Println("Simple interest package initialized")
}
//Calculate calculates and returns the simple interest for principal p, rate of interest r for time duration t years
func Calculate(p float64, r float64, t float64) float64 {
    interest := p * (r / 100) * t
    return interest
}
```

We have added a simple init function which just prints `Simple interest package initialised`

Now let's modify the main package. We know that the principal, rate of interest and time duration should be greater than zero when calculating simple interest. We will define this check using init function and package level variables in the `main.go` file.

Modify the `main.go` to the following,

```go
package main

import (
    "fmt"
    "learnpackage/simpleinterest" //importing custom package
    "log"
)
var p, r, t = 5000.0, 10.0, 1.0

/*
* init function to check if p, r and t are greater than zero
 */
func init() {
    println("Main package initialized")
    if p < 0 {
        log.Fatal("Principal is less than zero")
    }
    if r < 0 {
        log.Fatal("Rate of interest is less than zero")
    }
    if t < 0 {
        log.Fatal("Duration is less than zero")
    }
}

func main() {
    fmt.Println("Simple interest calculation")
    si := simpleinterest.Calculate(p, r, t)
    fmt.Println("Simple interest is", si)
}
```

The following are the changes made to `main.go`

1.  **p**, **r** and **t** variables are moved to package level from the main function level.
2.  An init function has been added. The _init_ function prints a log and terminates the program execution if either the principal, rate of interest or time duration is less than zero using **log.Fatal** function.

The order of initialisation of the is as follows,

1.  The imported packages are initialized first. Hence **simpleinterest** package is initialized first and it's init method is called.
2.  Package level variables **p**, **r** and **t** are initialized next.
3.  **init** function is called in main.
4.  **main** function is called at last.

If you run the program, you will get the following output.

```
Simple interest package initialized
Main package initialized
Simple interest calculation
Simple interest is 500
```

As expected the init function of the `simpleinterest` package is called first followed by the initialization of the package level variables `p`, `r` and `t`. The init function of the main package is called next. It checks whether `p`, `r` and `t` are lesser than zero and terminates if the condition is true. We will learn about `if` statement in detail in a [separate tutorial](https://golangbot.com/if-statement/). For now you can assume that `if p < 0` will check whether `p` is less than 0 and if it is, the program will be terminated. We have written a similar condition for `r` and `t`. In this case, all these conditions are false and the program execution continues. Finally, the main function is called.

Let's modify this program a bit to learn the use of the init function.

Change the line

```go
var p, r, t = 5000.0, 10.0, 1.0
```

in `main.go` to

```go
var p, r, t = -5000.0, 10.0, 1.0
```

We have initialised `p` to negative.

Now if you run the application, you will see

```
Simple interest package initialized
Main package initialized
2020/02/15 21:25:12 Principal is less than zero
```

_p_ is negative. Hence when the init function runs, the program terminates after printing `Principal is less than zero`.

## Use of blank identifier

It is illegal in Go to import a package and not to use it anywhere in the code. The compiler will complain if you do so. The reason for this is to avoid bloating of unused packages which will significantly increase the compilation time. Replace the code in `main.go` with the following,

```go
package main

import (
  "learnpackage/simpleinterest"
)

func main() {

}
```

The above program will error

```
# learnpackage
./main.go:4:2: imported and not used: "learnpackage/simpleinterest"
```

But it is quite common to import packages when the application is under active development and use them somewhere in the code later if not now. The `_` blank identifier saves us in those situations.

The error in the above program can be silenced by the following code,

```go
package main

import (
  "learnpackage/simpleinterest"
)

var _ = simpleinterest.Calculate

func main() {

}
```

The line `var _ = simpleinterest.Calculate` mutes the error. We should keep track of these kinds of error silencers and remove them including the imported package at the end of application development if the package is not used. Hence it is recommended to write error silencers in the package level just after the import statement.

Sometimes we need to import a package just to make sure the initialization takes place even though we do not need to use any function or variable from the package. For example, we might need to ensure that the `init` function of the `simpleinterest` package is called even though we plan not to use that package anywhere in our code. The \_ blank identifier can be used in this case too as shown below.

```go
package main

import (
    _ "learnpackage/simpleinterest"
)

func main() {

}
```

Running the above program will output `Simple interest package initialized`. We have successfully initialized the `simpleinterest` package even though it is not used anywhere in the code.

That's it for packages. Hope you enjoyed reading. Please leave your valuable comments and feedback.

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

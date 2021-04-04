---
title: Go 插件每日推荐之 go-version
cover: https://i.loli.net/2021/04/04/DUm6QFzEtTjnRcY.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

> 一个用于解析和验证版本和版本约束的 Go (golang) 库。

go-version 是一个用于解析版本和版本约束的库，并根据一组约束来验证版本。go-version 可以对版本集合进行正确的排序，处理预 prerelease/beta 版本，可以递增版本等。

与 go-version 一起使用的版本必须遵循 [SemVer](http://semver.org/)。

## 安装

可以在 [GoDoc](http://godoc.org/github.com/hashicorp/go-version) 上查看包文档。

可以使用 `go get` 完成安装：

```sh
$ go get github.com/hashicorp/go-version
```

## Version Parsing and Comparison

```go
v1, err := version.NewVersion("1.2")
v2, err := version.NewVersion("1.5+metadata")

// 比较的例子。还有 GreaterThan、Equal 以及允许简单地使用 `>=`、`<=` 进行比较并返回 int 值的方法
if v1.LessThan(v2) {
    fmt.Printf("%s is less than %s", v1, v2)
}
```

## 版本约束

```go
v1, err := version.NewVersion("1.2")

// 约束例子
constraints, err := version.NewConstraint(">= 1.0, < 1.4")
if constraints.Check(v1) {
	fmt.Printf("%s satisfies constraints %s", v1, constraints)
}
```

## 版版排序

```go
versionsRaw := []string{"1.1", "0.7.1", "1.4-beta", "1.4", "2"}
versions := make([]*version.Version, len(versionsRaw))
for i, raw := range versionsRaw {
    v, _ := version.NewVersion(raw)
    versions[i] = v
}

// 一顿操作之后，版本被很好地排了序
sort.Sort(version.Collection(versions))
```

## Issues and Contributing

如果你发现这个库有问题，请报告问题。如果你愿意，我们欢迎任何贡献。Fork 这个库并提交一个 pull request。

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

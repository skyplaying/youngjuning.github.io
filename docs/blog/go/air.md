---
title: Go 插件每日推荐之 air
cover: https://i.loli.net/2021/04/05/aUJGz59VTSKgkiI.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

## 动机

当我开始用 Go 和 [gin](https://github.com/gin-gonic/gin) 框架开发网站的时候，可惜 gin 没有实时重载功能。其实，我试过 [fresh](https://github.com/pilu/fresh)，它似乎并不怎么灵活，所以我打算用更好的方式重写它。终于，Air 的诞生了。另外，非常感谢 [pilu](https://github.com/pilu)，没有 fresh，就没有 Air。

Air 是又一个用于 Go 应用开发中的实时重装命令行工具。只要在你的项目根目录下添加 `air`，不要管它，专注于你的代码。

注意：此工具与生产中的热部署无关。

## 特性

- 丰富多彩的日志输出
- 自定义构建或二进制命令
- 支持忽略子目录
- 允许在 Air 启动后观察新目录
- 更好的构建过程

## 安装

### Go

经典的安装方式：

```bash
go get -u github.com/cosmtrek/air
```

### macOS, Linux, Windows

```bash
# binary will be $(go env GOPATH)/bin/air
curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin

# or install it into ./bin/
curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s

air -v
```

### Docker

请拉取这个 [cosmtrek/air](https://hub.docker.com/r/cosmtrek/air) docker 镜像：

```bash
docker run -it --rm \
    -w "<PROJECT>" \
    -e "air_wd=<PROJECT>" \
    -v $(pwd):<PROJECT> \
    -p <PORT>:<APP SERVER PORT> \
    cosmtrek/air
    -c <CONF>
```

例如，我的一个在 docker 中运行的项目。

```bash
docker run -it --rm \
    -w "/go/src/github.com/cosmtrek/hub" \
    -v $(pwd):/go/src/github.com/cosmtrek/hub \
    -p 9090:9090 \
    cosmtrek/air
```

## 使用

为了减少输入，你可以在你的 `.bashrc` 或 `.zshrc` 中添加 `alias air='~/.air'`。首先在你的项目中输入

```bash
cd /path/to/your_project
```

最贱的方式是运行

```bash
# firstly find `.air.toml` in current directory, if not found, use defaults
air -c .air.toml
```

我更喜欢第二种方式：

```bash
# 1. 创建新的文件
touch .air.toml

# 2. 复制 `air_example.toml` 到这个文件, 并按照你的需求修改。

# 3. 运行 `air`
air
```

### 调试

`air -d` 会打印所有的日志。

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

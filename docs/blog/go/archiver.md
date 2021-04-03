---
title: Go 插件每日推荐之 archiver
cover: https://i.loli.net/2021/04/04/trsfjmS2HXDlzWg.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

## 简介

跨平台、多格式的实用 Go 归档库。该库功能强大且灵活的，可以轻松创建和提取档案，以及压缩和解压缩各种格式的文件。

## 特性

打包存档器使制作和提取常见的存档格式（例如 tarball（及其压缩的变体）和 zip）变得非常容易。只需命名输入和输出文件即可。`arc` 命令在所有平台上都可以运行，并且没有外部依赖关系（甚至没有 libc）。 它由 Go 标准库和几个第三方的纯 Go 库提供支持。

文件被放入存档的根目录； 递归添加目录，保留结构。

- 从文件列表制作整个档案
- 将整个档案打开到一个文件夹中
- 从归档中提取特定文件或文件夹
- 无需存档磁盘上的实际文件即可将文件流进出存档
- 遍历存档内容而不加载它们
- 压缩文件
- 解压缩文件
- 流压缩和解压缩
- 支持多种存档和压缩格式

### 格式相关功能

- Gzip 是多线程的 -（ 可选）创建顶层文件夹，以避免乱码目录或包含文件的归档根目录
- 切换覆盖现有文件
- 调整压缩等级
- Zip：存储（而非压缩）已压缩的文件
- 制作所有必要的目录
- 打开受密码保护的 RAR 存档
- 可以选择在发生错误后继续处理其他文件

### 支持的压缩格式

- brotli (br)
- bzip2 (bz2)
- flate (zip)
- gzip (gz)
- lz4
- snappy (sz)
- xz
- zstandard (zstd)

### 支持的存档格式

- .zip
- .tar (包括任何压缩的变体，例如 .tar.gz)
- .rar (只读)

可以选择使用上述任何一种压缩格式来压缩 Tar 文件。

## 安装

### 使用 webi

[`webi`](https://webinstall.dev/arc) 将安装 `webi` 并且 `arc` 到 `~/.local/bin/`，然后更新你的`PATH`.

#### Mac, Linux, Raspberry Pi

```bash
curl -fsS https://webinstall.dev/arc | bash
```

#### Windows 10

```pwsh
curl.exe -fsS -A MS https://webinstall.dev/arc | powershell
```

### 使用 Go

安装可运行的脚本到 `$GOPATH/bin`：

```bash
go get github.com/mholt/archiver/cmd/arc
```

## 作为库使用

使用 Archiver 包，你可以轻松地创建和打开档案，浏览其内容，提取特定文件，压缩和解压缩文件，甚至使用纯 `io.Reader` 和 `io.Writer` 接口流读写档案，而无需接触磁盘 。

用作项目中的依赖项：

```bash
go get github.com/mholt/archiver/v3
```

```go
import "github.com/mholt/archiver/v3"
```

例如，创建或者解压缩一个归档文件：

```go
err := archiver.Archive([]string{"testdata", "other/file.txt"}, "test.zip")
// ...
err = archiver.Unarchive("test.tar.gz", "test")
```

存档格式由文件扩展名确定。此包中有 [几个函数](https://pkg.go.dev/github.com/mholt/archiver?tab=doc)，它们通过从文件扩展名或文件头中推断格式来执行任务，包括 `Archive()`、`Unarchive()`、`CompressFile()` 和 `DecompressFile()`。

要配置使用或执行的存档器，请创建格式类型的实例：

```go
z := archiver.Zip{
	CompressionLevel:       flate.DefaultCompression,
	MkdirAll:               true,
	SelectiveCompression:   true,
	ContinueOnError:        false,
	OverwriteExisting:      false,
	ImplicitTopLevelFolder: false,
}

err := z.Archive([]string{"testdata", "other/file.txt"}, "/Users/matt/Desktop/test.zip")
```

检查归档文件:

```go
err = z.Walk("/Users/matt/Desktop/test.zip", func(f archiver.File) error {
	zfh, ok := f.Header.(zip.FileHeader)
	if ok {
		fmt.Println("Filename:", zfh.Name)
	}
	return nil
})
```

将文件流式传输到正在写入 HTT P 响应的存档中：

```go
err = z.Create(responseWriter)
if err != nil {
	return err
}
defer z.Close()

for _, fname := range filenames {
	info, err := os.Stat(fname)
	if err != nil {
		return err
	}

  // 获取归档文件内部的文件的文件名
	internalName, err := archiver.NameInArchive(info, fname, fname)
	if err != nil {
		return err
	}

	// 打开一个文件
	file, err := os.Open(f)
	if err != nil {
		return err
	}

  // 写入归档
	err = z.Write(archiver.File{
		FileInfo: archiver.FileInfo{
			FileInfo:   info,
			CustomName: internalName,
		},
		ReadCloser: file,
	})
	file.Close()
	if err != nil {
		return err
	}
}
```

使用 `archiver.File` 类型，你可以将实际文件与存档一起使用，或者在只有流的情况下模仿文件。

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

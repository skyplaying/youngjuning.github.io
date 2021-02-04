---
title: 基于 Go 实现 Deno upgrade
cover: https://i.loli.net/2021/02/03/h9bMeX3w2ZBYNoQ.png
---

书接上篇，我在[向 Deno 学习优秀的脚本管理](https://juejin.cn/post/6924465443704930318)中向大家介绍了 Deno 是如何管理它的安装包的——以 Github release 的形式发布、执行编写好的 shell 脚本安装程序以及基于 tags 的版本管理。有版本管理就会有更新的需求，本文就是在研读了 Deno 的 `upgrade` 命令后使用 Go 语言实现了自己的 upgrade 命令。

## 获取最新版本

我们先来看下 Deno 的源码：

```rust
use deno_runtime::deno_fetch::reqwest::Client;
const RELEASE_URL: &str = "https://github.com/denoland/deno/releases";
...
async fn get_latest_release_version(
  client: &Client,
) -> Result<String, AnyError> {
  println!("Looking up latest version");

  let res = client
    .get(&format!("{}/latest", RELEASE_URL))
    .send()
    .await?;
  let version = res.url().path_segments().unwrap().last().unwrap();

  Ok(version.replace("v", ""))
}
```

分析出以上代码做了以下几件事：

1. 由于是异步函数，用 `println` 函数提示正在查找新版本
2. 使用 `GET` 方式请求 `https://github.com/denoland/deno/releases/latest`
3. 由于 `https://github.com/denoland/deno/releases/latest` 会重定向到最新的 release `https://github.com/denoland/deno/releases/tag/v1.7.1`，通过一顿字符串操作我们便取出了 `v1.7.1`
4. 调用字符串的 `replace` 方法替换 `v` 为 `""` 得到版本号

让我们用 Go 来实现它：

> 代码看起来差不多，比如模板字符串写法、字符串处理；不太一样的是 Go 特有的异常处理

```go
package release

import (
	"net/http"
	"strings"
)

func getLatestVersion() string{
	releaseURL := fmt.Sprintf("https://github.com/%s/%s/releases/latest", user, repo)
	resp, _ := http.Get(releaseURL)
	defer resp.Body.Close() // 为了防止内存泄漏

	pathArr := strings.Split(resp.Request.URL.Path, "/")
	latest := strings.Replace(pathArr[len(pathArr)-1], "v", "", 1)
	return latest
}
```

## 版本检测

版本的处理少不了[SemVer](https://semver.org/)。我们使用 [go-version](https://github.com/hashicorp/go-version) 来处理版本相关工作，有了版本比较我们便可以实现一个版本检查的功能。以下代码是 我封装的 [go-release](https://github.com/youngjuning/go-release) 中的一段代码：

```go
type UpdateInfo struct {
	IsUpdate      bool
	LatestVersion string
}

func CheckUpdate(user string, repo string, current string) (updateInfo *UpdateInfo, err error) {
	releaseURL := fmt.Sprintf("https://github.com/%s/%s/releases/latest", user, repo)
	resp, err := http.Get(releaseURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	current = strings.Replace(current, "v", "", 1)
	pathArr := strings.Split(resp.Request.URL.Path, "/")
	latest := strings.Replace(pathArr[len(pathArr)-1], "v", "", 1)

	currentVersion, err := version.NewVersion(current)
	if err != nil {
		return nil, err
	}
	latestVersion, err := version.NewVersion(latest)
	if err != nil {
		return nil, err
	}
	updateInfo = &UpdateInfo{
		IsUpdate:      currentVersion.LessThan(latestVersion),
		LatestVersion: latest,
	}
	return updateInfo, nil
}
```

## cobra 实现 upgrade

下面的代码中，我们基于 [go-release](https://github.com/youngjuning/go-release) 实现了一个带 `upgrade` 命令的简易 CLI，核心逻辑便是比较本地版本是否是最新的，如果不是则安装最新的。

```go
const Version = "0.0.1"

func checkUpgrade(current string) {
  fmt.Println("Looking up latest version")
	update, err := release.CheckUpdate("youngjuning", "tpc", current)
	if err != nil {
		panic(err)
	}
	if update.IsUpdate {
		fmt.Printf("Found latest version %v \n", update.LatestVersion)
		sh.Command("bash", "-c", "curl -fsSL https://raw.githubusercontent.com/youngjuning/tpc/main/install.sh | sh").Run()
	} else {
		fmt.Printf("Local version %v is the most recent release \n", current)
	}
}

var rootCmd = &cobra.Command{
	Use:     "app",
	Version: Version,
}

var cmdUpgrade = &cobra.Command{
	Use: "upgrade",
	Run: func(cmd *cobra.Command, args []string) {
		checkUpgrade(Version, force)
	},
}

func main() {
	rootCmd.AddCommand(cmdUpgrade)
	rootCmd.Execute()
}
```

## 强制更新方案

[Node.js 命令行工具检查更新的正确姿势](https://kohpoll.github.io/blog/2017/06/06/the-right-way-to-do-update-check-in-cli-tool/) 对这个问题做了很深入的研究并实现了 Node 版的工具。核心逻辑就是每次执行命令时异步去执行检查更新。这句话翻译成 Go 就是用协程去执行检查更新的动作，这样执行命令还是会立马得到反馈，程序则会在后台执行检查更新，当检测到有新版本则强制更新。

> 完整代码在[go-release/example](https://github.com/youngjuning/go-release/tree/main/example)，对 Cobra 不熟悉的同学可以看一下 [Cobra 中文文档](https://juejin.cn/post/6924541628031959047)。

> 执行 shell 命令推荐 [go-sh](https://github.com/codeskyblue/go-sh)，它对 exec 包做了封装，提供了更好地使用体验（ PS：还不是因为我菜）

```go
// rootCmd 代表没有调用子命令时的基础命令
var rootCmd = &cobra.Command{
	Use:     "tpc",
	Version: Version,
	Run: func(cmd *cobra.Command, args []string) {
		sh.Command("tpc", "-h").Run()
  },
  // 每次执行完命令后去执行检查更新，Start 表示不阻塞原来的任务，还有一个 Run 方法则是会阻塞
	PersistentPostRun: func(cmd *cobra.Command, args []string) {
		sh.Command("bash", "-c", "tpc upgrade --force=false").Start()
	},
}
```

## go-release 的诞生

> [go-release](https://github.com/youngjuning/go-release) 核心代码翻译自 Deno 的 `upgrade`，开源项目，点赞是我维护的动力，在此求个 Star。

go-release 的诞生源自我工作中要实现一个 CLI 工具的版本管理功能，由于是个菜鸟，中间遇到了各种各样的困难，幸得大佬无私地解答，才能很快实现了这么一个功能，在此鸣谢：

[林小帅](https://juejin.cn/user/3175045313873943)：

![](https://i.loli.net/2021/02/04/TdKuPXU9Acns5pa.jpg)

[漫画 Go 语言 纯手绘版](https://juejin.cn/book/6844733833401597966) 作者好家伙：

![](https://i.loli.net/2021/02/04/Uf8OFhmSJxqEpzH.jpg)

[justjavac](https://juejin.cn/user/3526889000941592) 大佬：

![](https://i.loli.net/2021/02/04/RJ48jV6hSGyDuMi.jpg)

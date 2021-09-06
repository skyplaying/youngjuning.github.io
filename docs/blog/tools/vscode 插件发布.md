---
title: vscode 插件发布
cover: https://cdn.jsdelivr.net/gh/youngjuning/images/20210812204938.jpeg
tags: [洛竹早茶馆]
---

> 大家好，我是[洛竹](https://github.com/youngjuning)🎋，一只住在杭城的木系前端 🧚🏻‍♀️，如果你喜欢我的文章 📚，可以通过点赞帮我聚集灵力 ⭐️。

## 安装发布工具

[vsce](https://github.com/Microsoft/vsce) 是一个用于将插件发布到[市场](https://code.visualstudio.com/docs/editor/extension-gallery)上的命令行工具。

```sh
$ npm install vsce -g
```

## 获取 Personal Access Token

### 新建 Azure DevPos 组织

1. 登录 [Azure DevOps](https://azure.microsoft.com/zh-cn/services/devops/)。
2. 点击 **New organization**。

![](https://cdn.jsdelivr.net/gh/youngjuning/images/20210812201149.png)

3. 确认信息，然后选择 **Continue**。

![](https://cdn.jsdelivr.net/gh/youngjuning/images/20210812201210.png)

![](https://cdn.jsdelivr.net/gh/youngjuning/images/20210812201223.png)

到这里，一个组织就创建成功了，之后随时登录到你的组织<https://dev.azure.com/tuyaworks>。

## 获取 Personal Access Token

下面的例子里，我们假设组织名为 vscode，从你的组织主页（例如：https://dev.azure.com/tuyaworks ） 进入 Personal access tokens 页面：

![](https://cdn.jsdelivr.net/gh/youngjuning/images/20210812201259.png)

点击 **New Token** 创建一个新的 Personal Access Token：

![](https://cdn.jsdelivr.net/gh/youngjuning/images/20210812202141.png)

给 Personal Access Token 添加描述，过期时间等等，你最好把过期时间设置为 1 年，这样你接下就能方便很多，选择 **custom defined（用户自定义）** 范围，然后点击 **Show all scopes(显示全部)**，在这个列表中找到 Marketplace，并勾选 Acquire 和 Manage：

![](https://cdn.jsdelivr.net/gh/youngjuning/images/20210812202337.png)

点击 **Create**，你就会看到新创建的 Personal Access Token 了，复制好，你接下来就会用到这个 token 来创建一个发行方了。

![](https://cdn.jsdelivr.net/gh/youngjuning/images/20210812202402.png)

## 创建一个发行方

**发行方**是 VS Code 市场有权发布插件的唯一标识，每个插件的 package.json 文件都包含着 publisher 字段。
现在我们已经有了 Personal Access Token，我们马上可以通过 https://aka.ms/vscode-create-publisher 创建一个发行方。

## 发行方登录

如果你已经有发行方账号了：

```sh
$ vsce login (publisher name)
```

`vsce` 会记住这个 Personal Access Token，日后你需要再次使用的时候会自动带上。

你也可以用命令参数 `-p <token>` 直接登录然后立即发布插件：

```sh
$ vsce publish -p <token>
```

## 增量更新插件版本

用 SemVer 语义标识符：major，minor，patch 增量更新插件版本号。

例如，你想把插件从 1.0.0 更新到 1.1.0，那么加上 minor：

```sh
$ vsce publish minor
```

插件 _package.json_ 的 version 会先更新，然后才发布插件。

你也可以通过命令行指定版本号：

```sh
$ vsce publish 2.0.1
```

## 下架插件

通过指定插件 idpublisher.extension 下架插件：

```sh
$ vsce unpublish (publisher name).(extension name)
```

> 当你下架插件的时候，市场会移除所有插件的历史统计数据，请在下架前再三考虑，最好还是更新插件吧。

## 插件打包

你也可能只是想打包一下插件，而不是发布到商店里。用下列命令将插件打包到 `.vsix` 文件中：

```sh
$ vsce package
```

这个命令会在当前目录生成一个 .vsix 文件，直接从 .vsix 安装插件是允许的，查看[从 VSIX 安装插件](https://github.com/Microsoft/vscode-docs/blob/master/docs/editor/extension-gallery.md#install-from-a-vsix)了解更多内容。

## VS Code 版本兼容性

当你制作插件的时候，你需要描述插件对 VS Code 的版本兼容性——修改 _package.json_ 中的 engines.vscode：

```json
{
  "engines": {
    "vscode": "^1.8.0"
  }
}
```

1.8.0 表示你的插件只能兼容 1.8.0 版本的 VS Code，^1.8.0 则表示你的插件向上兼容，包括 1.8.1, 1.9.0 等等。

使用 `engines.vscode` 可以确保插件安装环境包含了插件依赖的 API。这个机制在稳定版和 Insider 版本都适用。

现在我们假设最新的稳定版 API 是 1.8.0，而 1.9.0 引入了新的 API，所以你可以用 1.9.0-insider 标识插件在 Insider 版中也可正常使用。 如果你想使用这些刚刚引入的 API，则将依赖版本设置为 ^1.9.0，你的插件则只能安装在 >=1.9.0 的 VS Code 上，也就意味着所有当前的 Insider 版本都可以用得上，而稳定版只有在更新到 1.9.0 才能使用你的插件。

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

> 本文首发于「[洛竹的官方网站](https://youngjuning.js.org/)」，同步于公众号「[洛竹早茶馆](https://cdn.jsdelivr.net/gh/youngjuning/images/20210418112129.jpeg)」和「[掘金专栏](https://juejin.cn/user/325111174662855)」。

---
title: 基于 Probot 实现 GitHub NPM 发布机器人🤖
cover:
tags: [掘金专栏]
---

> 怕什么真理无穷，进一寸有一寸的欢喜。大家好，我是[@洛竹](https://github.com/youngjuning)，一名热爱编程、热爱生活的终身学习实践者。

## 关于 Github Apps

GitHub Apps 是 GitHub 中优秀的产品。一个 GitHub App 以自己的名义行事，通过 API 直接使用自己的身份进行操作，这意味着你不需要作为一个单独的用户维护一个机器人或服务账户。

GitHub Apps 可以被直接安装到组织或者用户账号上，并且可以赋予它们访问指定仓库的权限。它们带有内置的 webhook 和狭窄的特定权限。设置 GitHub 应用程序时，可以选择希望它访问的仓库。比如你可以设置一个叫 `MyGitHub` 的应用程序，该应用程序有且仅有 `octocat` 仓库的写入 `issues` 的权限。安装 GitHub App 需要你是组织的所有者或对仓库拥有 admin 权限。

## 关于 Probot

Probot 是一个基于 Node.js 构建 GitHub Apps 的框架。它旨在消除所有繁琐的事情，如接收和验证 webhooks 以及做认证动作，这样你就可以专注于你想要实现的功能。Probot 应用程序非常容易编写、部署和分享。大多数流行的 Probot 应用被托管，所以你不需要做任何部署和管理工作。这里有几个基于 Probot 构建的应用：

- [ESLint Disable Watcher][eslint-disable] - 当 pr 中尝试禁用 eslint 规则时进行评论。
- [Developer Certificate of Origin][dco] - 强制 Pull Requests 符合 DCO 规范
- [Issue Check][issue-check] - 根据关键字和任务列表检查 issues 以确保包含必要的信息
- [Pull][pull] - Keep your forks up-to-date.

你可以在[特色应用][featured-apps]或[GitHub probot-app 话题][github-probot-app-topics]浏览更多应用。

## Hello Probot

一个 Probot 应用本质上是导出一个函数的 [Node.js 模块][node-modules]：

```ts
module.exports = app => {
  // your code here
};
```

`app` 参数是 [Probot][probot-class] 类的实例，该实例可以让你访问所有的 GitHub 精华。

`aap.on` 负责监听所有 [GitHub 触发的 webhook 事件][webhooks]，当 GitHub 上发生任何有趣的事情，你的应用程序想知道的时候，它会通知你。

```ts
module.exports = app => {
  app.on('issues.opened', async context => {
    // 一个新的 issue 被打开，我们应该做些什么呢？
    context.log.info(context.payload);
  });
};
```

传递给事件处理程序的上下文包括关于被触发的事件的一切，以及一些有用的属性，以便对事件做出有用的回应。`context.octokit` 是一个经过认证的 GitHub 客户端，可以用来[进行 REST API 和 GraphQL 调用][github-api]，并允许你以编程方式做几乎任何你可以在 GitHub 上通过浏览器做的事情。

下面是一个当新打开 issues 时自动评论的 App。

```ts
module.exports = app => {
  app.on('issues.opened', async context => {
    // context` 从事件中提取信息，可以传递给 GitHub API 调用。这将返回：
    // { owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World !}
    const params = context.issue({ body: 'Hello World!' });

    // 在 issue 上发一条评论
    return context.octokit.issues.createComment(params);
  });
};
```

## 开发一个 Probot app

为了开发一个 Probot app，你首先需要安装 Node.js 10.0.0 或更新的版本。

### 生成一个新的 app

[create-probot-app][create-probot-app] 是开始构建一个新的 app 的最佳方式。它将生成一个新的应用程序，其中包含你所需要的一切，以开始并在生产中运行你的应用程序。

运行下面的命令生成一个项目：

```sh
$ npx create-probot-app my-first-app
```

该命令会问一系列关于你的 app 的问题，看起来就像：

```sh
Let's create a Probot app!
? App name: my-first-app
? Description of app: A 'Hello World' GitHub App built with Probot.
? Author's full name: Katie Horne
? Author's email address: katie@auth0.com
? GitHub user or org name: khorne3
? Repository name: my-first-app
? Which template would you like to use? (Use arrow keys)
❯ basic-js
  basic-ts (use this one for TypeScript support)
  checks-js
  git-data-js
  deploy-js

Finished scaffolding files!

Installing dependencies. This may take a few minutes...

Successfully created my-first-app.

Begin using your app with:
  cd my-first-app
  npm start

View your app's README for more usage instructions.

Visit the Probot docs:
  https://probot.github.io/docs/

Get help from the community:
  https://probot.github.io/community/

Enjoy building your Probot app!
```

创建的最重要的文件是 `index.js`（你的 app 代码所在的位置）和 `package.json`（使你的 app 成为标准 [npm module][npm-module]）。

### 本地运行 app

现在你已经准备好在本地运行 app 了。运行 `npm start` 来开启一个 server 吧：

> 注意：如果你选择了 TypeScript 模板，请确保执行了 `npm run build`！

```sh
$ yarn start
yarn run v1.22.10
$ probot run ./lib/index.js
INFO (server): Running Probot v11.3.0 (Node.js: v14.15.5)
INFO (server): Forwarding https://smee.io/dz7D1zur24cGNj7 to http://localhost:3000/
INFO (server): Listening on http://localhost:3000
INFO (server): Connected
```

### 配置 GitHub App

下列是自动配置 GitHub App 的步骤：

1. 在本地命令行中执行 `npm start`。
2. 访问 http://localhost:3000 查看下一步。
3. 你会看到类似下面的页面。

![](https://cdn.jsdelivr.net/gh/youngjuning/images/20210519200016.png)

4. 点击 **Register a GitHub App** 按钮继续。
5. 接着，你需要给你的 App 取一个没有被占用的名字，注意：如果你看到类似 `Name is reserved for the account @tuya` 的提示，这意味着你不能使用已存在的 GitHub organization 的名字作为 app 的名字（除非你是该组织的 owner）

## Github Release 状态变化

![](https://cdn.jsdelivr.net/gh/youngjuning/images/20210520153504.png)

[probot]: https://probot.github.io/
[github apps]: https://docs.github.com/en/developers/apps/about-apps
[web 挂钩事件和有效负载]: https://docs.github.com/cn/developers/webhooks-and-events/webhooks/webhook-events-and-payloads
[marketplace-getting-started]: https://docs.github.com/en/marketplace/getting-started
[eslint-disable]: https://probot.github.io/apps/eslint-disable/
[dco]: https://probot.github.io/apps/dco/
[issue-check]: https://probot.github.io/apps/issue-check/
[pull]: https://probot.github.io/apps/pull/
[featured-apps]: https://probot.github.io/apps/
[github-probot-app-topics]: https://github.com/search?q=topic%3Aprobot-app&type=Repositories
[node-modules]: https://nodejs.org/api/modules.html
[probot-class]: https://probot.github.io/api/latest/classes/probot.html
[webhooks]: https://probot.github.io/docs/webhooks/
[github-api]: https://probot.github.io/docs/github-api/
[create-probot-app]: https://github.com/probot/create-probot-app
[npm-module]: https://docs.npmjs.com/files/package.json

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

> 本文首发于「[洛竹的官方网站](https://youngjuning.js.org/)」，同步于公众号「[洛竹早茶馆](https://cdn.jsdelivr.net/gh/youngjuning/images/20210418112129.jpeg)」和「[掘金专栏](https://juejin.cn/user/325111174662855)」。

![](https://youngjuning.js.org/img/luozhu.png)

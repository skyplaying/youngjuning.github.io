---
title: 玩转 GitHub Actions
group:
  title: ci-cd
hide: true
---

## act: "Think globally, act locally"

你如果经常维护 GitHub Actions，就会陷入调试难的问题。每一次 workflow 文件更改都要部署到线上，并真实的提交一个 pr，一个 issues 来检验正确性。这不仅仅是测试链长的问题，还会污染仓库的 commit、issues 和 pr 等记录。

有痛点就有解决方案，我要为大家介绍的就是 [act](https://github.com/nektos/act)，它的目标正是在本地运行 GitHub Actions。

## How Does It Work?

> TODO: 翻译

When you run act it reads in your GitHub Actions from .github/workflows/ and determines the set of actions that need to be run. It uses the Docker API to either pull or build the necessary images, as defined in your workflow files and finally determines the execution path based on the dependencies that were defined. Once it has the execution path, it then uses the Docker API to run containers for each action based on the images prepared earlier. The [environment variables](https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables) and [filesystem](https://help.github.com/en/actions/reference/virtual-environments-for-github-hosted-runners#filesystems-on-github-hosted-runners) are all configured to match what GitHub provides.

## 安装 Docker

```sh
$ brew install docker --cask
```

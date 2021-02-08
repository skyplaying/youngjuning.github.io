---
title: Deno GitHub Action 源码解析
cover: https://i.loli.net/2021/02/08/7zuiSw9tadnoQLU.png
---

GitHub Action 是 GitHub 官方的 CI/CD 工具，相较于 Travis CI 和 Circle CI，更轻量和易于扩展，[marketplace](https://github.com/marketplace?type=actions) 中有大量社区贡献的插件。各大开源项目都纷纷转向使用 GitHub Action 作为持续集成的工具，比如本文的主角 Deno。

GitHub 的文档中有很多概念写的十分晦涩，有些翻译很僵硬影响理解。截止发稿时，Deno 的 [ci.yml](https://github.com/youngjuning/youngjuning.github.io/blob/main/public/deno-ci.yml) 文件有 323 行，是一个很好的学习范本。想要对 GitHub Action 有个了解或对 Deno 的持续集成部分感兴趣的同学都可以一起来继续探究下。

## Action 结构

> 注意：GitHub Action 的 ci 脚本需要放在 `.github/workflows` 文件夹下

```yml
name: ci

on: [push, pull_request]

jobs:
```

- `name`：工作流程的名称。GitHub 在仓库的操作页面上显示工作流程的名称。如果省略 name，GitHub 将其设置为相对于仓库根目录的工作流程文件路径。
- `on`：必填。是[触发工作流程的事件](https://docs.github.com/cn/articles/events-that-trigger-workflows)。Deno 中 的 `[push,pull_request]` 代表有主分支有提交代码或 pull_request 时触发 CI 流程。
- `jobs`：工作流程运行包括一项或多项作业。作业默认是并行运行。Deno 中只有一个 job —— `build`

## build job

```yml
jobs:
  build:
    name: ${{ matrix.kind }} ${{ matrix.os }}
    if: |
      github.event_name == 'push' ||
      !startsWith(github.event.pull_request.head.label, 'denoland:')
    runs-on: ${{ matrix.os }}
    timeout-minutes: 60
    strategy:
      # ...
    env:
      # ...
    steps:
      # ...
```

- `name：作业显示在 GitHub 上的名称。
  - `matrix`：用于访问为当前作业配置的矩阵参数。例如，Deno 使用 kind 和 os 版本配置矩阵构建，matrix 上下文对象将包含当前作业的 kind 和 os 版本。
- `if`：您可以使用 if 条件阻止作业在条件得到满足之前运行。Deno 中判断 `github.event_name` 等于 `"push"` 或 `label` 以 `"denoland:"` 开头的 `pull_request` 事件
- `runs-on`：**必填**。 任务运行的机器。机器可以是 GitHub 托管的运行器或自托管的运行器。定义操作系统矩阵时，必须将 `runs-on` 的值设置为您定义的 `matrix.os` 上下文属性。Deno 是跨平台的，因此创建了矩阵以在多个运行器操作系统上运行构建工作流程。
- `timeout-minutes`: 在 GitHub 自动取消运行之前可让作业运行的最大分钟数。 默认值：360。Deno 中设置为 60 来尽早暴露问题。
- `strategy`：策略，用于创建作业的构建矩阵。您可以定义要在其中运行每项作业的不同变种。这可能不太好理解，在 Deno 中，其实就是为了同时构建出多个平台的产物。后面的章节我们单独解析 Deno 中具体的应用。
- `env`：环境变量的 `map` 可用于作业中的所有步骤。 您也可以设置整个工作流程或单个步骤的环境变量。后面章节我们单独解析 Deno 中具体的应用。
- `steps`：作业包含一系列任务，称为 steps。步骤可以运行命令、运行设置任务，或者运行您的仓库、公共仓库中的操作或 Docker 注册表中发布的操作。后面章节我们单独解析 Deno 中具体的应用。

## strategy 策略

```yml
strategy:
  matrix:
    include:
      - os: macos-10.15
        kind: test_release
      - os: windows-2019
        kind: test_release
      - os: ${{ github.repository == 'denoland/deno' && 'ubuntu-latest' || 'ubuntu-18.04' }}
        kind: test_release
      - os: ${{ github.repository == 'denoland/deno' && 'ubuntu-latest' || 'ubuntu-18.04' }}
        kind: test_debug
      - os: ${{ github.repository == 'denoland/deno' && 'ubuntu-latest' || 'ubuntu-18.04' }}
        kind: bench
      - os: ${{ github.repository == 'denoland/deno' && 'ubuntu-latest' || 'ubuntu-18.04' }}
        kind: lint

  # Always run master branch builds to completion. This allows the cache to
  # stay mostly up-to-date in situations where a single job fails due to
  # e.g. a flaky test.
  # Don't fast-fail on tag build because publishing binaries shouldn't be
  # prevented if 'cargo publish' fails (which can be a false negative).
  fail-fast: ${{ github.event_name == 'pull_request' || (github.ref !=
    'refs/heads/master' && !startsWith(github.ref, 'refs/tags/')) }}
```

- `matrix`：

## env 环境变量

## steps 步骤

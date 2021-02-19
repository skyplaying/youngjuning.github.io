---
title: Git
---

## tag 标签

### push tag

```sh
git push --follow-tags
```

```sh
git push --tags
```

```sh
git push origin v0.0.1
```

## merge 合并

### 合并上游仓库分支

1. 添加上游仓库：`git remote add upstream https://github.com/tuya/tuya-panel-sdk.git`
2. 检查是否成功：`git remote -v`
3. 将本地的更改提交了
4. 抓取上游仓库：`git fetch upstream`
5. 切换到 `main` 或 `master` 分支
6. 合并上游的主分支：`git merge upstream/main`

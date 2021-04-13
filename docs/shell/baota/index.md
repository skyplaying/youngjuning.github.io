---
title: 宝塔面板
group:
  title: 宝塔面板
---

## Docker 安装

```sh
curl -fsSL http://youngjuning.js.org/shell/baota/install.sh | sh
```

**登录方式**

- 登陆地址 `http://{{面板ip地址}}:8888`
- 初始账号 `username`
- 初始密码 `password`

> 请大家登陆后第一时间修改账号密码和默认端口！！

**删除容器命令如下**

> 建议不要使用 `-fv` 删除 volume

```sh
docker rm -f baota
```

## Docker 容器备份

```sh
curl -fsSL http://youngjuning.js.org/shell/baota/backup.sh | sh
```

**载入镜像**

可以使用 `docker load` 将导出的 `tar` 文件再导入到本地镜像库。支持 `-i <string>` 或 `-input <string>` 选项，从指定文件中读入镜像内容。

例如，从文件 alpine.tar 导入镜像到本地镜像列表，如下所示：

```sh
docker load -i baota.tar
```

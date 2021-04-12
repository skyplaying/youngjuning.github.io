---
title: 宝塔面板
group:
  title: 宝塔面板
---

## 安装

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

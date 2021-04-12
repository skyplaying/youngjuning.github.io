---
title: Docker 基础篇
cover: https://i.loli.net/2021/04/12/dFuHiqr7Pz1npvb.png
tags: [掘金专栏, 洛竹早茶馆]
oder: 2
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号洛竹早茶馆，转载请联系作者。

## 安装配置

### 卸载旧版本

```shell
$ apt remove docker docker-engine docker.io containerd runc
```

### 通过脚本安装

```shell
$ curl -fsSL https://get.docker.com -o get-docker.sh
$ sudo sh get-docker.sh --mirror Aliyun
```

安装成功后，会自动启动 Docker 服务。用户可以使用 `systemctl is-enabled docker` 来确认 Docker 服务是否是开机自启动。

### 测试 Docker 是否安装正确

```shell
$ docker run hello-world
```

<details>
<summary>执行以上命令，若能正常输出信息，则说明安装成功。</summary>

```shell
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
1b930d010525: Pull complete
Digest: sha256:f9dfddf63636d84ef479d645ab5885156ae030f611a56f3a7ac7f2fdd86d7e4e
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

</details>

### Docker Deamon 配置

执行 `nano /etc/docker/daemon.json` 中写入如下内容：

```json
{
  "registry-mirrors": [
    "https://registry.docker-cn.com",
    "https://mirror.ccs.tencentyun.com",
    "http://docker.mirrors.ustc.edu.cn",
    "http://hub-mirror.c.163.com"
  ]
}
```

重新启动服务:

```shell
$ systemctl daemon-reload
$ systemctl restart docker.service
```

> 注意：不要改默认的 `ip`，默认 `0.0.0.0` 可以被外网访问，`127.0.0.1` 如果不反向代理的话不能被外网访问，如下图：

> ![image.png](https://i.loli.net/2021/04/12/XQkzs12w7LcpIZB.png)

## 使用 Docker 镜像

### 获取镜像

> `docker pull [选项] [Docker Registry 地址[:端口号]/][用户名]<仓库名>[:TAG]`

- 默认选项
  - `-a`，`--all-tags=true|false`：是否获取仓库中的所有镜像，默认为否
  - `--disable-content-trust`：取消镜像的内容校验，默认为真
- 默认 Docker Registry：`registry.hub.docker.com`
- 默认用户名：`library`，也就是官方镜像
- 默认 TAG：`latest`

### 查看镜像信息

#### 列出本地主机上已有镜像

> `docker image ls` | `docker images`

镜像的大小信息只是表示了该镜像的逻辑体积大小，实际上由于相同的镜像层本地只会存储一份，物理上占用的存储空间会小于各镜像逻辑体积之和。

#### 使用 tag 命令添加镜像标签

> `docker tag ubuntu:latest myubuntu:latest`

为了方便在后续工作中使用特定镜像，还可以使用 `docker tag` 命令来为本地镜像任意添加新的标签。

#### 使用 inspect 命令查看详细信息

> `docker inspect <仓库>`

使用 `docker inspect` 命令可以获取该镜像的详细信息，包括制作者、适应架构、各层的数字摘要等。

#### 使用 history 命令查看镜像历史

> `docker history <REPOSITORY>[:TAG]` 或 `docker history <IMAGE ID>`

注意，过长的命令会被自动截断了，可以使用 `--no-trunc` 选项来输出完整命令。

### 删除镜像

1、使用标签删除镜像

> `docker rmi <IMAGE> [IMAGE...]` 或 `docker image rm <IMAGE> [IMAGE...]`

2、使用镜像 ID 来删除镜像

> `docker rmi <IMAGE ID>`

当使用 `docker rmi` 命令，并且后面跟上镜像的 ID（也可以是能进行区分的部分 ID 串前缀）时，会先尝试删除所有指向该镜像的标签，然后删除该镜像文件本身。

> 注意，当有基于该镜像创建的容器时，镜像文件默认是无法被删除的。我们可以使用 `docker ps -a` 命令可以查看本机上存在的所有容器。
>
> 最佳实践：先用 `docker rm <Container ID>` 删除依赖该镜像的所有容器，然后执行 `docker rmi <IMAGE ID>` 再来删除镜像。

### 清理镜像

> `docker image prune [options]`
>
> - `-a`，`--all`：删除所有无用镜像，不光是临时镜像
> - `-f`,`--force`：强制删除镜像，而不进行提示确认

使用 Docker 一段时间后，系统中可能会遗留一些临时的镜像文件，以及没有使用的镜像，可以通过 `docker image prune` 命令来进行清理。

我们可以结合 crontab 来定时清理，执行 `crontab -e`，写入一下配置：

```shell
# 一定要记得在后面按 Enter 输入换行符，否则不会生效的
59 23 * * * docker image prune -f
```

### 创建镜像

#### 1、基于已有容器创建

> `docker commit [OPTIONS] <CONTAINER> <REPOSITORY>[:TAG]`
>
> - `-a`，`--author=`：作者信息
> - `-m`，`--message=""`：提交信息
> - `-p`，`--pause=true`：提交时暂停容器执行

首先，启动一个 alpine 镜像，并在其中进行安装 nano 的操作，然后发布一个新的镜像：

```shell
$ docker run -it alpine bash
$ docker commit -m "install nano" -a "杨俊宁" ff3034d2ffa7 my-alpine:0.1
```

#### 2、基于 Dockerfile 创建

> `docker build -t <IMAGE NAME> <上下文路径/URL/->`

通过 Dockerfile 创建是最常见的方式。Dockerfile 是一个文本文件，利用指定的指令描述基于某个父镜像创建新镜像的过程。

下面给出 Dockerfile 的一个简单示例，基于 alpine 镜像安装 node 环境，构成一个新的 `youngjuning/alpine` 镜像：

```
FROM alpine

LABEL version="1.0" maintainer="youngjuning<youngjuning@aliyun.com>"

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
```

构建：

```shell
$ docker build -t youngjuning/alpine:latest .
```

### 存储镜像

如果要导出镜像到本地文件，可以使用 `docker save` 命令。该命令支持 `-o <string>` 或 `--output <string>` 参数，导出镜像到指定的文件中。

例如，导出本地 alpine 镜像为文件 alpine.tar，如下所示：

```shell
$ docker save -o alpine.tar alpine
```

之后，用户就可以通过复制 alpine.tar 文件将该镜像分享给他人。

### 载入镜像

可以使用 `docker load` 将导出的 tar 文件再导入到本地镜像库。支持 `-i <string>` 或 `-input <string>` 选项，从指定文件中读入镜像内容。

例如，从文件 alpine.tar 导入镜像到本地镜像列表，如下所示：

```shell
$ docker load -i alpine.tar
```

### 上传镜像

> `docker push [选项] [Docker Registry 地址[:端口号]/][用户名]<仓库名>[:TAG]`

**发布新版本流程：**

- 发布 latest 版本：`docker push youngjuning/alpine:latest`
- 添加新标签：`docker tag youngjuning/alpine:latest youngjuning/alpine:1.0.0`
- 发布 1.0.0 版本：`docker push youngjuning/alpine:1.0.0`

> 可以查看[youngjuning/alpine](https://hub.docker.com/r/youngjuning/alpine)项目查看我发布的基于 aliyun 镜像的 Aplpine Docker Image

## 操作 Docker 容器

- Docker 容器是镜像的一个运行实例。
- Docker 容器是独立运行的一个（或一组）应用，以及它们必需的运行环境

### 启动容器

#### 1、新建并启动

```shell
$ docker run -it ubuntu:18.04 /bin/bash
```

其中, `-t` 选项让 Docker 分配一个伪终端（pseudo-tty）并绑定到容器的标准输入上，`-i` 则让容器的标准输入保持打开。

当利用 `docker run` 来创建容器时，Docker 在后台运行的标准操作包括：

1. 检查本地是否存在指定的镜像，不存在就从公有仓库下载
2. 利用镜像创建并启动一个容器
3. 分配一个文件系统，并在只读的镜像层外面挂在一层可读写层
4. 从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中去
5. 从地址池配置一个 ip 地址给容器
6. 执行用户指定的应用程序
7. 执行完毕后容器被终止

**一些常用选项：**

- `-d`，`--detach=true|false`：是否在后台运行容器，默认为`false`
- `-i`，`--interactive=true|false`：保持标准输入打开，默认为 `false`
- `-p`，`--publish=[]`：指定如何映射到本地主机端口，例如 `-p 9000:9000`
- `--restart="no"`：容器的重启策略，包括 `no`、`on-failure[:max-retry]`、`always`、`unless-stopped` 等
- `--rm=true|false`：容器退出后是否自动删除，不能跟 `-d` 同时使用
- `-t`，`--tty=true|false`：是否分配一个伪终端，默认为 `false`
- `-v [HOST-DIR:]<CONTAINER-DIR>[:OPTIONS]`，`--volume=[HOST-DIR:]<CONTAINER-DIR>[:OPTIONS]`：挂在主机上的文件卷到容器内
- `--name=""`：指定容器的别名

#### 2、启动已终止容器

可以利用 `docker start <CONTAINER ID>` 命令，直接将一个已经终止的容器启动运行。

#### 3、查看容器输出

要获取容器的输出信息，可以通过 `docker <CONTAINER ID> logs` 命令。

### 终止容器

可以使用 `docker stop <CONTAINER ID>` 来终止一个运行中的容器。

处于终止状态的容器，可以通过 `docker container start` 命令来重新启动。

此外，`docker container restart` 命令会将一个运行态的容器终止，然后再重新启动它。

### `exec`进入容器

在使用 `-d` 参数时，容器启动后会进入后台。

某些时候需要进入容器进行操作，推荐大家使用 `docker exec` 命令：

```shell
$ docker run -dit alpine
$ docker ps
CONTAINER ID        IMAGE                 COMMAND             CREATED             STATUS              PORTS                      NAMES
3d95dabef801        alpine                "/bin/sh"           21 seconds ago      Up 19 seconds                                  recursing_aryabhata
```

```shell
$ docker exec -it <CONTAINER ID>
```

如果从这个 stdin 中 exit，不会导致容器的停止。

### 删除容器

可以使用 `docker container rm` 来删除一个处于终止状态的容器。例如

```shell
$ docker rm  <CONTAINER ID>
# 删除运行中的容器，并删除容器挂载的数据卷
$ docker rm -vf
```

如果要删除一个运行中的容器，可以添加 `-f` 参数。Docker 会发送 `SIGKILL` 信号给容器。

### 清理所有处于终止状态的容器

```shell
$ docker container prune
```

### 导出和导入容器

```shell
$ docker export 7691a814370e > ubuntu.tar
$ cat ubuntu.tar | docker import - test/ubuntu:v1.0
$ docker import http://example.com/exampleimage.tgz example/imagerepo
```

### 查看容器

#### 查看容器详情

```shell
$ docker inspect [OPTIONS] <CONTAINER ID>
```

#### 查看容器内进程

```shell
$ docker top [OPTIONS] <CONTAINER ID>
```

#### 查看统计信息

```shell
$ docker stats [OPTIONS] <CONTAINER ID>
```

### 更新配置

```shell
$ docker update --restart=always <CONTAINER ID>
```

### 重命名容器

```shell
$ docker rename <old name> <new name>
```

### 查看容器日志

```shell
$ docker logs -f <CONTAINER ID>
```

### Portainer 容器管理工具

```shell
$ docker volume create portainer_data
$ docker run -d -p 8000:8000 -p 9000:9000 \
    --name portainer \
    --restart always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v portainer_data:/data \
    portainer/portainer-ce
```

> 此时，你就可以使用 `http://public_ip:9000` 访问 portainer 了！

如果希望以 `http://public_ip/portainer` 的形式访问 `portainer`，可以配置 `/etc/nginx/sites-enabled/dafulat` 文件进行反向代理：

```nginx
upstream portainer {
    server 127.0.0.1:9000 max_fails=3 fail_timeout=6 weight=5;
    keepalive 256;
}

server {
  ...
  location /portainer/ {
    proxy_pass http://portainer/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 86400;
  }
  ...
}
```

## Docker 数据持久化

`数据卷` 是一个可供一个或多个容器使用的特殊目录，它绕过 UFS，可以提供很多有用的特性：

- `数据卷` 可以在容器之间共享和重用
- 对 `数据卷` 的修改会立马生效
- 对 `数据卷` 的更新，不会影响镜像
- `数据卷` 默认会一直存在，即使容器被删除

### 创建数据卷

```shell
$ docker volume create my-vol
```

除了 `create` 子命令外，docker volume 还支持 `inspect`(查看详细信息)、`ls`（列出已有数据卷）、`prune`（清理无用数据卷）、`rm`（删除数据卷）

### 绑定数据卷

#### `--mount`

```bash
$ docker run -d -P \
    --name web \
    --mount source=my-vol,target=/webapp \
    training/webapp \
    python app.py
```

#### `-v`，`--volume`

```shell
$ docker run -d -P \
    --name web \
    -v my-vol:/wepapp \
    training/webapp \
    python app.py
```

> source 也可以是绝对路径的任意系统位置。

> 如果直接挂载一个文件到容器，使用文件编辑工具，包括 vi 或者 `sed --in-place` 的时候，可能会造成文件 inode 的改变，从 Docker 1.1 起，这会导致报错误信息。所以推荐的方式是直接挂载文件所在的目录到容器内。

## Dockerfile

> 详细指令详解请查看：[Dockerfile 指令详解](https://vuepress.mirror.docker-practice.com/image/dockerfile/)

![](//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c3b96a5c27a4291982a8bac271ebb31~tplv-k3u1fbpfcp-zoom-1.image)

## 应用安装

### GitLab 及其官方镜像

#### docker-compose.yml

```yaml
web:
  image: 'gitlab/gitlab-ce:latest'
  restart: always
  hostname: 'gitlab.yangjunning.pro'
  environment:
    GITLAB_OMNIBUS_CONFIG: |
      external_url 'http://gitlab.yangjunning.pro:8929'
      gitlab_rails['gitlab_shell_ssh_port'] = 2224
  ports:
    - '8929:8929'
    - '2224:22'
  volumes:
    - 'gitlab_config:/etc/gitlab'
    - 'gitlab_logs:/var/log/gitlab'
    - 'gitlab_data:/var/opt/gitlab'
```

#### 运行容器

```
$ docker-compose up -d
```

#### 更新 gitlab

```shell
$ docker-compose pull
$ docker-compose up -d
```

## Docker 相关的定时任务

```sh
# crontab -e
# 每天凌晨强制删除无用镜像，不光是临时镜像；每天凌晨清理无用的数据卷
00 00 * * * docker image prune -af && docker volume prune -f && rsync -arv /var/lib/docker/volumes /backups/docker
```

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)

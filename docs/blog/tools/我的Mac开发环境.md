---
title: 我的 Mac 开发环境
tags: [掘金专栏]
---

## Homebrew

访问 [brew.sh](https://brew.sh/index_zh-cn) 安装。使用 Homebrew 安装 Apple（或您的 Linux 系统）没有预装但 [你需要的东西](https://formulae.brew.sh/formula/)。Homebrew 将大大降低维护环境的时间。本文后面将尽可能使用 Homebrew。

> 网络问题请参考 [解决homebrew安装curl: (7) Failed to connect to http://raw.githubusercontent.com port 443错误](https://www.huaweicloud.com/articles/2378bf35864b07da2b8b30db035a9897.html) 解决。

- `brew install`：安装
- `brew uninstall`：卸载
- `brew update`：更新 homebrew
- `brew upgrade`：更新已安装软件
- `brew cleanup`：清理
- `brew update && brew upgrade && brew cleanup`：一键清理

卸载脚本：

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

## ohmyzsh

```sh
# 切换 shell 为 zsh
$ chsh -s /bin/zsh
# 通过 curl 安装 ohmyzsh
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 插件

#### zsh-syntax-highlighting

- 安装: `brew install zsh-syntax-highlighting`
- Oh-my-zsh
  - `git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`
  - `plugins=( [plugins...] zsh-syntax-highlighting)`
  - `source ~/.zshrc`

#### WakaTime for Terminal

- `sudo easy_install pip`
- `sudo pip install wakatime`
- `cd ~/.oh-my-zsh/custom/plugins`
- `git clone https://github.com/sobolevn/wakatime-zsh-plugin.git wakatime`
- 在你的 `~/.zshrc` 文件的 [list of plugins](https://github.com/robbyrussell/oh-my-zsh/wiki/External-plugins) 添加 `wakatime`
- `source ~/.zshrc`
- 确保你的 [~/.wakatime.cfg](https://github.com/wakatime/wakatime#configuring) 文件中配置了 [API key](https://wakatime.com/settings/api-key) 。

## vim

> 建议使用：https://github.com/amix/vimrc

```shell
$ git clone --depth=1 https://github.com/amix/vimrc.git ~/.vim_runtime
$ sh ~/.vim_runtime/install_awesome_vimrc.sh
$ echo "set number" >> ~/.vimrc
$ echo "set showcmd" >> ~/.vimrc
$ source ~/.vimrc
```

## Git

### 命令行工具

```sh
// Re-installing Git on Mac OSX with Brew
$ alias git='/usr/local/bin/git'
$ brew install git
```

### 命令行配置

```bash
# 1、初始化设置
$ git config --global user.name 'youngjuning'
$ git config --global user.email 'youngjuning@aliyun.com'
# 2、将 `color.ui` 设置为 `auto` 可以让命令的输出拥有更高的可读性。
$ git config --global color.ui auto
# 3、git 记住用户名和密码
$ git config --global credential.helper store
# 4、core.autocrlf
$ git config --global core.autocrlf input
# 5、输出到terminal而不是vim
$ git config --global pager.branch false
```

> Linux 或 Mac 系统使用 LF 作为行结束符，因此你不想 Git 在签出文件时进行自动的转换；当一个以 `CRLF` 为行结束符的文件不小心被引入时你肯定想进行修正，把 `core.autocrlf` 设置成 `input` 来告诉 Git 在提交时把 `CRLF` 转换成 `LF`，签出时不转换：
> 这样会在 Windows 系统上的签出文件中保留 `CRLF`，会在 Mac 和 Linux 系统上，包括仓库中保留 `LF`。

### 学习资料

- [官方 Book](https://git-scm.com/book/zh/v2)
- [git - 简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)：助你入门 git 的简明指南，木有高深内容
- [廖雪峰的 git 教程](http://t.cn/RK0tLXB)
- [猴子都能懂的 GIT 入门](https://backlog.com/git-tutorial/cn/)

## Node

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时。我们使用 `n` 模块来维护 Node 的版本：

```shell
$ brew install n
# 安装最新版
$ sudo n latest
## 其他命令##
# 安装指定版本
$ sudo n 10.16.0
# 安装最新的稳定版
$ sudo n lts
# 删除指定版本
$ n rm 12.10.0
# 除去当前版本以外的所有缓存版本
$ n prune
```

### 更新 npm

```shell
$ sudo npm install -g npm
```

### nrm 管理 registry

```shell
$ sudo npm install -g nrm
# 列出可用的代理
$ nrm ls
# 添加私有代理
$ nrm add local http://127.0.0.0:4873 http://127.0.0.0:4873
```

## d8

> 不要使用 `brew install v8`，可用命令是不完整的

### 预备条件

- Install Xcode (Avaliable on the Mac App Store)
- Install Xcode Command Line Tools (Preferences > Downloads)
- Install [depot_tools](https://www.chromium.org/developers/how-tos/install-depot-tools)
  - `cd ~ && git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git`
  - `sudo nano ~/.zshrc`(zsh) or `sudo nano ~/.bash_profile`(bash)
  - Add `export PATH=~/depot_tools:"$PATH"` (it's important that depot_tools comes first here)
  - `source ~/.zshrc`
  - From the directory you want to install V8 into, run `gclient`

### Build V8

- `fetch v8`
- `cd ~/v8`
- `gclient sync`
- `tools/dev/v8gen.py x64.optdebug`
- `ninja -C out.gn/x64.optdebug` (prepare for lots of fan noise)

I'd also recommend adding these to your `.zshrc`:

- `sudo nano ~/.zshrc`
- Add `alias d8=~/v8/out.gn/x64.optdebug/d8`
- Add `alias tick-processor=~/v8/tools/mac-tick-processor`
- Add `export D8_PATH="~/v8/out.gn/x64.optdebug"`
- `source ~/.zshrc`

> 使用 Demo 请参考 [d8-shell-examples](https://gist.github.com/kevincennis/0cd2138c78a07412ef21#d8-shell-examples)

## Java

### 下载安装

- [javase-jdk8-downloads](https://www.oracle.com/hk/java/technologies/javase/javase-jdk8-downloads.html)
- [Oracle Java 存档](https://www.oracle.com/cn/java/technologies/oracle-java-archive-downloads.html)

### 实用命令

- Mac 下查看已安装的 jdk 版本及其安装目录: `/usr/libexec/java_home -V`

  ```sh
  Matching Java Virtual Machines (2):
   1.8.0_221, x86_64:	"Java SE 8"	/Library/Java/JavaVirtualMachines/jdk1.8.0_221.jdk/Contents/Home
   1.7.0_80, x86_64:	"Java SE 7"	/Library/Java/JavaVirtualMachines/jdk1.7.0_80.jdk/Contents/Home

  /Library/Java/JavaVirtualMachines/jdk1.8.0_221.jdk/Contents/Home
  ```

- 查看 jre 版本: `java -version`
- 查看 jdk 版本: `javac -version`

## Maven

### 安装

```sh
$ brew install maven
```

### 配置 Maven 本地仓库

`setting.xml` 路径为 `${Maven Home}/conf/settings.xml` ，Maven Home 可以通过 `mvn --version 获取`

```xml
<localRepository>~/maven_repo</localRepository>
```

可将 `settings.xml` 直接拷贝到 `.m2` 文件夹下，进行配置。

如果没有 `.m2` 文件夹时,运行命令

```sh
$ mvn help:system
```

然后打开当前用户的目录，可以在其中找到 `.m2` 文件夹

### 配置阿里镜像

```xml
<mirror>
  <id>alimaven</id>
  <name>aliyun maven</name>
  <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
  <mirrorOf>central</mirrorOf>
</mirror>
```

### 升级 Maven

```sh
$ brew unlink
$ brew update
$ brew install maven
```

## MySql

```shell
$ brew install mysql
```

### 修改配置文件

```shell
$ nano /usr/local/etc/my.cnf
```

### 启动服务

```shell
brew services start mysql
# 重启
brew services restart mysql
# 停止
brew services stop mysql
```

> Or, if you don't want/need a background service you can just run: `mysql.server start`

### 安全设置

```shell
$ mysql_secure_installation
```

1. 建立密码验证插件

   ```shell
   Securing the MySQL server deployment.

   Connecting to MySQL using a blank password.

   VALIDATE PASSWORD PLUGIN can be used to test passwords and improve security. It checks the strength of password and allows the users to set only those passwords which are secure enough. Would you like to setup VALIDATE PASSWORD plugin?

   Press y|Y for Yes, any other key for No: y
   ```

2. 选择密码规则

   ```shell
   There are three levels of password validation policy:

   LOW    Length >= 8
   #长度大于等于8
   MEDIUM Length >= 8, numeric, mixed case, and special characters
   #长度大于等于8，数字、大小写字母、特殊符号
   STRONG Length >= 8, numeric, mixed case, special characters and dictionary                  file
   #长度大于等于8，数字、大小写字母、特殊符号和字典文件（慎选！）

   Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 1
   Please set the password for root here.

   New password: （输入你的密码）
   Re-enter new password: （再次输入你的密码）
   ```

3. 创建符合规则的新密码

   ```shell
   Estimated strength of the password: 50 		#密码强度
   Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) : y
   ```

4. 删除匿名用户

   ```
   By default, a MySQL installation has an anonymous user, allowing anyone to log into MySQL without having to have a user account created for them. This is intended only for testing, and to make the installation go a bit smoother.
   You should remove them before moving into a production environment.

   Remove anonymous users? (Press y|Y for Yes, any other key for No) : y
   Success.
   ```

5. 禁止远程登录

   ```shell
   Normally, root should only be allowed to connect from 'localhost'. This ensures that someone cannot guess at the root password from the network.

   Disallow root login remotely? (Press y|Y for Yes, any other key for No) : y
   Success.
   ```

6. 删除测试数据表

   ```shell
   By default, MySQL comes with a database named 'test' that anyone can access. This is also intended only for testing, and should be removed before moving into a production environment.

   Remove test database and access to it? (Press y|Y for Yes, any other key for No) : y
    - Dropping test database...
   Success.

    - Removing privileges on test database...
   Success.
   ```

7. Done

   ```shell
   Reloading the privilege tables will ensure that all changes made so far will take effect immediately.

   Reload privilege tables now? (Press y|Y for Yes, any other key for No) : y
   #是否重新加载权限表
   Success.

   All done!
   ```

#### Your password does not satisfy the current policy requirements.

如果你在选择密码规则的时候不小心选择了 2，也就是数字、大小写字母、特殊符号和字典文件的组合。这时你会发现 `mysql_secure_installation`不会再给你机会重新设置了。手动微笑，mmp。方法还是有的：

```shell
SHOW VARIABLES LIKE 'validate_password%';
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68541c4633b944d69276a3da8f453406~tplv-k3u1fbpfcp-zoom-1.image)

使用命令 `mysql -u root` 登陆，执行：

```shell
set global validate_password.policy=0;
set global validate_password.length=4;
#将密码规则设置为LOW，就可以使用纯数字纯字母密码
```

### 登陆

```shell
$ mysql -u root -p
```

## mongodb

> 参考: [Mac OSX 平台安装 MongoDB](https://www.runoob.com/mongodb/mongodb-osx-install.html)、[Mac 下安装 MongoDB 数据库-启动-停止-开启验证-登陆](https://www.32e.top/system/mac/article-87.html)、[【环境搭建：二】Mac 安装、配置 MongoDB](https://uizph.com/article/5db177e4a9f13d7f535810c5)、[MongoDB 的用户创建更新及删除](https://www.jianshu.com/p/f5afc6488f9e)、[MongoDB 用户名密码登录 认证登陆](https://cloud.tencent.com/developer/article/1446551)

### 下载安装

```sh
$ brew install mongodb/brew/mongodb-community
$ mongod -version
```

### 配置

#### 启动 mongo

1、新建 dbpath

```sh
$ sudo mkdir ~/data/db
$ sudo mkdir ~/data/log
```

2、启动

```sh
$ sudo mongod --dbpath ~/data/db --fork --logpath ~/data/log/mongo.log
```

> 注意：Mac OS 10.15.1 版本之后， `/data/db` 文件夹消失了，重新创建文件夹提示 `mkdir: /data/db: Read-only file system`，解决办法也可以是 `sudo mkdir ~/data/db && sudo mongodb --dbpath ~/data/db`

#### 设置验证和用户名密码

```sh
$ mongo
# 创建超级管理员
> db.createUser({ user: "root" , pwd: "123456", roles: ["root"]});
Successfully added user: {
   "user" : "root",
   "roles" : ["root"]
}
# 尝试使用上面创建的用户信息进行连接。
> db.auth("root","123456")
1
# 创建一个名为 admin，密码为 123456 的用户。
> db.createUser({ user: "admin", pwd: "123456", roles:["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]});
Successfully added user: {
   "user": "admin",
   "roles": [
   {
      "role": "userAdminAnyDatabase",
      "db": "admin"
   }
  ]
}
# 尝试使用上面创建的用户信息进行连接。
> db.auth("admin","123456")
1
```

### 开启验证模式登录

开启 mongod 时，指定 `--auth` 参数即可以验证模式打开：

```sh
$ sudo mongod --dbpath ~/data/db --fork --logpath ~/data/log/mongo.log --auth
```

#### 登录时验证

```shell
$ mongo 127.0.0.1:27017/admin -u admin -p 123456
# 等价于
$ mongo --port 27017 -u "adminUser" -p "adminPass" --authenticationDatabase "admin"
```

#### 登录后验证

```shell
$ mongo
> use admin
> ab.auth("admin","123456")
```

### 退出 mongo

```sh
#先停止mongod服务
$ use admin;
$ db.shutdownServer();

然后退出mongo
$exit；
```

## natapp

开启您的内网穿透之旅,调试微信的利器，请至[官网](https://natapp.cn/)下载

## IDE

- [VSCode](https://code.visualstudio.com/): Visual Studio Code 是一个由微软开发，同时支持 Windows 、 Linux 和 macOS 等操作系统且开放源代码的代码编辑器，它支持测试，并内置了 Git 版本控制功能，同时也具有开发环境功能，例如代码补全、代码片段和代码重构等。

## 设置 SSH Key

在用户主目录下，看看有没有 `.ssh` 目录，如果有，再看看这个目录下有没有 `id_rsa` 和 `id_rsa.pub` 这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开 Shell（Windows 下打开 Git Bash），创建 SSH Key：

```bash
$ ssh-keygen -t rsa -C "young_email@aliyun.com"
```

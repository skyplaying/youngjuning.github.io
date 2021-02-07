---
title: 脚本
---

## tar 把所有文件分别打包

```sh
ls | xargs -I {} tar zcvfm {}.tar.bz {}
```

- `ls` 列出所有的子文件夹，通过 `|` 输出给管道
- `xargs -I {}` 命令设置占位符 {}。
- `tar -jvf {}.tar.bz {}` 将子文件和子文件夹逐个压缩

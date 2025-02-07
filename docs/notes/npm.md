---
title: NPM 使用笔记
---

## 将指定版本设置为指定标签

```sh
$ npm dist-tag add @youngjuning/playground@1.0.3 latest|alpha|beta
```

## 展示 dist-tag

```sh
$ npm dist-tag ls @youngjuning/playground
```

## 废弃某个版本

```sh
$ npm deprecate @youngjuning/playground@1.0.3 "垃圾"
```

## package.json 字段解释

```json
{
  "name": "wx-promise-pro",
  "version": "3.2.2",
  "description": "强大的、优雅的小程序 Promise 库",
  "main": "dist/wx-promise-pro.js",
  "types": "index.d.ts",
  "scripts": {
    "build": "rollup -c",
    "postversion": "yarn build && git push --tags && git push && npm publish"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/youngjuning/wx-promise-pro.git"
  },
  "keywords": [
    "promise",
    "es6",
    "then",
    "catch",
    "finally",
    "小程序",
    "weapp",
    "miniapp",
    "weixin"
  ],
  "author": {
    "name": "洛竹",
    "email": "youngjuning@aliyun.com",
    "url": "https://youngjuning.js.org"
  },
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/youngjuning/wx-promise-pro/issues"
  },
  "homepage": "https://github.com/youngjuning/wx-promise-pro#readme",
  "devDependencies": {
    "@babel/core": "^7.8.7",
    "@babel/preset-env": "^7.8.7",
    "rollup": "^1.28.0",
    "rollup-plugin-babel": "^4.3.3",
    "rollup-plugin-commonjs": "^10.1.0",
    "rollup-plugin-json": "^4.0.0",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-terser": "^5.1.3"
  }
}
```

---
title: "快速开始"
sidebar:
    - text: "简介"
      items:
        - text: "什么是DocuPress？"
          link: "/what"
        - text: "快速开始"
          link: "/started"
    - text: "写作"
      items:
        - text: "Markdown扩展"
          link: "/markdown"
    - text: "Api参考"
    - text: "Api参考"
---

## 安装

### 前置条件

* Node.js
* 命令行终端
* 支持Markdown语法的编辑器
  * 推荐Visual Studio Code

### 安装向导

```sh
npm create docu@latest
```

会询问以下简单几个问题：

```text
? 请输入项目名称:
? 包名 (name):
? 版本 (version):
? 描述 (description):
? 入口文件 (main):
? 关键字 (keywords):
? 作者 (author):
```

创建完成后

```text
cd <project-name>
npm install
npm run dev
```

### 目录结构

`dist`目录构建后的输出目录

```text
|-dist
|-src
| |-config
| |-controller
| |-docs
| |-errors
| |-plugins
| |-public
| |-routes
| |-services
| |-types
| |-utils
| |-views
| |-.config.yaml
| |-index.ts
| |-logger.ts
| |-server.ts
|-build.js
|-eslint.config.mjs
|-package.json
|-tsconfig.json
```

代码

:tada: :100:

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

::: warning
*here be dragons*
:::

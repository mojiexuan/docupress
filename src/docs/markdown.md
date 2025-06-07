---
title: "Markdown扩展"
sidebar:
    - text: "简介"
      items:
        - text: "什么是DocuPress？"
          link: "/what"
        - text: "快速开始"
          link: "/started"
        - text: "记发布开源组件到Maven Central仓库"
          link: "/publish-maven-central-repo"
    - text: "写作"
      items:
        - text: "Markdown扩展"
          link: "/markdown"
    - text: "Api参考"
    - text: "Api参考"
---

## Gray Matter

支持YAML格式，在文件顶部添加YAML格式的Front Matter，用于自定义页面信息

**语法**

```markdown
---
title: "Markdown扩展"
---
```

## ApiDoc

支持ApiDoc格式，用于生成接口文档，{}大括号用于标识类型，[]中括号用于标识参数(可使用 `id=1` 的方式指定默认值)，`<required>` 指示当前参数为必填项。

**语法**

```markdown
@apiStart
@apiName 获取用户
@apiMethod GET
@apiPath /api/users/{id}
@apiVersion 1.0
@apiDescription 根据ID获取用户信息
@apiParam {number} [id=1] <required> 用户ID
@apiBody {string} [username] 用户名
@apiBody {string} [password] 密码
@apiHeader {string} [Authorization] Bearer Token
@apiSuccess {string} [name] 用户名
@apiSuccessExample {json}
{
  "id": 1,
  "name": "张三"
}
@apiError {number} [code] 错误码
@apiError {string} [message] 错误信息
@apiErrorExample {json}
{
  "code": 1,
  "message": "用户不存在"
}
@apiEnd
```

**示例**

@apiStart
@apiName 获取用户
@apiMethod GET
@apiPath /api/users/{id}
@apiVersion 1.0
@apiDescription 根据ID获取用户信息
@apiParam {number} [id=1] <required> 用户ID
@apiBody {string} [username] 用户名
@apiBody {string} [password] 密码
@apiHeader {string} [Authorization] Bearer Token
@apiSuccess {string} [name] 用户名
@apiSuccessExample {json}
{
  "id": 1,
  "name": "张三"
}
@apiError {number} [code] 错误码
@apiError {string} [message] 错误信息
@apiErrorExample {json}
{
  "code": 1,
  "message": "用户不存在"
}
@apiEnd

## ECharts

支持ECharts图表,仅需使用 `@chartStart` 和 `@chartEnd` 包裹ECharts图表的 `option` 配置内容即可。

**语法**

```markdown
@chartStart
{
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
@chartEnd
```

**示例**

@chartStart
{
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
@chartEnd

**option内容**

[Apache ECharts](https://echarts.apache.org/examples/zh/index.html){target="_blank"}

## 缩写

支持缩写词 `<abbr>` 标签语法

**语法**

```markdown
*[HTML]: 超文本标记语言
*[W3C]: 万维网联盟

HTML 规范由 W3C 维护。
```

**示例**

*[HTML]: 超文本标记语言
*[W3C]: 万维网联盟

HTML 规范由 W3C 维护。

## GFM

支持 GFM 风格的警告语法。

**语法**

```markdown
> [!note]
> 注释文字

> [!important]
> 重要文字

> [!tip]
> 提示文字

> [!warning]
> 注意文字

> [!caution]
> 警告文字
```

**示例**

> [!note]
> 注释文字

> [!important]
> 重要文字

> [!tip]
> 提示文字

> [!warning]
> 注意文字

> [!caution]
> 警告文字

## 自定义容器

用于创建块级自定义容器的插件。

**语法**

```markdown
::: info
这是一条信息框。
:::

::: tip
这是一条提示框。
:::

::: warning
这是一个警告。
:::

::: danger
这是危险的警告
:::

::: details
这时可折叠的详情块
:::

::: warning
*内部支持Markdown*
:::
```

**示例**

::: info
这是一条信息框。
:::

::: tip
这是一条提示框。
:::

::: warning
这是一个警告。
:::

::: danger
这是危险的警告
:::

::: details
这时可折叠的详情块
:::

::: warning
*内部支持Markdown*
:::

## 属性锚点 {#grammar}

用于向 Markdown 内容添加属性。

**语法**

```markdown
## 属性锚点 {#grammar}
```

## 列表

支持定义列表

**语法**

```markdown
术语 1

: 定义 1

术语 2 with _inline markup_

: 定义 2

    定义 2 有多个段落。

    - 列表 1
    - 列表 2

术语 3

: 定义 3
包含软换行

    定义的第二个段落。

---

术语 1
: 定义 1

术语 2
: 定义 2a
: 定义 2b
```

**示例**

术语 1

: 定义 1

术语 2 with _inline markup_

: 定义 2

    定义 2 有多个段落。

    - 列表 1
    - 列表 2

术语 3

: 定义 3
包含软换行

    定义的第二个段落。

---

术语 1
: 定义 1

术语 2
: 定义 2a
: 定义 2b

## 标题图片

生成带有标题的图片。

**语法**

```markdown
![Logo](/favicon.ico "DocuPress")
[![Logo](/favicon.ico "DocuPress")](https://doc.chenjiabao.com)
```

**示例**

![Logo](/favicon.ico "DocuPress")

[![Logo](/favicon.ico "DocuPress")](https://doc.chenjiabao.com)

## 图片尺寸

支持设置图片尺寸.

**语法**

```markdown
![替代文字 =100x150](/favicon.ico)
![替代文字 =100x](/favicon.ico "标题")
![替代文字 =x150](/favicon.ico)

![替代文字|100x100](/favicon.ico)
![替代文字|100x0](/favicon.ico)
![替代文字|0x150](/favicon.ico)
```

**示例**

![替代文字 =100x150](/favicon.ico)
![替代文字 =100x](/favicon.ico "标题")
![替代文字 =x150](/favicon.ico)

![替代文字|100x100](/favicon.ico)
![替代文字|100x0](/favicon.ico)
![替代文字|0x150](/favicon.ico)

## 插入

支持插入语法。

**语法**

```markdown
DocuPress ++十分++ 强大。
```

**示例**

DocuPress ++十分++ 强大。

## 公式

使用 KaTeX 呈现数学表达式。

**语法**

```markdown
欧拉恒等式 $e^{i\pi}+1=0$ 是一个美丽的公式 $\mathbb{R}^2$.

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}
$$
```

**示例**

欧拉恒等式 $e^{i\pi}+1=0$ 是一个美丽的公式 $\mathbb{R}^2$.

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}
$$

**支持列表**

[KaTeX 支持功能](https://katex.org/docs/supported.html){target="_blank"}

[KaTeX 支持列表](https://katex.org/docs/support_table.html){target="_blank"}

## 标记

标记和突出显示内容.

**语法**

```markdown
DocuPress ==十分强大==。
```

**示例**

DocuPress ==十分强大==。

## UML

支持 plant uml

**语法**

```markdown
@startuml
Bob -> Alice : hello
@enduml
```

**示例**

@startuml
Bob -> Alice : hello
@enduml

## ruby

支持 ruby 语法。

**语法**

```markdown
{中国:zhōng|guó}
```

**示例**

{中国:zhōng|guó}

## 隐藏内容

支持隐藏内容。

**语法**

```markdown
DocuPress !!十分强大!!。
```

**示例**

DocuPress !!十分强大!!。

## 上标&下标

支持上标和下标语法。

**示例**

`H~2~O` H~2~O

`19^th^` 19^th^

## 任务列表

支持任务列表语法。

**语法**

```markdown
- [ ] 计划 A
- [x] 计划 B
```

**示例**

- [ ] 计划 A
- [x] 计划 B

## Emoji 🎉

支持 Emoji 语法。

**语法**

```markdown
:tada: :100:
```

**示例**

:tada: :100:

**支持列表**

[Emoji 列表](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md){target="_blank"}

## 在代码块中实现行高亮

- 单行：例如 `{5}、{10}`
- 多行：例如 `{5-8}、{3-10}、{10-17}`
- 多个单行：例如 `{4,7,9}`
- 多行与单行：例如 `{4,7-13,16,23-27,40}`

**语法**

```markdown
    ```js{4}
    export default {
      data () {
        return {
          msg: 'Highlighted!'
        }
      }
    }
    ```
```

**示例**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

在行末使用 `// [!code highlight]` 注释实现行高亮

**语法**

```markdown
\```js
export default {
  data () {
    return {    // [!code highlight]
      msg: 'Highlighted!'
    }
  }
}
\```
```

**示例**

```js
export default {
  data () {
    return {    // [!code highlight]
      msg: 'Highlighted!'
    }
  }
}
```

## 高亮“错误”和“警告”

在行末添加 `// [!code warning]` 或 `// [!code error]` 注释将会为该行相应的着色。

**语法**

```markdown
\```js
export default {
  data () {
    return {
      msg: 'Error', // [!code error]
      msg: 'Warning' // [!code warning]
    }
  }
}
\```
```

**示例**

```js
export default {
  data () {
    return {
      msg: 'Error', // [!code error]
      msg: 'Warning' // [!code warning]
    }
  }
}
```

## 代码块中的颜色差异

在行末添加 `// [!code --]` 或 `// [!code ++]` 注释将会为该行创建 diff。

**语法**

```markdown
\```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
\```
```

**示例**

```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```

## 代码块中聚焦

在行尾添加 // [!code focus] 注释将聚焦它并模糊代码的其他部分。

**语法**

```markdown
\```js
export default {
  data () {
    return {
      msg: 'Focused' // [!code focus]
    }
  }
}
\```
```

**示例**

```js
export default {
  data () {
    return {
      msg: 'Focused' // [!code focus]
    }
  }
}
```

## 目录表 (TOC)

**语法**

```markdown
[TOC]
```

**示例**

[TOC]

## 脚注

支持脚注语法。

**语法**

```markdown
这是一个简单的脚注[^1].
这是一个多行脚注[^2].
这是脚注参考[^fnref1] 返回脚注。[^fnref1]
[^1]: 我的推荐信。
[^2]: 我引用了多行。
[^fnref1]: 我的脚注参考。
```

**示例**

这是一个简单的脚注[^1].
这是一个多行脚注[^2].
这是脚注参考[^fnref1] 返回脚注。[^fnref1]
[^1]: 我的推荐信。
[^2]: 我引用了多行。
[^fnref1]: 我的脚注参考。



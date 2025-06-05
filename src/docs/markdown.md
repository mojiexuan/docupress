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

## 缩写

支持缩写词 `<abbr>` 标签语法

### 语法

```markdown
*[HTML]: 超文本标记语言
*[W3C]: 万维网联盟

HTML 规范由 W3C 维护。
```

### 示例

*[HTML]: 超文本标记语言
*[W3C]: 万维网联盟

HTML 规范由 W3C 维护。

## GFM

支持 GFM 风格的警告语法。

### 语法

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

### 示例

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

### 语法

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

### 示例

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

## 属性锚点

用于向 Markdown 内容添加属性。

### 语法 {#grammar}

```markdown
### 语法 {#grammar}
```

## 列表

支持定义列表

### 语法

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

### 示例

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

### 语法

```markdown
![Logo](/favicon.ico "DocuPress")
[![Logo](/favicon.ico "DocuPress")](https://doc.chenjiabao.com)
```

### 示例

![Logo](/favicon.ico "DocuPress")

[![Logo](/favicon.ico "DocuPress")](https://doc.chenjiabao.com)

## 图片尺寸

支持设置图片尺寸.

### 语法

```markdown
![替代文字 =100x150](/favicon.ico)
![替代文字 =100x](/favicon.ico "标题")
![替代文字 =x150](/favicon.ico)

![替代文字|100x100](/favicon.ico)
![替代文字|100x0](/favicon.ico)
![替代文字|0x150](/favicon.ico)
```

### 示例

![替代文字 =100x150](/favicon.ico)
![替代文字 =100x](/favicon.ico "标题")
![替代文字 =x150](/favicon.ico)

![替代文字|100x100](/favicon.ico)
![替代文字|100x0](/favicon.ico)
![替代文字|0x150](/favicon.ico)

## 插入

支持插入语法。

### 语法

```markdown
DocuPress ++十分++ 强大。
```

### 示例

DocuPress ++十分++ 强大。

## 公式

使用 KaTeX 呈现数学表达式。

### 语法

```markdown
欧拉恒等式 $e^{i\pi}+1=0$ 是一个美丽的公式 $\mathbb{R}^2$.

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}
$$
```

### 示例

欧拉恒等式 $e^{i\pi}+1=0$ 是一个美丽的公式 $\mathbb{R}^2$.

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}
$$

### 支持列表

[KaTeX 支持功能](https://katex.org/docs/supported.html){target="_blank"}

[KaTeX 支持列表](https://katex.org/docs/support_table.html){target="_blank"}

## 标记

标记和突出显示内容.

### 语法

```markdown
DocuPress ==十分强大==。
```

### 示例

DocuPress ==十分强大==。

## UML

支持 plant uml

### 语法

```markdown
@startuml
Bob -> Alice : hello
@enduml
```

### 示例

@startuml
Bob -> Alice : hello
@enduml

## ruby

支持 ruby 语法。

### 语法

```markdown
{中国:zhōng|guó}
```

### 示例

{中国:zhōng|guó}

## 隐藏内容

支持隐藏内容。

### 语法

```markdown
DocuPress !!十分强大!!。
```

#### 示例

DocuPress !!十分强大!!。

## 上标&下标

支持上标和下标语法。

### 示例

`H~2~O` H~2~O

`19^th^` 19^th^

## 任务列表

支持任务列表语法。

### 语法

```markdown
- [ ] 计划 A
- [x] 计划 B
```

### 示例

- [ ] 计划 A
- [x] 计划 B

## Emoji 🎉

支持 Emoji 语法。

### 语法

```markdown
:tada: :100:
```

### 示例

:tada: :100:

### 支持列表

[Emoji 列表](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md){target="_blank"}

## 代码块中实现行高亮

在行末使用 `// [!code highlight]` 注释实现行高亮

### 语法

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

### 示例

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

### 语法

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

### 示例

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

### 语法

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

### 示例

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

## 脚注

支持脚注语法。

### 语法

```markdown
这是一个简单的脚注[^1].
这是一个多行脚注[^2].
这是脚注参考[^fnref1] 返回脚注。[^fnref1]
[^1]: 我的推荐信。
[^2]: 我引用了多行。
[^fnref1]: 我的脚注参考。
```

### 示例

这是一个简单的脚注[^1].
这是一个多行脚注[^2].
这是脚注参考[^fnref1] 返回脚注。[^fnref1]
[^1]: 我的推荐信。
[^2]: 我引用了多行。
[^fnref1]: 我的脚注参考。



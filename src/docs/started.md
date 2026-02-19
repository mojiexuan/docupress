---
title: "快速开始"
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

```shell
? 请输入项目名称:
? 包名 (name):
? 版本 (version):
? 描述 (description):
? 入口文件 (main):
? 关键字 (keywords):
? 作者 (author):
```

创建完成后

```shell
cd <project-name>
npm install
npm run dev
```

```python {1-2}
# 计算斐波那契数列
def fibonacci(n):
    """生成斐波那契数列前n项"""
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

# 测试代码
if __name__ == "__main__":
    num = 10
    print(f"斐波那契数列前{num}项:")
    print(fibonacci(num))
    
    # 列表推导式示例
    squares = [x**2 for x in range(1, 6)]
    print("\n1-5的平方数:", squares)
```

```javascript
// JavaScript 示例 (ES6箭头函数+Promise)
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Data received:', data);
        resolve(data);
      })
      .catch(reject);
  });
};

// 可选链操作符示例
const user = { profile: { name: 'Alice' } };
console.log(user?.profile?.age || 'Age not set');
```

```java
// Java 示例 (Stream API)
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> languages = Arrays.asList("Python", "Java", "JavaScript");
        
        languages.stream()
            .filter(lang -> lang.startsWith("J"))
            .map(String::toUpperCase)
            .forEach(System.out::println);
    }
}
```

```sql
-- SQL 示例 (CTE递归查询)
WITH RECURSIVE fibonacci(n, a, b) AS (
    SELECT 1, 0, 1
    UNION ALL
    SELECT n + 1, b, a + b 
    FROM fibonacci 
    WHERE n < 10
)
SELECT a FROM fibonacci;
```

```rust
// Rust 示例 (模式匹配+错误处理)
use std::fs::File;

fn read_file(path: &str) -> Result<String, std::io::Error> {
    let mut file = File::open(path)?;
    let mut contents = String::new();
    std::io::Read::read_to_string(&mut file, &mut contents)?;
    Ok(contents)
}

fn main() {
    match read_file("example.txt") {
        Ok(text) => println!("文件内容: {}", text),
        Err(e) => eprintln!("错误: {}", e),
    }
}
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

// https://mdit-plugins.github.io/zh/

import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { getConfig } from "../config/index.js";
// import MarkdownIt from "markdown-it";
import MarkdownItAsync, {
  MarkdownItAsync as MarkdownIt,
} from "markdown-it-async";
import markdownitsub from "markdown-it-sub";
import markdownitsup from "markdown-it-sup";
import markdownitfootnote from "markdown-it-footnote";
import markdownitdeflist from "markdown-it-deflist";
import markdownitabbr from "markdown-it-abbr";
import { full as markdownitemoji } from "markdown-it-emoji";
import markdownitcontainer from "markdown-it-container";
import markdownitins from "markdown-it-ins";
import markdownitmark from "markdown-it-mark";
import markdownitanchor from "markdown-it-anchor";
import markdownittocdoneright from "markdown-it-toc-done-right";
import markdownitattrs from "markdown-it-attrs";
// import Shiki from '@shikijs/markdown-it';
import { codeToHtml, ShikiTransformer } from "shiki";
import { alert as markdownitalert } from "@mdit/plugin-alert";
import { figure as markdownitfigure } from "@mdit/plugin-figure";
import { imgLazyload as markdownitImgLazyload } from "@mdit/plugin-img-lazyload";
import { imgSize, obsidianImgSize } from "@mdit/plugin-img-size";
import { katex as markdownitkatex } from "@mdit/plugin-katex";
import { plantuml as markdownitplantuml } from "@mdit/plugin-plantuml";
import { ruby as markdownitruby } from "@mdit/plugin-ruby";
import { spoiler as markdownitspoiler } from "@mdit/plugin-spoiler";
import { tasklist as markdownittasklist } from "@mdit/plugin-tasklist";
import { getPre } from "./index.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * 添加自定义容器
 */
const addCustomContainer = (
  md: MarkdownIt,
  container: { name: string; title: string }[]
) => {
  container.forEach((item) => {
    md.use(markdownitcontainer, item.name, {
      render: function (tokens: MarkdownItContainerTokenType[], idx: number) {
        const m = tokens[idx].info.split(" ");
        if (tokens[idx].nesting === 1) {
          return `<div class="custom-container custom-container-${
            item.name
          }"><div class="custom-container-title">${
            m.length > 2 ? md.utils.escapeHtml(m[2]) : item.title
          }</div>\n`;
        } else {
          return "</div>\n";
        }
      },
    });
  });
};

const alertTitleMap: Record<string, string> = {
  info: "信息",
  note: "注",
  warning: "警告",
  tip: "提示",
  danger: "危险",
  details: "详情",
  caution: "危险",
  important: "重要",
};

// 代码行高亮
const codeHighlightedTransformer: ShikiTransformer = {
  name: "codeHighlightedTransformer",
  line(node, line) {
    if (node.children.length > 0) {
      let children = (
        node.children[node.children.length - 1] as {
          children: { type: string; value: string }[];
        }
      ).children;
      if (children.length > 0) {
        if (children[children.length - 1].type === "text") {
          if (
            children[children.length - 1].value.trim() ===
            "// [!code highlight]"
          ) {
            this.addClassToHast(node, "shiki-line-highlight");
            node.children.pop();
          }
          if (
            children[children.length - 1].value.trim() === "// [!code focus]"
          ) {
            this.addClassToHast(node, "shiki-line-focus");
            node.children.pop();
          }
          if (children[children.length - 1].value.trim() === "// [!code --]") {
            this.addClassToHast(node, "shiki-line-diff-remove");
            node.children.pop();
          }
          if (children[children.length - 1].value.trim() === "// [!code ++]") {
            this.addClassToHast(node, "shiki-line-diff-add");
            node.children.pop();
          }
          if (
            children[children.length - 1].value.trim() === "// [!code error]"
          ) {
            this.addClassToHast(node, "shiki-line-error");
            node.children.pop();
          }
          if (
            children[children.length - 1].value.trim() === "// [!code warning]"
          ) {
            this.addClassToHast(node, "shiki-line-warning");
            node.children.pop();
          }
        }
      }
    }
  },
};

const md = MarkdownItAsync({
  html: true, // 可以识别html
  xhtmlOut: true,
  breaks: true, // 回车换行
  langPrefix: "language-",
  linkify: true, // 自动检测链接文本
  typographer: true, // 优化排版，标点
  quotes: "“”‘’",
  async highlight(code, lang) {
    const html = await codeToHtml(code, {
      lang: lang,
      themes: {
        dark: "min-dark",
        light: "min-light",
      },
      defaultColor: false,
      transformers: [codeHighlightedTransformer],
    });
    return html;
  },
})
  .use(markdownitsub) // 下标
  .use(markdownitalert, {
    deep: true,
    titleRender: (tokens, idx) => {
      const token = tokens[idx];
      const content = token.content.trim();
      return `<div class="markdown-alert-title">${
        alertTitleMap[content] || content
      }</div>`;
    },
  }) // GFM 风格的警告
  .use(markdownitsup) // 上标
  .use(markdownitfootnote) // 脚注
  .use(markdownitdeflist) // 定义列表
  .use(markdownitabbr) // 缩写
  .use(markdownitemoji) // 表情
  .use(markdownitins) // 插入
  .use(markdownitmark) // 标记
  .use(markdownitfigure) // 标题图片
  .use(markdownitanchor, {
    permalink: markdownitanchor.permalink.headerLink({
      safariReaderFix: true,
      class: "header-anchor",
    }),
  }) // 标题锚点
  .use(markdownitImgLazyload) // 图片懒加载
  .use(imgSize) // 新格式 图片尺寸
  .use(obsidianImgSize) // Obsidian 格式 图片尺寸
  .use(markdownitkatex) // 公式
  .use(markdownitplantuml) // uml
  .use(markdownitruby) // ruby拼音
  .use(markdownitspoiler) // 隐藏内容
  .use(markdownittasklist) // 任务列表
  .use(markdownittocdoneright, {
    containerClass: "article-outline-of-contents",
    linkClass: "article-outline-link",
  }) // 目录
  .use(markdownitattrs, {
    leftDelimiter: "{",
    rightDelimiter: "}",
    allowedAttributes: ["id", "class", "style", "data-*", "title", "target"], // 为空数组时支持所有属性，当然这是不安全的
  }); // 属性{}

// 添加自定义容器
addCustomContainer(md, [
  {
    name: "info",
    title: "信息",
  },
  {
    name: "tip",
    title: "提示",
  },
  {
    name: "warning",
    title: "警告",
  },
  {
    name: "danger",
    title: "危险",
  },
]);
md.use(markdownitcontainer, "details", {
  render: function (tokens: MarkdownItContainerTokenType[], idx: number) {
    const m = tokens[idx].info.split(" ");
    if (tokens[idx].nesting === 1) {
      return `<details class="custom-container custom-container-details"><summary class="custom-container-title">${
        m.length > 2 ? md.utils.escapeHtml(m[2]) : "详情"
      }</summary>\n`;
    } else {
      return "</details>\n";
    }
  },
});

// 禁止将电子邮件转换为链接
md.linkify.set({ fuzzyEmail: false });

/**
 * 解析markdown文件顶部的yaml数据
 * @param name 文件名称
 * @returns
 */
const parseYaml = (name: string) => {
  try {
    const APP_INFO = getConfig("app") as ConfigApp;
    const text = fs.readFileSync(
      path.resolve(__dirname, ".." + APP_INFO.docs + "/" + name + ".md"),
      "utf-8"
    );
    return matter(text);
  } catch (_err) {
    return {
      data: null,
      content: null,
    };
  }
};

/**
 * 解析markdown文本
 * @param text markdown文本
 */
const parseMd = async (title: string, outline: ConfigOutline, text: string) => {
  text = `<article class="article-content"><h1>${title}</h1>\n${text}<footer class="article-footer"><div class="article-info"></div><nav></nav></footer></article><div class="article-outline-content"><div class="article-outline-title">${outline.label}</div>\n\n[toc]\n\n</div>`;
  return md.renderAsync(text);
};

export { parseYaml, parseMd };

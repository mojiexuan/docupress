import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { getConfig } from "../config";
import markdownit from "markdown-it";
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
import hljs from "highlight.js";
import { getPre } from "./";

/**
 * 添加自定义容器
 */
const addCustomContainer = (
  md: markdownit,
  container: { name: string; title: string }[]
) => {
  container.forEach((item) => {
    md.use(markdownitcontainer, item.name, {
      render: function (tokens: MarkdownItContainerTokenType[], idx: number) {
        const m = tokens[idx].info.split(" ");
        if (tokens[idx].nesting === 1) {
          return `<div class="custom-container custom-container-${item.name}"><div class="custom-container-title">${m.length > 2 ? md.utils.escapeHtml(m[2]) : item.title}</div>\n`;
        } else {
          return "</div>\n";
        }
      },
    });
  });
};

const md = markdownit({
  html: true, // 可以识别html
  xhtmlOut: true,
  breaks: true, // 回车换行
  langPrefix: "language-",
  linkify: true, // 自动检测链接文本
  typographer: true, // 优化排版，标点
  quotes: "“”‘’",
  highlight: function (str, lang): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return getPre(
          lang,
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        );
      } catch (__) {}
    }
    return getPre(lang, md.utils.escapeHtml(str));
  },
})
  .use(markdownitsub) // 下标
  .use(markdownitsup) // 上标
  .use(markdownitfootnote) // 脚注
  .use(markdownitdeflist) // 定义列表
  .use(markdownitabbr) // 缩写
  .use(markdownitemoji) // 表情
  .use(markdownitins) // 插入
  .use(markdownitmark) // 标记
  .use(markdownitanchor, {
    permalink: markdownitanchor.permalink.headerLink({
      safariReaderFix: true,
      class: "header-anchor",
    }),
  }) // 标题锚点
  .use(markdownittocdoneright, {
    containerClass: "article-outline-of-contents",
    linkClass: "article-outline-link",
  }) // 目录
  .use(markdownitattrs, {
    leftDelimiter: "{",
    rightDelimiter: "}",
    allowedAttributes: ["id", "class", "style", "data-*", "title"], // 为空数组时支持所有属性，当然这是不安全的
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
      return `<details class="custom-container custom-container-details"><summary class="custom-container-title">${m.length > 2 ? md.utils.escapeHtml(m[2]) : '详情'}</summary>\n`;
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
const parseMd = (title: string, outline: ConfigOutline, text: string) => {
  text = `<article class="article-content"><h1>${title}</h1>\n${text}<footer class="article-footer"><div class="article-info"></div><nav></nav></footer></article><div class="article-outline-content"><div class="article-outline-title">${outline.label}</div>\n\n[toc]\n\n</div>`;
  return md.render(text);
};

export { parseYaml, parseMd };

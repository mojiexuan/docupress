import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { parseMd, parsePagination, parseYaml } from "../utils";
import nunjucks from "nunjucks";

const __dirname = dirname(fileURLToPath(import.meta.url));
nunjucks.configure(resolve(__dirname, "../views"), {
  autoescape: false,
  noCache: process.env.NODE_ENV === "development",
});

interface ParseResult extends YamlApp {
  content?: string;
  url?: string;
  pagination?: {
    prev?: YamlArticleSidebarItem;
    next?: YamlArticleSidebarItem;
  };
}

/**
 * 解析
 */
async function parse(
  input: string,
  link: string,
  config: Config,
): Promise<ParseResult> {
  // 解析md，分离yaml
  let { yaml, content } = parseYaml(input);
  yaml = yaml ?? {};
  content = content ?? "";
  // 加载配置
  let data = { ...config.app, ...yaml, url: link };

  if (link === "/") {
    return { ...data };
  }

  // 内容
  content = await parseMd(content ?? "", data.title, data.outline);
  // 获取页
  const pagination = parsePagination(link, data.sidebar);
  return { ...data, content, pagination };
}

/**
 * 渲染
 */
function render(data: ParseResult) {
  if (data.url && data.url === "/") {
    return nunjucks.render("index.njk", data);
  }
  return nunjucks.render("article.njk", data);
}

export { parse, render };

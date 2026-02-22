import { parseMd, parsePagination, parseYaml } from "../utils";
import nunjucks from "nunjucks";

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
  if (!yaml && !content) {
    yaml = {};
  }
  // 加载配置
  let data = { ...config.app, ...yaml };
  // 内容
  content = await parseMd(content ?? "", data.title, data.outline);
  // 获取页
  const pagination = parsePagination(link, data.sidebar);
  return { ...data, content, pagination, url: link };
}

/**
 * 渲染
 */
function render(data: ParseResult) {
  return nunjucks.render("", data);
}

export { parse, render };

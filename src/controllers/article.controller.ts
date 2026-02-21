import { FastifyReply, FastifyRequest } from "fastify";
import { getConfig } from "../config/index.js";
import { parseMd, parseYaml, parsePagination } from "../utils/index.js";

export const articleController = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const APP_INFO = getConfig("app") as YamlApp;
  const article = (req.params as { article: string }).article;

  if (!article) {
    return reply.status(400).send({ error: "参数异常" });
  }

  // 解析md，分离yaml
  let { data, content } = parseYaml(article);

  data = { ...APP_INFO, ...data };

  // 内容区
  content = await parseMd(content, data.title, APP_INFO.outline);

  // 获取页
  const pagination = parsePagination(article);

  return reply.view("article", {
    ...data,
    content,
    title: data?.title ?? "" + APP_INFO.name ?? "",
    url: "/" + article,
  });
};

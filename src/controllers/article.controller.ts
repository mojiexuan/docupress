import { FastifyReply, FastifyRequest } from "fastify";
import { getConfig } from "../config/index.js";
import { parseMd, parseYaml } from "../utils/index.js";

export const articleController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const APP_INFO = getConfig("app") as ConfigApp;
  const article = (req.params as { article: string }).article;

  if (!article) {
    return reply.status(400).send({ error: "参数异常" });
  }

  let { data, content } = parseYaml(article);

  if (APP_INFO.sidebar && data && data.sidebar) {
    delete APP_INFO.sidebar;
  }

  if (APP_INFO.sidebar && data && !data.sidebar) {
    data.sidebar = APP_INFO.sidebar;
  }

  content = await parseMd(
    (data as PageData).title,
    APP_INFO.outline,
    content ? content : ""
  );
  return reply.view("article", {
    ...APP_INFO,
    ...data,
    content,
    title: data?.title + APP_INFO.name,
    url: "/" + article,
    time:data?.time ?? APP_INFO.time
  });
};

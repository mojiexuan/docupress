import { FastifyReply, FastifyRequest } from "fastify";
import { getConfig } from "../config";
import { parseMd, parseYaml } from "../utils/md.utils";

export const articleController = (req:FastifyRequest, reply:FastifyReply) => {
  const APP_INFO = getConfig("app") as ConfigApp;
  const article = (req.params as { article: string }).article;
  let { data,content } = parseYaml(article);
  content = parseMd((data as PageData).title,APP_INFO.outline,content ? content : "");
  reply.view('article', {
    ...APP_INFO,
    ...data,
    content,
    title: "文章-"+APP_INFO.name,
  });
};
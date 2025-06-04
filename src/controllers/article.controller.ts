import { FastifyReply, FastifyRequest } from "fastify";
import { getConfig } from "../config/index.js";
import { parseMd, parseYaml } from "../utils/index.js";

export const articleController = (req:FastifyRequest, reply:FastifyReply) => {
  const APP_INFO = getConfig("app") as ConfigApp;
  const article = (req.params as { article: string }).article;
  let { data,content } = parseYaml(article);
  content = parseMd((data as PageData).title,APP_INFO.outline,content ? content : "");
  reply.view('article', {
    ...APP_INFO,
    ...data,
    content,
    title: data?.title+APP_INFO.name,
    url: '/'+article,
  });
};
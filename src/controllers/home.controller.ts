import { FastifyReply, FastifyRequest } from "fastify";
import { getConfig } from "../config/index.js";
import { parseYaml } from "../utils/index.js";

export const homeController = (req:FastifyRequest, reply:FastifyReply) => {
  const APP_INFO = getConfig("app") as ConfigApp;
  const { data } = parseYaml("index");
  reply.view('index', {
    ...APP_INFO,
    ...data
  });
};
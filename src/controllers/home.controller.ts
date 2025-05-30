import { FastifyReply, FastifyRequest } from "fastify";
import { getConfig } from "../config";
import { parseYaml } from "../utils/md.utils";

export const homeController = (req:FastifyRequest, reply:FastifyReply) => {
  const APP_INFO = getConfig("app") as ConfigApp;
  const { data } = parseYaml("index");
  reply.view('index', {
    ...APP_INFO,
    ...data
  });
};
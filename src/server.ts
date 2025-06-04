// 引入fastify框架
import Fastify, { FastifyInstance } from "fastify";
import { getConfig, loadConfig } from "./config/index.js";
import logger from "./logger.js";
import userRouter from "./routes/user.router.js";
import path from "path";
import nunjucks from "nunjucks";
import fastifyView from "@fastify/view";
import fastifyStatic from "@fastify/static";
import errorHandlerPlugin from "./plugins/error-handler-plugin.js";
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// 创建Fastify实例
const app: FastifyInstance = Fastify({
  logger: false,
});

/**
 * 初始化服务
 */
const initServer = () => {
  // 加载配置文件
  loadConfig();

  logger.info("开始注册相关插件...");

  app.register(errorHandlerPlugin);

  // 注册静态文件插件
  app.register(fastifyStatic, {
    root: path.join(__dirname, getConfig("app").public), // 静态文件目录
    prefix: "/", // 访问前缀
  });

  // 注册模板引擎
  app.register(fastifyView, {
    engine: {
      nunjucks: nunjucks,
    },
    templates: path.join(__dirname, "/views"),
    viewExt: "njk", // 模板文件扩展名
    options: {
      autoescape: true, // 自动转义 HTML
      noCache: true, // 开发环境禁用缓存
    },
  });

  app.register(userRouter, { prefix: "/" });

  logger.info("插件注册成功");
};

// 运行服务
const startServer = async () => {
  try {
    initServer();

    const APP_INFO = getConfig("app") as ConfigApp;

    logger.info(`正在启动服务，端口: ${APP_INFO.port}...`);
    const address = await app.listen({
      port: APP_INFO.port,
      host: APP_INFO.host,
    });
    logger.info(`
      =========================================
      ${APP_INFO.name} 服务运行中!
      访问地址: ${address}
      =========================================
    `);
    return app;
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

export default startServer;

/// <reference path="./types/global.d.ts" />
import startServer from "./server.js";
import logger from "./logger.js";

async function initApplication() {
  try {
    logger.info("The application is being launched ..");
    // 启动Web服务器
    await startServer();
  } catch (error) {
    logger.error("Failed to launch the application:", error);
    process.exit(1);
  }
}

// 执行应用程序初始化
initApplication();

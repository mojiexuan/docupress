/// <reference path="./types/global.d.ts" />
import startServer from "./server";
import logger from "./logger";

async function initApplication() {
  try {
    logger.info("正在启动应用程序...");
    // 启动Web服务器
    await startServer();
  } catch (error) {
    logger.error("启动应用程序失败:", error);
    process.exit(1);
  }
}

// 执行应用程序初始化
initApplication();

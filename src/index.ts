/// <reference path="./types/global.d.ts" />
import { join, resolve } from "path";
import { createServer } from "http";
import { existsSync, mkdirSync, writeFileSync, rmSync } from "fs";
import sirv from "sirv";
import { getErrorMessage } from "./utils/error.utils";
import { findPwd, getFilesMapping } from "./utils/file.utils";
import { loadConfig } from "./config";
import { parse, render } from "./services";

/**
 * 构建
 */
function build(path: string = "") {
  // 获取工作目录
  const pwd = findPwd(path);
  // .docupress目录
  const _docupress = resolve(join(pwd, ".docupress"));
  if (!existsSync(_docupress)) {
    try {
      // 创建 .docupress 目录
      mkdirSync(_docupress);
    } catch (error) {
      console.error(
        `Failed to create the .docupress directory:`,
        getErrorMessage(error),
      );
      return;
    }
  }
  // 获取配置
  const configPath = resolve(join(_docupress, ".config.yaml"));
  const appConfig = loadConfig(configPath);
  // 输出目录
  const outputDir = resolve(join(_docupress, "dist"));
  if (existsSync(outputDir)) {
    try {
      // 删除输出目录
      rmSync(outputDir, { recursive: true, force: true });
    } catch (error) {
      console.error(
        `Failed to delete the dist directory:`,
        getErrorMessage(error),
      );
      return;
    }
  }
  try {
    // 创建输出目录
    mkdirSync(outputDir);
  } catch (error) {
    console.error(
      `Failed to create the output directory:`,
      getErrorMessage(error),
    );
    return;
  }
  //
  getFilesMapping(pwd).then((maps) => {
    maps.forEach(async (map) => {
      // 解析数据
      const parsed = await parse(map.input, map.link, appConfig);
      // 渲染模板
      const renderStr = render(parsed);
      // 写入文件
      writeFileSync(map.output, renderStr, "utf-8");
      console.log(`${map.link}: ${map.input} -> ${map.output}`);
    });
  });
}

/**
 * 热更新
 */
function dev(path: string = "") {
  // 获取工作目录
  const pwd = findPwd(path);
  // .docupress目录
  const _docupress = resolve(join(pwd, ".docupress"));
}

/**
 * 预览
 */
function preview(path: string = "") {
  // 获取工作目录
  const pwd = findPwd(path);
  // .docupress目录
  const _docupress = resolve(join(pwd, ".docupress"));
  // 输出目录
  const distDir = resolve(join(_docupress, "dist"));
  if (!existsSync(distDir)) {
    console.error(
      `The dist directory does not exist. Please run "docupress build docs" first.`,
    );
    return;
  }
  // 获取配置
  const configPath = resolve(join(_docupress, ".config.yaml"));
  const appConfig = loadConfig(configPath);
  // 服务信息
  const host = appConfig.app.host || "0.0.0.0";
  const port = appConfig.app.port || 5210;
  // 启动静态文件服务器
  const handler = sirv(distDir, { single: true });
  const server = createServer(handler);
  server.listen(port, host, () => {
    console.log(`Preview server running at http://localhost:${port}`);
  });
}

export { build, dev, preview };

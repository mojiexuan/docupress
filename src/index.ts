/// <reference path="./types/global.d.ts" />
import { join, resolve } from "path";
import { existsSync, mkdirSync, writeFileSync, rmSync } from "fs";
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
}

export { build, dev, preview };

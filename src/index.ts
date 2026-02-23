/// <reference path="./types/global.d.ts" />
import { join, resolve, dirname } from "path";
import { createServer } from "http";
import { existsSync, mkdirSync, writeFileSync, rmSync } from "fs";
import sirv from "sirv";
import chokidar from "chokidar";
import { WebSocketServer, WebSocket } from "ws";
import { getErrorMessage } from "./utils/error.utils";
import { findPwd, getFilesMapping } from "./utils/file.utils";
import { loadConfig } from "./config";
import { parse, render } from "./services";
import debounce from "./utils/debounce.utils";

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

// WS 客户端注入脚本
const WS_INJECT_SCRIPT = `<script>
  (function(){
    const ws = new WebSocket(\`ws://\${location.host}\`);
    ws.onmessage = () => location.reload();
    ws.onclose = () => setTimeout(() => location.reload(), 1000);
  })();
  </script>`;

/**
 * 热更新
 */
function dev(path: string = "") {
  // 获取工作目录
  const pwd = findPwd(path);
  // .docupress目录
  const _docupress = resolve(join(pwd, ".docupress"));
  if (!existsSync(_docupress)) {
    try {
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
  let appConfig = loadConfig(configPath);
  // 输出目录
  const outputDir = resolve(join(_docupress, "dist"));
  // 映射目录
  let mappings: { input: string; link: string; output: string }[] = [];
  // ws
  let wss: WebSocketServer;

  /**
   * 构建文件
   * @param map 映射
   */
  async function buildFile(map: {
    input: string;
    link: string;
    output: string;
  }) {
    // 解析
    const parsed = await parse(map.input, map.link, appConfig);
    // 注入脚本
    const html = render(parsed).replace(
      "</body>",
      WS_INJECT_SCRIPT + "</body>",
    );
    mkdirSync(dirname(map.output), { recursive: true });
    // 写入文件
    writeFileSync(map.output, html, "utf-8");
    console.log(`[dev] ${map.link}: ${map.input} -> ${map.output}`);
  }

  /**
   * 全量构建
   */
  async function fullBuild() {
    // 输出目录已存在的话先删除
    if (existsSync(outputDir)) {
      rmSync(outputDir, { recursive: true, force: true });
    }
    // 重新创建
    mkdirSync(outputDir, { recursive: true });
    // 获取映射
    mappings = await getFilesMapping(pwd);
    // 批量构建
    await Promise.all(mappings.map(buildFile));
    console.log(`[dev] Full build complete. ${mappings.length} files.`);
  }

  /**
   * 广播消息
   * @param data 数据消息
   */
  function broadcast(data: object) {
    // 未启动
    if (!wss) return;
    // json
    const msg = JSON.stringify(data);
    // 循环所有客户端进行分发
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  }

  // 初始全量构建
  fullBuild().then(() => {
    // 服务配置
    const host = appConfig.app.host || "0.0.0.0";
    const port = appConfig.app.port || 5210;
    // 启动静态文件服务
    const handler = sirv(outputDir, { single: true, dev: true });
    const server = createServer(handler);
    // ws服务
    wss = new WebSocketServer({ server });
    server.listen(port, host, () => {
      console.log(`[dev] Dev server running at http://localhost:${port}`);
    });

    // 监听目录文件
    const watcher = chokidar.watch([pwd, configPath], {
      ignoreInitial: true,
      ignored: [join(_docupress, "dist/**")], // 忽略dist目录
    });

    /**
     * 文件变化回调
     */
    watcher.on("all", (_event, filePath) => {
      // 绝对路径
      const normalizedPath = resolve(filePath);
      // 防抖
      debounce(async () => {
        try {
          if (normalizedPath === resolve(configPath)) {
            // 配置文件变更，全量更新
            console.log(`[dev] Config changed, rebuilding...`);
            // 重新加载配置
            appConfig = loadConfig(configPath);
            // 全量构建
            await fullBuild();
            // 广播
            broadcast({ type: "reload" });
          } else if (normalizedPath.endsWith(".md")) {
            // markdown文件变更，增量更新

            // 寻找映射记录
            const map = mappings.find(
              (m) => resolve(m.input) === normalizedPath,
            );
            // 存在记录
            if (map) {
              console.log(`[dev] File changed: ${map.link}`);
              // 单文件构建
              await buildFile(map);
              // 广播
              broadcast({ type: "reload", file: map.link });
            } else {
              console.log(`[dev] New file detected, rebuilding...`);
              // 不存在，则全量构建，可能变化较大
              await fullBuild();
              // 广播
              broadcast({ type: "reload" });
            }
          }
        } catch (error) {
          console.error(`[dev] Build error:`, getErrorMessage(error));
        }
      }, 1000);
    });
  });
}

export { build, dev, preview };

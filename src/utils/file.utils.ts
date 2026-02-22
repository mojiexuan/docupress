import { readdir, stat } from "fs/promises";
import { resolve, join, relative } from "path";
import { existsSync } from "fs";
import { getErrorMessage } from "./error.utils";

/**
 * 寻找工作目录
 */
function findPwd(path: string = ""): string {
  // 拼接路径
  let pwd = resolve(process.cwd(), path);
  // 是否存在
  if (!existsSync(pwd)) {
    return process.cwd();
  }
  return pwd;
}

// 类型定义
interface WalkOptions {
  includeDirs?: boolean; // 是否包含目录
  filterFn?: (path: string, stats: import("fs").Stats) => boolean; // 过滤函数
  maxDepth?: number; // 最大递归深度
  currentDepth?: number;
}

/**
 * 递归获取目录下所有文件（异步）
 * @param dirPath - 起始目录路径
 * @param options - 配置选项
 * @returns Promise<string[]> - 文件路径数组
 */
async function walkDir(
  dirPath: string,
  options: WalkOptions = {},
): Promise<string[]> {
  const {
    includeDirs = false,
    filterFn = null,
    maxDepth = Infinity,
    currentDepth = 0,
  } = { ...options, currentDepth: options.currentDepth || 0 };

  // 深度限制检查
  if (currentDepth > maxDepth) {
    return [];
  }

  try {
    // 异步读取目录内容
    const entries = await readdir(dirPath);
    // 存储结果
    const results: string[] = [];

    // 使用 for...of 而不是 map，避免并行读取可能导致的文件句柄过多
    for (const entry of entries) {
      // 完整路径
      const fullPath = join(dirPath, entry);

      try {
        // 获取文件或目录的状态信息
        const stats = await stat(fullPath);

        // 目录
        if (stats.isDirectory()) {
          if (includeDirs && (!filterFn || filterFn(fullPath, stats))) {
            results.push(fullPath);
          }

          // 递归处理子目录
          const subResults = await walkDir(fullPath, {
            ...options,
            currentDepth: currentDepth + 1,
          });
          results.push(...subResults);
        } else if (!filterFn || filterFn(fullPath, stats)) {
          // 文件
          results.push(fullPath);
        }
      } catch (error) {
        console.error(`Cannot access ${dirPath}:`, getErrorMessage(error));
        continue;
      }
    }
    return results;
  } catch (error) {
    console.error(
      `Unable to read directory ${dirPath}:`,
      getErrorMessage(error),
    );
    return [];
  }
}

/**
 * 获取所有文件
 * @param dirPath 目录
 * @returns
 */
async function getAllFiles(dirPath: string): Promise<string[]> {
  return walkDir(dirPath, { includeDirs: false });
}

/**
 * 获取特定扩展名的文件
 * @param dirPath 目录
 * @param extensions 支持的扩展名
 * @returns
 */
async function getFilesByExtension(
  dirPath: string,
  extensions: string[],
): Promise<string[]> {
  // 规范扩展名
  const extSet = new Set(
    extensions.map((ext) => (ext.startsWith(".") ? ext : `.${ext}`)),
  );

  // 获取文件
  return walkDir(dirPath, {
    filterFn: (path) => extSet.has(path.substring(path.lastIndexOf("."))),
  });
}

/**
 * 业务工具,获取目录及输出目录
 * @param dirPath 目录
 */
async function getFilesMapping(
  dirPath: string,
): Promise<{ input: string; link: string; output: string }[]> {
  const files = await getFilesByExtension(dirPath, [".md"]);
  return files.map((file) => {
    // 解析相对路径
    const relativePath = relative(dirPath, file);
    // 构建输出目录
    const outputPath = join(dirPath, ".docupress", "dist", relativePath);
    // 访问链接
    let link = "/" + relativePath;
    // 移除 .md
    if (link.endsWith(".md")) {
      link = link.slice(0, -3);
    }
    // 处理 index
    if (link === "/index") {
      link = "/";
    }
    return {
      input: file,
      link,
      output: outputPath,
    };
  });
}

export { findPwd, walkDir, getAllFiles, getFilesByExtension, getFilesMapping };

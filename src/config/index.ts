// src/config/index.ts
import { readFileSync } from "fs";
import path from "path";
import { parse } from "yaml";
import logger from "../logger.js";
import { getNowDate } from "../utils/index.js";
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// 定义一个变量来缓存配置对象，初始值为 null
const configCache: Config = {
  app: {
    name: "DocuPress",
    favicon: "/favicon.ico",
    description: "一个SEO友好的博客、文档及知识库管理工具",
    tagline: "代码󠇗笔󠆐墨󠅱 心若󠇗星󠆅河󠅼 创意󠇘通󠆭灵󠆙",
    keywords:
      "DocuPress、码界轩、博客、文档、SEO、博客系统、文档系统、博客框架、文档框架、博客系统框架、文档系统框架",
    author: "陈佳宝, mail@chenjiabao.com",
    host: "0.0.0.0",
    port: 3000,
    public: "/public",
    docs: "/docs",
    operates: [
      {
        name: "首页",
        link: "/",
      },
      {
        name: "lang",
        list: [
          {
            name: "zh-CN",
            value: "中文",
          },
          {
            name: "en-US",
            value: "English",
          },
        ],
      },
      {
        name: "theme",
      },
      {
        name: "github",
        link: "https://github.com/majiexuan",
        blank: true,
      },
    ],
    menu: {
      label: "菜单",
    },
    outline: {
      label: "页面导航",
    },
    time: getNowDate(),
  },
};
// 计时器
let timer: NodeJS.Timeout;

function setConfigCache(config: Config) {
  configCache.app.name = config.app.name ?? configCache.app.name;
  configCache.app.favicon = config.app.favicon ?? configCache.app.favicon;
  configCache.app.description =
    config.app.description ?? configCache.app.description;
  configCache.app.tagline = config.app.tagline ?? configCache.app.tagline;
  configCache.app.keywords = config.app.keywords ?? configCache.app.keywords;
  configCache.app.author = config.app.author ?? configCache.app.author;
  configCache.app.host = config.app.host ?? configCache.app.host;
  configCache.app.port = config.app.port ?? configCache.app.port;
  configCache.app.public = config.app.public ?? configCache.app.public;
  configCache.app.docs = config.app.docs ?? configCache.app.docs;
  configCache.app.operates = config.app.operates ?? configCache.app.operates;
  configCache.app.menu = config.app.menu ?? configCache.app.menu;
  configCache.app.outline = config.app.outline ?? configCache.app.outline;
  configCache.app.time = config.app.time ?? configCache.app.time;
  if (!config.app.time) {
    getLastUpdateDate();
  }
}

/**
 * 获取最后更新时间，每7天更新一次
 */
const getLastUpdateDate = () => {
  if (timer) {
    return;
  }
  if (configCache) {
    configCache.app.time = getNowDate();
  }
  timer = setInterval(() => {
    if (configCache) {
      configCache.app.time = getNowDate();
    }
  }, 1000 * 60 * 60 * 24 * 7);
};

/**
 * 加载配置
 */
export const loadConfig = () => {
  logger.info("开始加载配置文件...");
  try {
    // 根据运行环境构造配置文件的路径
    const yamlPath = path.resolve(__dirname, "../.config.yaml");
    // 读取配置文件内容
    const file = readFileSync(yamlPath, "utf8");
    // 解析 YAML 文件内容为 JavaScript 对象
    const parsedConfig = parse(file) as Config;
    // 将解析后的配置对象缓存起来
    setConfigCache(parsedConfig);
    logger.info("配置文件加载成功");
  } catch (error) {
    // 如果读取或解析配置文件失败，则打印错误信息并退出程序
    logger.error(`加载配置文件失败-${error}`);
    process.exit(1);
  }
};

// 读取配置
export const getConfig = (type: keyof Config) => {
  return configCache[type];
};

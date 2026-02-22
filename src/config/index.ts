// src/config/index.ts
import { readFileSync, existsSync } from "fs";
import { parse } from "yaml";
import { getNowDate } from "../utils/index.js";
import { getErrorMessage } from "../utils/error.utils.js";

// 配置缓存
let configCache: Config | null = null;

// 默认配置
const defaultConfig: Config = {
  app: {
    name: "DocuPress",
    favicon: "/favicon.ico",
    description: "一个SEO友好的博客、文档及知识库管理工具",
    slogan: "代码󠇗笔󠆐墨󠅱 心若󠇗星󠆅河󠅼 创意󠇘通󠆭灵󠆙",
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
            name: "中文",
            value: "zh-CN",
          },
          {
            name: "English",
            value: "en-US",
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

/**
 * 设置缓存
 * @param config 配置
 */
function setConfigCache(config: Config) {
  configCache = {
    app: {
      name: config.app.name ?? defaultConfig.app.name,
      favicon: config.app.favicon ?? defaultConfig.app.favicon,
      description: config.app.description ?? defaultConfig.app.description,
      slogan: config.app.slogan ?? defaultConfig.app.slogan,
      keywords: config.app.keywords ?? defaultConfig.app.keywords,
      author: config.app.author ?? defaultConfig.app.author,
      host: config.app.host ?? defaultConfig.app.host,
      port: config.app.port ?? defaultConfig.app.port,
      public: config.app.public ?? defaultConfig.app.public,
      docs: config.app.docs ?? defaultConfig.app.docs,
      operates: config.app.operates ?? defaultConfig.app.operates,
      menu: config.app.menu ?? defaultConfig.app.menu,
      outline: config.app.outline ?? defaultConfig.app.outline,
      time: config.app.time ?? defaultConfig.app.time,
    },
  };
}

/**
 * 加载配置
 * @param configPath 配置文件路径，不传就返回缓存的或默认的配置
 */
export const loadConfig = (configPath?: string): Config => {
  try {
    if (configPath && existsSync(configPath)) {
      // 读取配置文件内容
      const file = readFileSync(configPath, "utf8");
      // 解析 YAML 文件内容为 JavaScript 对象
      const parsedConfig = parse(file) as Config;
      // 将解析后的配置对象缓存起来
      setConfigCache(parsedConfig);
    }
  } catch (error) {
    console.error(`Error loading configuration file:`, getErrorMessage(error));
  }
  return configCache ?? defaultConfig;
};

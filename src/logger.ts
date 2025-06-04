// src/logger.ts

import {pino} from 'pino';

// 确定当前的运行环境
const isProduction = process.env.NODE_ENV === 'production';

// 创建Pino日志实例
const logger = pino({
  // 基本配置
  base: {
    pid: false,
  },

  // 时间戳配置
  timestamp: pino.stdTimeFunctions.isoTime,

  // 生产中异步生成日志
  transport: isProduction
    ? undefined
    : {
        target: 'pino-pretty',
        options: { 
          colorize: true,
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
          messageFormat: '{msg}',
          singleLine: true
        }
      },
});

export default logger;
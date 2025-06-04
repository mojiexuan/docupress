// src/errors/index.ts

import { GlobalError } from "./global.error.js";

// 定义一个 BadRequestError 类，表示 HTTP 400 错误。通常用于表示客户端请求错误。
export class BadRequestError extends GlobalError {
  constructor(message = "Bad Request", internalErrorNumber?: number) {
    super(message, 400, internalErrorNumber);
  }
}

// 定义一个 UnauthorizedError 类，表示 HTTP 401 错误。用于需要用户认证的情况。
export class UnauthorizedError extends GlobalError {
  constructor(message = "Unauthorized", internalErrorNumber?: number) {
    super(message, 401, internalErrorNumber);
  }
}

// 定义一个 ForbiddenError 类，表示 HTTP 403 错误。用于表示服务器拒绝执行此请求。
export class ForbiddenError extends GlobalError {
  constructor(message = "Forbidden", internalErrorNumber?: number) {
    super(message, 403, internalErrorNumber);
  }
}

// 定义一个 NotFoundError 类，表示 HTTP 404 错误。用于请求的资源不存在。
export class NotFoundError extends GlobalError {
  constructor(message = "Not Found", internalErrorNumber?: number) {
    super(message, 404, internalErrorNumber);
  }
}

// 定义一个 InternalServerError 类，表示 HTTP 500 错误。用于服务器内部错误。
export class InternalServerError extends GlobalError {
  constructor(message = "Internal Server Error", internalErrorNumber?: number) {
    super(message, 500, internalErrorNumber);
  }
}

// 定义一个 BadGatewayError 类，表示 HTTP 502 错误。用于作为网关或代理工作的服务器收到无效响应。
export class BadGatewayError extends GlobalError {
  constructor(message = "Bad Gateway", internalErrorNumber?: number) {
    super(message, 502, internalErrorNumber);
  }
}

// 定义一个 ServiceUnavailableError 类，表示 HTTP 503 错误。用于服务器暂不可用。
export class ServiceUnavailableError extends GlobalError {
  constructor(message = "Service Unavailable", internalErrorNumber?: number) {
    super(message, 503, internalErrorNumber);
  }
}

// 定义一个 GatewayTimeoutError 类，表示 HTTP 504 错误。用于网关超时。
export class GatewayTimeoutError extends GlobalError {
  constructor(message = "Gateway Timeout", internalErrorNumber?: number) {
    super(message, 504, internalErrorNumber);
  }
}

// 定义一个 NotImplementedError 类，表示 HTTP 501 错误。用于服务器不支持请求的功能。
export class NotImplementedError extends GlobalError {
  constructor(message = "Not Implemented", internalErrorNumber?: number) {
    super(message, 501, internalErrorNumber);
  }
}

// 定义一个 TooManyRequestsError 类，表示 HTTP 429 错误。用于客户端发送的请求过多。
export class TooManyRequestsError extends GlobalError {
  constructor(message = "Too Many Requests", internalErrorNumber?: number) {
    super(message, 429, internalErrorNumber);
  }
}


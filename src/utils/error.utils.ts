/**
 * 获取错误消息
 * @param error 错误
 */
export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  } else {
    return String(error);
  }
}

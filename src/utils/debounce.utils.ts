type Timing = {
  leading?: boolean;
  trailing?: boolean;
};

interface DebouncedFunction<TArgs extends unknown[], TResult> {
  (...args: TArgs): TResult | undefined;
  cancel: () => void;
}

/**
 * 防抖，支持立即执行第一次（leading）和延迟执行最后一次（trailing）
 * @author 陈佳宝
 * @date 2026-01-14
 * @param func 函数
 * @param delay 延迟时间，单位毫秒
 * @param timing 取值 "leading" | "trailing"
 */
const debounce = <TArgs extends unknown[], TResult>(
  func: (...args: TArgs) => TResult,
  delay: number,
  timing: Timing = { trailing: true },
): DebouncedFunction<TArgs, TResult> => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: TArgs | null = null;
  let result: TResult | undefined;

  const debounced = (...args: TArgs): TResult | undefined => {
    lastArgs = args;

    if (timing.leading && !timer) {
      result = func(...args);
    }

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      if (timing.trailing && lastArgs) {
        result = func(...lastArgs);
        lastArgs = null;
      }
      timer = undefined;
    }, delay);

    return result;
  };

  // 取消方法
  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
    lastArgs = null;
  };

  return debounced;
};

export default debounce;

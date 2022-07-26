import { useEffect, useState } from "react";

// 如果 value 为 null 或者 undefined，!value 返回 true
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) => value === undefined || value === null || value === '';

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (obj: {[key: string]: unknown}) => {
  // Object.assign({}, obj)
  const result = { ...obj };

  Object.keys(result).forEach((key) => {
    const value = result[key];
    // 如果 value 为 null 或者 undefined，就应该删除这个 param，不向后端传
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里加上 callback 会造成无限循环，这个和 useCallback 以及 useMemo 有关系
  }, []);
};


// 使用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在 value 变化后设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 如果 useEffect return 的是一个函数，那么该函数会在 useEffect 上次调用完成后，下一次调用开始前执行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

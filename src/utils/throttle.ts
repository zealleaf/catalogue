/* eslint-disable @typescript-eslint/no-explicit-any */
export const throttle = (fn: (p: any) => any, delay: number) => {
  let previous = 0
  // 使用闭包返回一个函数并且用到闭包函数外面的变量previous
  return function (...args: unknown[]) {
    const a = args
    const now: number = new Date().getTime()
    if (now - previous > delay) {
      fn(a)
      previous = now
    }
  }
}

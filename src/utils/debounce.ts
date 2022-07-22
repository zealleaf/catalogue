/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = (fn: (p: any) => any, delay: number) => {
  let timer: NodeJS.Timeout // 维护一个 timer
  return function (...args: unknown[]) {
    const a = args
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(a)
    }, delay)
  }
}

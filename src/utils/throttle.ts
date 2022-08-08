/* eslint-disable @typescript-eslint/no-explicit-any */
export const throttle = (fn: (p: any) => any, delay: number) => {
  let previous = 0
  return function (...args: unknown[]) {
    const a = args
    const now: number = new Date().getTime()
    if (now - previous > delay) {
      fn(a)
      previous = now
    }
  }
}

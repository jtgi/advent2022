export const clx = (...args: string[]) => {
  return args.filter(Boolean).join(" ")
}

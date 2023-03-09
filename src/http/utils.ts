export const resetParams = (params: any) => {
  let newParams: Record<string, any> = {}
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      newParams[key] = value !== '' ? value : undefined
    })
  }
  return newParams
}

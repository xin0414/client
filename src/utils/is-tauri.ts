export const isTauri = Boolean(
  typeof window !== 'undefined' &&
    window != undefined &&
    (window as any).__TAURI__ !== undefined &&
    (window as any).promisified !== null
)

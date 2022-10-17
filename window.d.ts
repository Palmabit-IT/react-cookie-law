interface Window {
  attachEvent?: (name: string, handler: () => void) => void
  detachEvent?: (name: string, handler: () => void) => void
}

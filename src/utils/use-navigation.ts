import { useState, useEffect } from 'react'

type NavigationHistory = {
  path: string
  timestamp: number
}

type UseNavigationReturnType = {
  currentPath: string
  navigationHistory: NavigationHistory[]
  canGoBack: boolean
  canGoForward: boolean
  navigateToPath: (path: string) => void
  goBack: () => void
  goForward: () => void
  refresh: () => void
}

export const useNavigation = (initialPath: string): UseNavigationReturnType => {
  const [currentPath, setCurrentPath] = useState(initialPath)
  const [navigationHistory, setNavigationHistory] = useState<
    NavigationHistory[]
  >([{ path: initialPath, timestamp: Date.now() }])
  const [historyIndex, setHistoryIndex] = useState(0)

  const canGoBack = historyIndex > 0
  const canGoForward = historyIndex < navigationHistory.length - 1

  const navigateToPath = (path: string) => {
    if (path === currentPath) {
      refresh()
      return
    }
    setCurrentPath(path)
    setNavigationHistory((prevHistory) => [
      ...prevHistory.slice(0, historyIndex + 1),
      { path, timestamp: Date.now() },
    ])
    setHistoryIndex((prevIndex) => prevIndex + 1)
  }

  const goBack = () => {
    if (canGoBack) {
      const previousHistoryIndex = historyIndex - 1
      const previousPath = navigationHistory[previousHistoryIndex].path
      setCurrentPath(previousPath)
      setHistoryIndex(previousHistoryIndex)
    }
  }

  const goForward = () => {
    if (canGoForward) {
      const nextHistoryIndex = historyIndex + 1
      const nextPath = navigationHistory[nextHistoryIndex].path
      setCurrentPath(nextPath)
      setHistoryIndex(nextHistoryIndex)
    }
  }

  const refresh = () => {
    const currentHistoryItem = navigationHistory[historyIndex]
    const currentPath = currentHistoryItem.path
    setCurrentPath(currentPath)
    setNavigationHistory((prevHistory) => [
      ...prevHistory.slice(0, historyIndex),
      { path: currentPath, timestamp: Date.now() },
    ])
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Backspace') {
        goBack()
      } else if (event.key === 'ArrowLeft' && event.ctrlKey) {
        goBack()
      } else if (event.key === 'ArrowRight' && event.ctrlKey) {
        goForward()
      } else if (event.key === 'r' && event.ctrlKey) {
        refresh()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goBack, goForward, refresh])

  return {
    currentPath,
    navigationHistory,
    canGoBack,
    canGoForward,
    navigateToPath,
    goBack,
    goForward,
    refresh,
  }
}

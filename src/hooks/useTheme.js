import { useEffect } from 'react'
import useLocalStorage from './useLocalStorage'
import { sanitizeTheme } from '../utils/validators'

function getInitialTheme() {
  // Follow the system setting on the first visit
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

function useTheme() {
  const [theme, setTheme] = useLocalStorage(
    'moneytrack-theme',
    getInitialTheme(),
    sanitizeTheme
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}

export default useTheme
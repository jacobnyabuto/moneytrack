import { useState, useEffect } from 'react'

function useLocalStorage(key, initialValue, sanitize = (value) => value) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? sanitize(JSON.parse(saved)) : initialValue
    } catch (error) {
      console.error(`Could not read "${key}" from localStorage:`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Could not save "${key}" to localStorage:`, error)
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
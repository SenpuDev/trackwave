import { useState, useEffect } from 'react'

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(window.localStorage.getItem('theme') || 'light')

  const toggleDarkMode = () => {
    setDarkMode((prevState) => prevState === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    if (darkMode === 'dark') {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
      window.localStorage.setItem('theme', 'dark')
    } else if (darkMode === 'light') {
      document.documentElement.classList.remove('dark')
      window.localStorage.removeItem('theme')
    }
  }, [darkMode])

  return (
    { toggleDarkMode, darkMode })
}

export default useDarkMode

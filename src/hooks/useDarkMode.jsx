import { useState, useEffect } from 'react'

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(!!window.localStorage.getItem('darkmode'))

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('bg-slate-200')
      document.body.classList.add('dark')
      document.body.classList.add('bg-slate-900')
      window.localStorage.setItem('darkmode', 'true')
    } else if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark')
      document.body.classList.remove('bg-slate-900')
      document.body.classList.add('bg-slate-200')
      window.localStorage.removeItem('darkmode')
    }
  }, [darkMode])

  return (
    { toggleDarkMode, darkMode })
}

export default useDarkMode

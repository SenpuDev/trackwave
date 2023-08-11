import { useState, useEffect, createContext } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
export const AuthContext = createContext()

// All components envolved with this context, check localstorage to try logging user
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Authenticate user if token detected
    const authUser = async () => {
      const AUTH_TOKEN = window.localStorage.getItem('auth_token')
      if (!AUTH_TOKEN) {
        setLoading(false)
        return
      }
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`
          }
        })
        const data = await response.json()
        setAuth(data)
      } catch (error) {
        console.log('Auth failed')
      }
      setLoading(false)
    }
    authUser()
  }, [])

  const logOut = () => {
    setAuth({})
    window.localStorage.removeItem('auth_token')
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, logOut }}>{children}</AuthContext.Provider>
  )
}

import { useState, useEffect, createContext } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
export const AuthContext = createContext()

// All components envolved with this context, check localstorage to try logging user
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => { // Authenticate user if token detected
    const token = window.localStorage.getItem('token')

    const authUser = async () => {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        const data = await response.json()
        data.token = token
        setAuth(data)

        // const isRootPath = location.pathname === '/'
        // isRootPath && navigate('/projects')
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }

    authUser()
  }, [])

  const logOut = () => {
    setAuth({})
    window.localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, logOut }}>{children}</AuthContext.Provider>
  )
}

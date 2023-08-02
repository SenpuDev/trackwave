import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Spinner from '../components/Spinner'

const PrivateAreaLayout = () => {
  const { auth, loading } = useAuth()
  if (loading) return <Spinner />

  return (
    <>
      {auth._id
        ? (
          <div className='h-screen'>
            <Header />

            <div className='md:flex'>
              <Sidebar />
              <main className='flex-1 m-10'>
                <Outlet />
              </main>
            </div>
          </div>
          )
        : <Navigate to='/' />}
    </>
  )
}

export default PrivateAreaLayout

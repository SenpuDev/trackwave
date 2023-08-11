import { Outlet } from 'react-router-dom'
import DarkModeButton from '../components/DarkModeButton'

const AuthLayout = () => {
  return (
    <>
      <main className='container mx-auto flex justify-center px-5 mt-20'>
        <div className='w-full md:w-5/6 xl:w-1/2 bg-white dark:bg-slate-800 shadow rounded-lg transition-all'>
          <div className='mx-auto mt-4 w-10/12'>
            <DarkModeButton />
          </div>
          <h1 className='font-black text-center text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 transition-all pb-4 sm:text-7xl select-none'>TrackWave</h1>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AuthLayout

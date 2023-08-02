import { Link, useLocation } from 'react-router-dom'
import DarkModeButton from './DarkModeButton'
import SearchBar from './SearchBar'

const Header = () => {
  const location = useLocation()
  return (
    <header className='flex justify-between items-center h-[10%] px-10'>

      <Link to='/projects'>
        <h1 className='font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 transition-all pb-2 sm:text-4xl text-3xl select-none'>TrackWave</h1>
      </Link>
      {location.pathname === '/projects' && (<SearchBar header />)}
      <DarkModeButton />
    </header>
  )
}

export default Header

import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useProjects from '../hooks/useProjects'

const Sidebar = () => {
  const { setProject, setProjects } = useProjects()
  const { auth, logOut } = useAuth()

  const handleClick = () => {
    setProject({})
    setProjects([])
    logOut()
  }

  return (
    <div className='relative'>
      <aside className='p-10 m-10 flex shadow-md gap-4 flex-col bg-gray-50 dark:bg-slate-800 rounded sticky top-0'>
        <p className='text-xl'>Wellcome: {auth.name}</p>
        <Link className='bg-indigo-400 hover:bg-blue-400 transition-all py-1 px-2 cursor-pointer text-white font-bold rounded uppercase' to='new-project'>New Project</Link>
        <button className='bg-indigo-400 hover:bg-blue-400 transition-all py-1 px-2 cursor-pointer text-white font-bold rounded uppercase' type='button' onClick={handleClick}>Log out</button>
      </aside>
    </div>
  )
}

export default Sidebar

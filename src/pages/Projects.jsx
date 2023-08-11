import useProjects from './../hooks/useProjects'
import PreviewProject from '../components/PreviewProject'
import Spinner from '../components/Spinner'
import SearchBar from '../components/SearchBar'
import { useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'

const Projects = () => {
  const location = useLocation()
  const { projects, loading, filteredProjects, setProject } = useProjects()

  useEffect(() => {
    setProject({}) // Clean project object to prevent last project visualization on new project visualization (flash)
  }, [])

  if (loading) return (<Spinner />)

  return (
    <>
      {location.pathname === '/projects' && (<SearchBar />)}

      {!projects.length && (
        <div className='w-full bg-gray-50 dark:bg-slate-800 rounded-md shadow-md p-6'>
          <p className='text-center text-gray-600 italic dark:text-white'>Hey! Any projects yet? Try to
            <Link className='text-indigo-400' to='new-project'> create your first project</Link>
          </p>
        </div>
      )}

      {filteredProjects?.length
        ? (
          <ul className='flex flex-col gap-2'>
            {filteredProjects.map(project => (
              <PreviewProject key={project._id} project={project} />
            ))}
          </ul>
          )

        : (
          <ul className='flex flex-col gap-2'>
            {projects?.map(project => (
              <PreviewProject key={project._id} project={project} />
            ))}
          </ul>
          )}
    </>
  )
}

export default Projects

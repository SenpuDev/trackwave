import useProjects from './../hooks/useProjects'
import PreviewProject from '../components/PreviewProject'
import Spinner from '../components/Spinner'
import SearchBar from '../components/SearchBar'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import io from 'socket.io-client'

let socket

const Projects = () => {
  const location = useLocation()
  const { projects, loading, filteredProjects } = useProjects()
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('')
  }, [])
  if (loading) return (<Spinner />)
  return (
    <>
      {location.pathname === '/projects' && (<SearchBar />)}
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

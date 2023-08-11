import { useState, useEffect, createContext } from 'react'
import useAuth from '../hooks/useAuth'
import { getProjects, getProject } from '../helpers/requestFunctions'

export const ProjectsContext = createContext()

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [search, setSearch] = useState('')
  const [filteredProjects, setFilteredProjects] = useState([])
  const [project, setProject] = useState({})
  const [loading, setLoading] = useState(false)
  const [userFound, setUserFound] = useState({})
  const { auth } = useAuth()
  const [projectAlert, setProjectAlert] = useState({})

  useEffect(() => { // First time context is in use
    (async () => {
      setLoading(true)
      const projectsObtained = await getProjects()
      setProjects(projectsObtained)
      setLoading(false)
    })()
  }, [auth])

  useEffect(() => {
    if (search.length > 2) {
      setFilteredProjects(projects.filter(project => project.name.toLowerCase().includes(search.toLowerCase())))
    } else {
      setFilteredProjects([])
    }
  }, [search])

  const obtainProject = async (id) => {
    if (id.length !== 24) {
      setProjectAlert({ msg: 'Not a valid project', error: true })
      return
    }

    setLoading(true)
    const projectObtained = await getProject(id)

    if (projectObtained.error) {
      setProjectAlert(projectObtained)
      return
    }

    setProject(projectObtained)
    setProjectAlert({})
    setLoading(false)
  }

  return (
    <ProjectsContext.Provider value={{ projects, setProjects, loading, project, setProject, projectAlert, obtainProject, userFound, setUserFound, setSearch, filteredProjects, search, setFilteredProjects }}>{children}</ProjectsContext.Provider>
  )
}

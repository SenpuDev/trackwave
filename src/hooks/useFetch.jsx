/*
    Hook made for use diferents request to the server, return all the possible messages and update contexts.
*/

import { useEffect, useState } from 'react'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'
import useProjects from './useProjects'
import io from 'socket.io-client'

let socket

const useFetch = (dataToSend, functionToDo, setObjectIsValid = false) => {
  const [startFetch, setStartFetch] = useState(false)
  const [fetchAlert, setFetchAlert] = useState({})
  const [dataSentOk, setDataSentOk] = useState(false)
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const { project, setProject, projects, setProjects, setUserFound } = useProjects()

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
  }, [])

  const sendForm = async () => {
    const result = await functionToDo(dataToSend)

    setFetchAlert({ msg: result.msg, error: result.error })

    // When the object sent need to validate (User forms)
    if (setObjectIsValid) {
      setObjectIsValid(false)
    }

    setStartFetch(false)

    if (!result.error) { // Context actions on Successful fetch
      setDataSentOk(true)
      setFetchAlert({ msg: result.msg, error: result.error })

      if (result.userLogged) { // Login Done
        setAuth(result.userLogged)
        setTimeout(() => {
          navigate('/projects')
        }, 2000)
      }

      if (result.savedProject) { // New project added
        setProjects([...projects, result.savedProject])
        setTimeout(() => {
          navigate('/projects')
        }, 2000)
      }

      if (result.deletedProject) { // Delete project
        const updatedProjects = projects.filter(project => project._id !== result.deletedProject._id)
        setProjects(updatedProjects)
        setTimeout(() => {
          navigate('/projects')
        }, 2000)
      }

      if (result.updatedProject) { // Update project info
        const updatedProjects = projects.map(project => project._id === result.updatedProject._id ? result.updatedProject : project)
        setProjects(updatedProjects)
        setTimeout(() => {
          navigate(`/projects/${result.updatedProject._id}`)
        }, 2000)
      }

      if (result.addedTask) { // New task
        socket.emit('add task', result.addedTask)
        setTimeout(() => {
          setFetchAlert({})
        }, 2000)
      }

      if (result.editedTask) { // Edit task
        socket.emit('update task', result.editedTask)
      }

      if (result.deletedTask) { // Delete Task
        socket.emit('delete task', result.deletedTask)
      }

      if (result.deletedCollaboratorId) {
        const updatedProject = { ...project }
        updatedProject.collaborators = updatedProject.collaborators.filter(collaborator => collaborator._id !== result.deletedCollaboratorId)
        setProject(updatedProject)
      }

      // userFound
      if (result.userFound) {
        setUserFound(result.userFound)
      }

      if (result.addedCollab) {
        setUserFound({})
      }
    }
  }

  useEffect(() => {
    if (startFetch) {
      sendForm()
    }
  }, [startFetch])

  return (
    { setStartFetch, startFetch, fetchAlert, setFetchAlert, dataSentOk, setDataSentOk }
  )
}

export default useFetch

import { useEffect, useState } from 'react'
import useAuth from './useAuth'
import useProjects from './useProjects'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
let socket

const useSendRequest = (initialObject, functionToDo) => {
  const [alert, setAlert] = useState({}) // Show alerts
  const [formData, setFormData] = useState(initialObject) // Read Form Object

  const [validateForm, setValidateForm] = useState(false) // Start validation
  const [isValid, setIsValid] = useState(false) // Form pass test validation
  const [dataSentOK, setDataSentOK] = useState(false) // Validation passed and successfully pass to server
  
  // const { project, setProject, projects, setProjects, setUserFound } = useProjects()
  // const { setAuth } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
  }, [])

  useEffect(() => {
    // Validate Form Fields if included
    if (validateForm && formData) {
      if (Object.values(formData).includes('')) { // Check all fields are filled
        setAlert({ msg: 'All fields are required.', error: true })
        setValidateForm(false)
        return
      }

      // TODO: Edit Validations
      if (project.id && formData) { // If Object is the same as saved in projectContext return
        console.log('ToDo')
      }

      // TODO: More Email Validations (length, correct structure)

      if (formData.password) { // Check if password is secure
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/
        if (!passwordRegex.test(formData.password)) {
          setAlert({ msg: 'Password needs an uppercase letter, a digit, and minimum 8 characters.', error: true })
          setValidateForm(false)
          return
        }
      }

      if (formData.confirm) { // Check if password matches
        if (formData.password !== formData.confirm) {
          setAlert({ msg: 'Passwords does not match.', error: true })
          setValidateForm(false)
          return
        }
      }

      // Clear alert, Valid OK, Go to send
      setAlert({})
      setIsValid(true)
      setValidateForm(false)
    }

    // Send the request
    if (isValid && !alert.error) {
      const sendForm = async () => {
        const result = await functionToDo(formData)
        setAlert({ msg: result.msg, error: result.error })

        if (!result.error) {
          setFormData(initialObject)
          setIsValid(false)
          setDataSentOK(true)

          // Delete deletedProject to ProjectContext (deleteProject function)
          if (result.deletedProject) {
            const updatedProjects = projects.filter(project => project._id !== result.deletedProject._id)
            setProjects(updatedProjects)
            setTimeout(() => {
              navigate('/projects')
            }, 2000)
          }

          if (result.deletedCollaboratorId) {
            const updatedProject = { ...project }
            updatedProject.collaborators = updatedProject.collaborators.filter(collaborator => collaborator._id !== result.deletedCollaboratorId)
            setProject(updatedProject)
          }

          // Add updatedProject to ProjectContext (updateProject function)
          if (result.updatedProject) {
            const updatedProjects = projects.map(project => project._id === result.updatedProject._id ? result.updatedProject : project)
            setProjects(updatedProjects)
          }

          // Add savedProject to ProjectContext (newProject function)
          if (result.savedProject) {
            setProjects([...projects, result.savedProject])
          }

          // Set userData to AuthContext (loginRequest function)
          if (result.data) {
            setAuth(result.data)
          }

          // Add new task to the project
          if (result.addedTask) {
            socket.emit('add task', result.addedTask)
          }

          // Edit a task in the project
          if (result.editedTask) {
            socket.emit('update task', result.editedTask)
          }

          // Delete Task
          if (result.deletedTask) {
            socket.emit('delete task', result.deletedTask)
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
      sendForm()
    }
  }, [validateForm, isValid])

  return (
    { alert, setAlert, validateForm, setValidateForm, isValid, setIsValid, formData, setFormData, dataSentOK, setDataSentOK }
  )
}

export default useSendRequest

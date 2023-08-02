import useProjects from '../hooks/useProjects'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useSendRequest from '../hooks/useSendRequest'
import FormField from '../components/FormField'
import { kebabToCamelCase, minDate, localDate } from '../helpers/miscellaneous'
import useAuth from '../hooks/useAuth'
import Alert from '../components/Alert'
import { updateProject } from '../helpers/requestFunctions'
import Spinner from '../components/Spinner'
const EditProject = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { auth } = useAuth()
  const { project, loading, obtainProject } = useProjects()

  const initialObject = { id: '', name: '', description: '', deadLine: '', client: '', token: auth.token }
  const { alert, setValidateForm, formData, setFormData, dataSentOK } = useSendRequest(initialObject, updateProject)

  useEffect(() => {
    obtainProject(params.id)
  }, [])

  useEffect(() => {
    const fillForm = () => {
      if (project.name) {
        const updatedFormData = { id: project._id, name: project.name, description: project.description, deadLine: project.deadLine, client: project.client, token: auth.token }
        setFormData(updatedFormData)
      }
    }
    fillForm()
  }, [project])

  const handleChange = (e) => {
    const { name, value } = e.target
    const camelCaseName = kebabToCamelCase(name)
    setFormData((formData) => ({ ...formData, [camelCaseName]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidateForm(true)
  }

  useEffect(() => {
    if (dataSentOK) {
      setTimeout(() => {
        navigate('/projects')
      }, 2000)
    }
  }, [dataSentOK])

  if (loading) return <Spinner />

  return (
    <>
      <div className='p-10 shadow-md w-10/12 xl:w-1/2 bg-gray-50 dark:bg-slate-800 rounded mx-auto'>
        {alert.msg && <Alert alert={alert} />}
        <form className='w-10/12 mx-auto pt-5' onSubmit={handleSubmit}>
          <FormField type='text' id='name' text='Project Name' onChange={handleChange} value={formData.name} />
          <FormField type='textarea' id='description' text='Describe your project' onChange={handleChange} value={formData.description} />
          <FormField type='datetime-local' min={minDate} id='dead-line' text='Dead Line' onChange={handleChange} value={localDate(formData.deadLine)} />
          <FormField type='text' id='client' text='Client Name' onChange={handleChange} value={formData.client} />
          <input type='submit' value='Update project' className='bg-indigo-400 hover:bg-blue-400 transition-all  cursor-pointer w-full py-3 text-white font-bold rounded uppercase' />
        </form>
      </div>

    </>
  )
}

export default EditProject

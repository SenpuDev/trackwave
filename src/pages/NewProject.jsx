import Alert from '../components/Alert'
import FormField from '../components/FormField'
import useSendRequest from '../hooks/useSendRequest'
import { newProject } from '../helpers/requestFunctions'
import useAuth from '../hooks/useAuth'
import { kebabToCamelCase, minDate } from '../helpers/miscellaneous'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NewProject = () => {
  const navigate = useNavigate()
  const { auth } = useAuth()

  const initialObject = { name: '', description: '', deadLine: '', client: '', token: auth.token }
  const { alert, setValidateForm, formData, setFormData, dataSentOK } = useSendRequest(initialObject, newProject)

  const handleChange = (e) => {
    const { name, value } = e.target
    const camelCaseName = kebabToCamelCase(name)
    setFormData((formData) => ({ ...formData, [camelCaseName]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidateForm(true)
  }

  // Redirect
  useEffect(() => {
    if (dataSentOK) {
      setTimeout(() => {
        navigate('/projects')
      }, 2000)
    }
  }, [dataSentOK])

  return (
    <>
      {alert.msg && <Alert alert={alert} />}
      <div className='md:w-5/6 xl:w-1/2 mx-auto bg-white dark:bg-slate-800 shadow rounded-lg transition-all'>
        <form className='w-10/12 mx-auto py-10 ' onSubmit={handleSubmit}>
          <FormField type='text' id='name' text='Project Name' onChange={handleChange} value={formData.name} />
          <FormField type='textarea' id='description' text='Describe your project' onChange={handleChange} value={formData.description} />
          <FormField type='datetime-local' min={minDate} id='dead-line' text='Dead Line' onChange={handleChange} value={formData.deadLine} />
          <FormField type='text' id='client' text='Client Name' onChange={handleChange} value={formData.client} />
          <input type='submit' value='Create Project' className='bg-indigo-400 hover:bg-blue-400 transition-all  cursor-pointer w-full py-3 text-white font-bold rounded uppercase' />
        </form>

      </div>
    </>
  )
}

export default NewProject

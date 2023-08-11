import useProjects from '../hooks/useProjects'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import useValidate from '../hooks/useValidate'
import useFetch from '../hooks/useFetch'
import FormField from '../components/FormField'
import { kebabToCamelCase, minDate, localDate } from '../helpers/miscellaneous'
import useAuth from '../hooks/useAuth'
import Alert from '../components/Alert'
import { updateProject } from '../helpers/requestFunctions'
import Spinner from '../components/Spinner'

const EditProject = () => {
  const params = useParams()
  const { auth } = useAuth()
  const { project, loading, obtainProject } = useProjects()

  const initialObject = { id: '', name: '', description: '', deadLine: '', client: '' }
  const { validationAlert, setStartValidation, objectToValidate, setObjectToValidate, setObjectIsValid, objectIsValid } = useValidate(initialObject)
  const { fetchAlert, setStartFetch } = useFetch(objectToValidate, updateProject, setObjectIsValid)

  useEffect(() => {
    obtainProject(params.id)
  }, [])

  useEffect(() => {
    const fillForm = () => {
      if (project.name) {
        const automaticFilledObject = {
          id: project._id,
          name: project.name,
          description: project.description,
          deadLine: project.deadLine,
          client: project.client,
          token: auth.token
        }
        setObjectToValidate(automaticFilledObject)
      }
    }
    fillForm()
  }, [project])

  const handleChange = (e) => {
    const { name, value } = e.target
    const camelCaseName = kebabToCamelCase(name)
    setObjectToValidate((objectToValidate) => ({ ...objectToValidate, [camelCaseName]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStartValidation(true)
  }

  // Send Request if Object is Ok!
  useEffect(() => {
    if (objectIsValid) {
      setStartFetch(true)
    }
  }, [objectIsValid])

  if (loading) return <Spinner />

  return (
    <>
      <div className='p-10 shadow-md w-10/12 xl:w-1/2 bg-gray-50 dark:bg-slate-800 rounded mx-auto'>
        <form className='w-10/12 mx-auto' onSubmit={handleSubmit}>
          {(validationAlert.msg || fetchAlert.msg) && <Alert alert={validationAlert.msg ? validationAlert : fetchAlert} />}
          <FormField type='text' id='name' text='Project Name' onChange={handleChange} value={objectToValidate.name} />
          <FormField type='textarea' id='description' text='Describe your project' onChange={handleChange} value={objectToValidate.description} />
          <FormField type='datetime-local' min={minDate} id='dead-line' text='Dead Line' onChange={handleChange} value={localDate(objectToValidate.deadLine)} />
          <FormField type='text' id='client' text='Client Name' onChange={handleChange} value={objectToValidate.client} />
          <input type='submit' value='Update project' className='bg-indigo-400 hover:bg-blue-400 transition-all  cursor-pointer w-full py-3 text-white font-bold rounded uppercase' />
        </form>
      </div>

    </>
  )
}

export default EditProject

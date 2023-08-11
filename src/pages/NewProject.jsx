import Alert from '../components/Alert'
import FormField from '../components/FormField'
import useValidate from '../hooks/useValidate'
import useFetch from '../hooks/useFetch'
import { newProject } from '../helpers/requestFunctions'
import useAuth from '../hooks/useAuth'
import { kebabToCamelCase, minDate } from '../helpers/miscellaneous'
import { useEffect } from 'react'

const NewProject = () => {
  const { auth } = useAuth()

  const initialObject = { name: '', description: '', deadLine: '', client: '', token: auth.token }
  const { validationAlert, setStartValidation, objectToValidate, setObjectToValidate, setObjectIsValid, objectIsValid } = useValidate(initialObject)
  const { fetchAlert, setStartFetch, dataSentOk, setDataSentOk } = useFetch(objectToValidate, newProject, setObjectIsValid)

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

  // Reset Form on Data successfully send
  useEffect(() => {
    if (dataSentOk) {
      setObjectToValidate(initialObject)
      setDataSentOk(false)
    }
  }, [dataSentOk])

  return (
    <>
      <div className='md:w-5/6 xl:w-1/2 mx-auto bg-white dark:bg-slate-800 shadow rounded-lg transition-all'>
        <form className='w-10/12 mx-auto py-10 ' onSubmit={handleSubmit}>
          {(validationAlert.msg || fetchAlert.msg) && <Alert alert={validationAlert.msg ? validationAlert : fetchAlert} />}
          <FormField type='text' id='name' text='Project Name' onChange={handleChange} value={objectToValidate.name} />
          <FormField type='textarea' id='description' text='Describe your project' onChange={handleChange} value={objectToValidate.description} />
          <FormField type='datetime-local' min={minDate} id='dead-line' text='Dead Line' onChange={handleChange} value={objectToValidate.deadLine} />
          <FormField type='text' id='client' text='Client Name' onChange={handleChange} value={objectToValidate.client} />
          <input type='submit' value='Create Project' className='bg-indigo-400 hover:bg-indigo-500 transition-all  cursor-pointer w-full py-3 text-white font-bold rounded uppercase' />
        </form>

      </div>
    </>
  )
}

export default NewProject

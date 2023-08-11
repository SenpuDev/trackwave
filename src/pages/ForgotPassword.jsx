import FormField from '../components/FormField'
import FormLink from '../components/FormLink'
import useValidate from '../hooks/useValidate'
import Alert from '../components/Alert'
import { forgotPasswordRequest } from '../helpers/requestFunctions'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'

const ForgotPassword = () => {
  const initialObject = { email: '' }

  const { validationAlert, setStartValidation, objectToValidate, setObjectToValidate, setObjectIsValid, objectIsValid } = useValidate(initialObject)

  const { fetchAlert, setStartFetch, dataSentOk, setDataSentOk } = useFetch(objectToValidate, forgotPasswordRequest, setObjectIsValid)

  const handleChange = (e) => {
    const { name, value } = e.target
    setObjectToValidate((objectToValidate) => ({ ...objectToValidate, [name]: value }))
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
      <h2 className='capitalize font-bold text-l text-center text-gray-500 sm:text-2xl dark:text-gray-200'>Recover your <span className='text-indigo-400'>account</span> </h2>

      <form className='w-10/12 mx-auto pt-5' onSubmit={handleSubmit}>
        {(validationAlert.msg || fetchAlert.msg) && <Alert alert={validationAlert.msg ? validationAlert : fetchAlert} />}
        <FormField type='email' id='email' text='Email' value={objectToValidate.email} onChange={handleChange} />
        <input type='submit' value='Send instructions' className='bg-indigo-400 hover:bg-indigo-500 transition-all cursor-pointer w-full py-3 text-white font-bold rounded uppercase' />
      </form>

      <nav className='sm:flex sm:justify-between px-10 pb-5 mt-5'>
        <FormLink to='/' text='Have an account? Log in' />
        <FormLink to='/sign-up' text='Sign up now' />
      </nav>
    </>
  )
}

export default ForgotPassword

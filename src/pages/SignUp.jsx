import FormField from '../components/FormField'
import FormLink from '../components/FormLink'
import Alert from '../components/Alert'
import useValidate from '../hooks/useValidate'
import { signUpRequest } from '../helpers/requestFunctions'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'

const SignUp = () => {
  const initialObject = { name: '', email: '', password: '', confirm: '' }

  const { validationAlert, setStartValidation, objectToValidate, setObjectToValidate, setObjectIsValid, objectIsValid } = useValidate(initialObject)

  const { fetchAlert, setStartFetch, dataSentOk, setDataSentOk } = useFetch(objectToValidate, signUpRequest, setObjectIsValid)

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
      <h2 className='capitalize font-bold text-l text-center text-gray-500 sm:text-2xl dark:text-gray-200 select-none'>Create your <span className='text-indigo-400'>account</span> </h2>

      <form onSubmit={handleSubmit} className='w-10/12 mx-auto pt-5'>
        {(validationAlert.msg || fetchAlert.msg) && <Alert alert={validationAlert.msg ? validationAlert : fetchAlert} />}
        <FormField type='text' id='name' text='Name' value={objectToValidate.name} onChange={handleChange} />
        <FormField type='email' id='email' text='Email' value={objectToValidate.email} onChange={handleChange} />
        <FormField type='password' id='password' text='Password' value={objectToValidate.password} onChange={handleChange} />
        <FormField type='password' id='confirm' text='Repeat password' value={objectToValidate.confirm} onChange={handleChange} />
        <input type='submit' value='Create account' className='bg-indigo-400 hover:bg-indigo-500 transition-all cursor-pointer w-full py-3 text-white font-bold rounded uppercase' />
      </form>

      <nav className='sm:flex sm:justify-between px-10 pb-5 mt-5'>
        <FormLink to='/' text='Have an account? Log in' />
        <FormLink to='/forgot-password' text='Forgot your password?' />
      </nav>
    </>
  )
}

export default SignUp

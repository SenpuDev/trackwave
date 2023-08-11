import FormLink from '../components/FormLink'
import FormField from '../components/FormField'
import { loginRequest } from '../helpers/requestFunctions'
import Alert from '../components/Alert'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useValidate from '../hooks/useValidate'
import useFetch from '../hooks/useFetch'

const Login = () => {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const initialObject = { email: '', password: '' }
  const { validationAlert, setStartValidation, objectToValidate, setObjectToValidate, setObjectIsValid, objectIsValid } = useValidate(initialObject)

  const { fetchAlert, setStartFetch } = useFetch(objectToValidate, loginRequest, setObjectIsValid)

  const handleChange = (e) => {
    const { name, value } = e.target
    setObjectToValidate((objectToValidate) => ({ ...objectToValidate, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStartValidation(true)
  }

  useEffect(() => {
    if (objectIsValid) {
      setStartFetch(true)
    }
  }, [objectIsValid])

  // Automatic login (AuthProvider)
  useEffect(() => {
    if (auth._id) {
      navigate('/projects')
    }
  }, [auth])

  return (
    <>
      <h2 className='capitalize font-bold text-l text-center text-gray-500 dark:text-gray-200 sm:text-2xl'>Build and Manage your <span className='text-indigo-400'>Projects</span> </h2>

      <form className='w-10/12 mx-auto pt-5' onSubmit={handleSubmit}>
        {(validationAlert.msg || fetchAlert.msg) && <Alert alert={validationAlert.msg ? validationAlert : fetchAlert} />}
        <FormField type='email' id='email' text='Email' onChange={handleChange} value={objectToValidate.email} />
        <FormField type='password' id='password' text='Password' onChange={handleChange} value={objectToValidate.password} />
        <input type='submit' value='Sign in' className='bg-indigo-400 hover:bg-indigo-500 transition-all  cursor-pointer w-full py-3 text-white font-bold rounded uppercase' />
      </form>

      <nav className='sm:flex sm:justify-between px-10 pb-5 mt-5'>
        <FormLink to='/sign-up' text='Sign up now' />
        <FormLink to='/forgot-password' text='Forgot your password?' />
      </nav>
    </>
  )
}

export default Login

import FormLink from '../components/FormLink'
import FormField from '../components/FormField'
import useSendRequest from '../hooks/useSendRequest'
import { loginRequest } from '../helpers/requestFunctions'
import Alert from '../components/Alert'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const initialObject = { email: '', password: '' }
  const { alert, setValidateForm, formData, setFormData, dataSentOK } = useSendRequest(initialObject, loginRequest)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((formData) => ({ ...formData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidateForm(true)
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (dataSentOK) {
      navigate('/projects')
    }
  }, [dataSentOK])

  return (
    <>
      {alert.msg && <Alert alert={alert} />}
      <h2 className='capitalize font-bold text-l text-center text-gray-500 dark:text-gray-200 sm:text-2xl'>Build and Manage your <span className='text-indigo-400'>Projects</span> </h2>

      <form className='w-10/12 mx-auto pt-5' onSubmit={handleSubmit}>
        <FormField type='email' id='email' text='Email' onChange={handleChange} value={formData.email} />
        <FormField type='password' id='password' text='Password' onChange={handleChange} value={formData.password} />
        <input type='submit' value='Sign in' className='bg-indigo-400 hover:bg-blue-400 transition-all  cursor-pointer w-full py-3 text-white font-bold rounded uppercase' />
      </form>

      <nav className='sm:flex sm:justify-between px-10 pb-5 mt-5'>
        <FormLink to='/sign-up' text='Sign up now' />
        <FormLink to='/forgot-password' text='Forgot your password?' />
      </nav>
    </>
  )
}

export default Login

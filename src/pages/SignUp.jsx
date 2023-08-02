import FormField from '../components/FormField'
import FormLink from '../components/FormLink'
import Alert from '../components/Alert'
import useSendRequest from '../hooks/useSendRequest'
import { signUpRequest } from '../helpers/requestFunctions'

const SignUp = () => {
  const initialObject = { name: '', email: '', password: '', confirm: '' }

  const { alert, setValidateForm, formData, setFormData } = useSendRequest(initialObject, signUpRequest)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((formData) => ({ ...formData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidateForm(true)
  }

  return (
    <>
      <h2 className='capitalize font-bold text-l text-center text-gray-500 sm:text-2xl dark:text-gray-200 select-none'>Create your <span className='text-indigo-400'>account</span> </h2>
      {alert.msg && <Alert alert={alert} />}

      <form onSubmit={handleSubmit} className='w-10/12 mx-auto pt-5'>
        <FormField type='text' id='name' text='Name' value={formData.name} onChange={handleChange} />
        <FormField type='email' id='email' text='Email' value={formData.email} onChange={handleChange} />
        <FormField type='password' id='password' text='Password' value={formData.password} onChange={handleChange} />
        <FormField type='password' id='confirm' text='Repeat password' value={formData.confirm} onChange={handleChange} />
        <input type='submit' value='Create account' className='bg-indigo-400 hover:bg-blue-400 transition-all cursor-pointer w-full py-3 text-white font-bold rounded uppercase' />
      </form>

      <nav className='sm:flex sm:justify-between px-10 pb-5 mt-5'>
        <FormLink to='/' text='Have an account? Log in' />
        <FormLink to='/forgot-password' text='Forgot your password?' />
      </nav>
    </>
  )
}

export default SignUp

import FormField from '../components/FormField'
import FormLink from '../components/FormLink'
import useSendRequest from '../hooks/useSendRequest'
import Alert from '../components/Alert'
import { forgotPasswordRequest } from '../helpers/requestFunctions'

const ForgotPassword = () => {
  const initialObject = { email: '' }

  const { alert, setValidateForm, formData, setFormData } = useSendRequest(initialObject, forgotPasswordRequest)

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
      {alert.msg && <Alert alert={alert} />}
      <h2 className='capitalize font-bold text-l text-center text-gray-500 sm:text-2xl dark:text-gray-200'>Recover your <span className='text-indigo-400'>account</span> </h2>

      <form className='w-10/12 mx-auto pt-5' onSubmit={handleSubmit}>
        <FormField type='email' id='email' text='Email' value={formData.email} onChange={handleChange} />
        <input type='submit' value='Send instructions' className='bg-indigo-400 hover:bg-blue-400 transition-all cursor-pointer w-full py-3 text-white font-bold rounded uppercase' />
      </form>

      <nav className='sm:flex sm:justify-between px-10 pb-5 mt-5'>
        <FormLink to='/' text='Have an account? Log in' />
        <FormLink to='/sign-up' text='Sign up now' />
      </nav>
    </>
  )
}

export default ForgotPassword

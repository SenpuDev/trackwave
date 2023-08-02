import FormField from '../components/FormField'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import useSendRequest from '../hooks/useSendRequest'
import { newPasswordRequest } from '../helpers/requestFunctions'
import { checkForgotPasswordToken } from '../helpers/tokenValidations'
import FormLink from '../components/FormLink'

const ResetPassword = () => {
  const [validToken, setValidToken] = useState(false)
  const params = useParams()
  const { token } = params

  useEffect(() => {
    const checkToken = async () => {
      const valid = await checkForgotPasswordToken(token)
      if (!valid) {
        setAlert({ msg: 'Invalid Token', error: true })
        return
      }
      setValidToken(true)
    }
    checkToken()
  }, [])

  const initialObject = { password: '', confirm: '', token }
  const { alert, setAlert, setFormData, formData, setValidateForm, dataSentOK } = useSendRequest(initialObject, newPasswordRequest)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((formData) => ({ ...formData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setValidateForm(true)
  }

  return (
    <>
      <h2 className='capitalize font-bold text-l text-center text-gray-500 sm:text-2xl dark:text-gray-200'>Change your <span className='text-indigo-400'>Password</span> </h2>
      {alert.msg && <Alert alert={alert} />}
      {validToken && !dataSentOK && (
        <form className='w-10/12 mx-auto pt-5' onSubmit={handleSubmit}>
          <>
            <FormField type='password' id='password' text='New Password' onChange={handleChange} value={formData.password} />
            <FormField type='password' id='confirm' text='Confirm Password' onChange={handleChange} value={formData.confirm} />
            <input type='submit' value='Save your password' className='bg-indigo-400 hover:bg-blue-400 transition-all cursor-pointer w-full py-3 text-white font-bold rounded uppercase mb-10' />
          </>
        </form>
      )}
      {alert.msg && !alert.error && (
        <FormLink to='/' text='Return to the homepage and log in' />
      )}
    </>
  )
}

export default ResetPassword

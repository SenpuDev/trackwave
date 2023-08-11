import FormField from '../components/FormField'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import useValidate from '../hooks/useValidate'
import { newPasswordRequest } from '../helpers/requestFunctions'
import { checkForgotPasswordToken } from '../helpers/tokenValidations'
import FormLink from '../components/FormLink'
import useFetch from '../hooks/useFetch'

const ResetPassword = () => {
  const [tokenAlert, setTokenAlert] = useState({})
  const [validToken, setValidToken] = useState(false)
  const params = useParams()
  const { token } = params

  // Validate email reset token on component mount
  useEffect(() => {
    const checkToken = async () => {
      const valid = await checkForgotPasswordToken(token)
      if (!valid) {
        setTokenAlert({ msg: 'Invalid Token', error: true })
        return
      }
      setValidToken(true)
    }
    checkToken()
  }, [])

  const initialObject = { password: '', confirm: '', resetToken: token }
  const { validationAlert, setStartValidation, objectToValidate, setObjectToValidate, setObjectIsValid, objectIsValid } = useValidate(initialObject)

  const { fetchAlert, setStartFetch, dataSentOk } = useFetch(objectToValidate, newPasswordRequest, setObjectIsValid)

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
    }
  }, [dataSentOk])

  return (
    <>
      <h2 className='capitalize font-bold text-l text-center text-gray-500 sm:text-2xl dark:text-gray-200'>Change your <span className='text-indigo-400'>Password</span> </h2>
      <div className='w-10/12 mx-auto'>
        {(validationAlert.msg || fetchAlert.msg || tokenAlert.msg) &&
          <Alert
            alert={
            validationAlert.msg
              ? validationAlert
              : fetchAlert.msg
                ? fetchAlert
                : tokenAlert
          }
          />}
      </div>
      {validToken && !dataSentOk && (
        <form className='w-10/12 mx-auto pt-5' onSubmit={handleSubmit}>
          <FormField type='password' id='password' text='New Password' onChange={handleChange} value={objectToValidate.password} />
          <FormField type='password' id='confirm' text='Confirm Password' onChange={handleChange} value={objectToValidate.confirm} />
          <input type='submit' value='Save your password' className='bg-indigo-400 hover:bg-indigo-500 transition-all cursor-pointer w-full py-3 text-white font-bold rounded uppercase mb-10' />

        </form>
      )}
      {fetchAlert.msg && !fetchAlert.error && (
        <FormLink to='/' text='Return to the homepage and log in' />
      )}
    </>
  )
}

export default ResetPassword

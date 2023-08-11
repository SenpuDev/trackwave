import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import FormLink from '../components/FormLink'
import { checkVerifyAccountToken } from '../helpers/tokenValidations'

const VerifyAccount = () => {
  const params = useParams()
  const { token } = params

  const [validToken, setValidToken] = useState(false)
  const [alert, setAlert] = useState({})

  useEffect(() => {
    const checkToken = async () => {
      const valid = await checkVerifyAccountToken(token)

      if (!valid) {
        setAlert({ msg: 'Invalid Token', error: true })
        return
      }
      setAlert({ msg: 'User verified correctly', error: false })
      setValidToken(true)
    }
    checkToken()// Prevents double rendering problems strict mode (G.Chrome) adding: return () => {verifyAccount} or removing strict mode. In production is OK: verifyAccount().
  }, [])

  return (
    <>
      <h2 className='capitalize font-bold text-l text-center text-gray-500 sm:text-2xl dark:text-gray-200'>Confirm your <span className='text-indigo-400'>account</span> </h2>
      <div className='w-10/12 mx-auto'>
        {alert.msg && <Alert alert={alert} />}
      </div>
      {validToken && (
        <FormLink to='/' text='Return to the homepage and log in' />
      )}
    </>
  )
}

export default VerifyAccount

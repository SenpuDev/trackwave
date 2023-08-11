import { useEffect, useState } from 'react'

/*
  Hook made for mostly for validate all data before sendRequest to the server.
  Depends on the object, validate the diferent fields.
*/

const useValidate = (object) => {
  const [validationAlert, setValidationAlert] = useState({}) // Show alerts
  const [objectToValidate, setObjectToValidate] = useState(object) // Object To validate

  const [startValidation, setStartValidation] = useState(false) // Start validation
  const [objectIsValid, setObjectIsValid] = useState(false) // Object is OK!

  useEffect(() => {
    // Validate Form Fields if included
    if (startValidation && objectToValidate) {
      if (Object.values(objectToValidate).includes('')) { // Check all fields are filled
        setValidationAlert({ msg: 'All fields are required.', error: true })
        setStartValidation(false)
        return
      }

      // TODO: More Email Validations (length, correct structure)

      if (objectToValidate.password) { // Check if password is secure
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/
        if (!passwordRegex.test(objectToValidate.password)) {
          setValidationAlert({ msg: 'Password needs an uppercase letter, a digit, and minimum 8 characters.', error: true })
          setStartValidation(false)
          return
        }
      }

      if (objectToValidate.confirm) { // Check if passwords introduced by user matches
        if (objectToValidate.password !== objectToValidate.confirm) {
          setValidationAlert({ msg: 'Passwords does not match.', error: true })
          setStartValidation(false)
          return
        }
      }

      // Clear alert, Valid OK, Go to send
      setValidationAlert({})
      setStartValidation(false)
      setObjectIsValid(true)
    }
  }, [startValidation, objectIsValid])

  return (
    { validationAlert, setStartValidation, objectIsValid, setObjectIsValid, objectToValidate, setObjectToValidate }
  )
}

export default useValidate

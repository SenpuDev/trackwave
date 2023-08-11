import { useEffect, useState } from 'react'

const useFetch = (dataToSend, functionToDo) => {
  useEffect(() => {
    // Send the request
    if (startFetch) {
      const sendForm = async () => {
        if (!result.error) {
          setFormData(initialObject)
          setIsValid(false)
          setDataSentOK(true)


        }
      }
      sendForm()
    }
  }, [startFetch])
  return (
    { setStartFetch, startFetch }
  )
}

export default useFetch

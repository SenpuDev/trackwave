import useValidate from '../hooks/useValidate'
import Alert from '../components/Alert'
import { useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import { addCollab, searchCollab } from '../helpers/requestFunctions'
import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'

import UserFound from '../components/UserFound'
import useFetch from '../hooks/useFetch'

const NewCollaborator = () => {
  const params = useParams()

  const initialObject = { email: '' }
  const { obtainProject, project, loading, userFound } = useProjects()

  const { validationAlert, setStartValidation, objectToValidate, setObjectToValidate, setObjectIsValid, objectIsValid } = useValidate(initialObject)
  const { fetchAlert, setStartFetch } = useFetch(objectToValidate, searchCollab, setObjectIsValid)

  useEffect(() => {
    obtainProject(params.id)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setObjectToValidate((objectToValidate) => ({ ...objectToValidate, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setStartValidation(true)
  }

  useEffect(() => {
    if (objectIsValid) {
      setStartFetch(true)
    }
  }, [objectIsValid])

  const [addCollabData, setAddCollabData] = useState({})

  const addCollabClick = (email) => {
    const updateAddCollabData = { ...addCollabData }
    updateAddCollabData.email = email
    updateAddCollabData.id = project._id
    setAddCollabData(updateAddCollabData)
  }

  useEffect(() => {
    if (addCollabData.id && addCollabData.email) {
      setStartFetchAddCollab(true)
    }
  }, [addCollabData])

  const {
    fetchAlert: fetchAlertAddCollab,
    setStartFetch: setStartFetchAddCollab
  } = useFetch(addCollabData, addCollab)

  if (loading) return <Spinner />

  return (
    <>
      {project?._id && (
        <form onSubmit={handleSubmit} className='p-10 shadow-md bg-gray-50 dark:bg-slate-800 rounded md:w-10/12 mx-auto'>
          {(validationAlert.msg || fetchAlert.msg || fetchAlertAddCollab.msg) &&
            <Alert alert={validationAlert.msg
              ? validationAlert
              : fetchAlert.msg
                ? fetchAlert
                : fetchAlertAddCollab}
            />}
          <label htmlFor='email' className='dark:text-gray-50'>Add collaborator to {project.name}</label>
          <div className='relative rounded-xl my-5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3'
              fill='none '
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
            <input
              type='email'
              id='email'
              name='email'
              onChange={handleChange}
              value={objectToValidate.email}
              placeholder='Search by user email'
              className='w-full pl-12 py-1 text-gray-500 dark:text-white rounded-xl outline-none bg-gray-200 dark:dark:bg-slate-700 focus:border-gray-500'
            />
          </div>
          <input type='submit' value='Seach user' className='bg-indigo-400 hover:bg-indigo-500 transition-all  cursor-pointer w-full py-3 text-white font-bold rounded uppercase' />
        </form>

      )}
      {userFound?.name && (
        <UserFound userFound={userFound} addCollabClick={addCollabClick} />
      )}
    </>
  )
}

export default NewCollaborator

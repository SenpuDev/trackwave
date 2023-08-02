import useSendRequest from '../hooks/useSendRequest'
import Alert from '../components/Alert'
import { useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import { useEffect } from 'react'
import Spinner from '../components/Spinner'
import { searchCollab } from '../helpers/requestFunctions'
import useAuth from '../hooks/useAuth'
import UserFound from '../components/UserFound'

const NewCollaborator = () => {
  const params = useParams()
  const { auth } = useAuth()
  const initialObject = { email: '', token: auth.token }

  const { obtainProject, project, loading, userFound } = useProjects()
  const { alert, setValidateForm, formData, setFormData } = useSendRequest(initialObject, searchCollab)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((formData) => ({ ...formData, [name]: value }))
  }

  useEffect(() => {
    obtainProject(params.id)
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setValidateForm(true)
  }

  const addClick = (email) => {
    const updatedFormData = { ...initialObject }
    updatedFormData.email = email
    setFormData(updatedFormData)
    setValidateForm(true)
  }

  if (loading) return <Spinner />

  return (
    <>
      {project?._id && (
        <form onSubmit={handleSubmit} className='p-10 shadow-md bg-gray-50 dark:bg-slate-800 rounded md:w-10/12 mx-auto'>
          {alert.msg && <Alert alert={alert} />}
          <label htmlFor='email'>Add collaborator to {project.name}</label>
          <div className='relative shadow-md rounded-xl'>
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
              value={formData.email}
              placeholder='Search by user email'
              className='w-full py-1 pl-12 text-gray-500 dark:text-white rounded-xl outline-none bg-white dark:dark:bg-slate-600 focus:border-gray-500'
            />
          </div>
          <input type='submit' value='Seach user' className='bg-indigo-400 hover:bg-blue-400 transition-all  cursor-pointer w-full py-3 text-white font-bold rounded uppercase' />
        </form>

      )}
      {userFound?.name && (
        <UserFound userFound={userFound} projectId={project._id} token={auth.token} addClick={addClick} />
      )}
    </>
  )
}

export default NewCollaborator

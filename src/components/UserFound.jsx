import { addCollab } from '../helpers/requestFunctions'
import useSendRequest from '../hooks/useSendRequest'
import Alert from './Alert'

const UserFound = ({ userFound, projectId, token }) => {
  const initialObject = { id: projectId, email: userFound.email, token }

  const { alert, setValidateForm } = useSendRequest(initialObject, addCollab)

  const handleClick = () => {
    setValidateForm(true)
  }

  return (
    <>
      <div className='shadow-md bg-gray-50 md:w-10/12 mx-auto mt-10 p-10'>

        {alert.msg && <Alert alert={alert} />}
        <div className=' flex justify-between  dark:bg-slate-800 rounded '>
          <div>
            <p>{userFound.name}</p>
            <p className='text-gray-400'>{userFound.email}</p>
          </div>
          <button className='mr-2 h-10 w-10 rounded-md p-2 shadow-sm bg-indigo-400' onClick={handleClick}>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
              <path stroke='#EDE9FE' fill='#7893f9' strokeWidth='2' d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z' />
            </svg>
          </button>
        </div>
      </div>

    </>
  )
}

export default UserFound

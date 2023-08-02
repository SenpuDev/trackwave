import Swal from 'sweetalert2'
import useSendRequest from '../hooks/useSendRequest'
import { deleteCollab } from '../helpers/requestFunctions'
import useAdmin from '../hooks/useAdmin'

const Collaborator = ({ collaborator, projectId, token }) => {
  const isAdmin = useAdmin()
  const deleteInitialObject = { projectId, token }
  const { setValidateForm, setFormData } = useSendRequest(deleteInitialObject, deleteCollab)
  const deleteCollaboratorClick = (collaboratorId) => {
    const updatedFormData = { ...deleteInitialObject }
    updatedFormData.collaboratorId = collaboratorId
    setFormData(updatedFormData)
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to remove ${collaborator.email} from project?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#818CF8',
      cancelButtonColor: '#f87171',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setValidateForm(true)
      }
    })
  }

  return (
    <>
      <div className='rounded-md shadow-md flex items-center justify-around p-2'>
        <div className='flex flex-col '>
          <p>{collaborator.name}</p>
          <p className='text-sm text-gray-400'>{collaborator.email}</p>
        </div>
        {isAdmin && (
          <svg
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='min-w-min w-5 h-5  opacity-50 cursor-pointer'
            onClick={() => deleteCollaboratorClick(collaborator._id)}
          >
            <rect
              x='5'
              y='6'
              width='10'
              height='10'
              fill='#fad8d8'
              stroke='#f87171'
              strokeWidth='2'
            />
            <path d='M3 6H17' stroke='#f87171' strokeWidth='2' />
            <path d='M8 6V4H12V6' stroke='#f87171' strokeWidth='2' />
          </svg>
        )}
      </div>
    </>
  )
}

export default Collaborator

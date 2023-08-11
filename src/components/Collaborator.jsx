import { deleteCollab } from '../helpers/requestFunctions'
import useAdmin from '../hooks/useAdmin'
import useFetch from '../hooks/useFetch'
import { useState } from 'react'
import Alert from './Alert'
import { provideSwal } from '../helpers/swalCustom'
const Collaborator = ({ collaborator, projectId }) => {
  const isAdmin = useAdmin()
  const [collaboratorObject, setCollaboratorObject] = useState({ projectId, collaboratorId: '' })
  const { fetchAlert, setStartFetch } = useFetch(collaboratorObject, deleteCollab)

  const deleteCollaboratorClick = async (collaboratorId) => {
    const updatedCollaboratorObject = { ...collaboratorObject }
    updatedCollaboratorObject.collaboratorId = collaboratorId
    setCollaboratorObject(updatedCollaboratorObject)
    const tailwindSwal = await provideSwal()
    tailwindSwal.fire({
      title: 'Are you sure?',
      html: `Do you want to remove <span class='text-orange-400'>${collaborator.email}</span> from project?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#818CF8',
      cancelButtonColor: '#f87171',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setStartFetch(true)
      }
    })
  }

  return (
    <>
      <div className='rounded-md dark:bg-slate-700 shadow-md flex items-center justify-around p-2'>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} className='w-10 h-10 dark:stroke-white stroke-slate-600'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z' />
        </svg>

        <div className='flex flex-col '>
          <p className='dark:text-gray-50'>{collaborator.name}</p>
          <p className='text-sm text-gray-400'>{collaborator.email}</p>
        </div>
        {fetchAlert.msg && (<Alert alert={fetchAlert} />)}
        {isAdmin && (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='min-w-min mt-1 w-5 h-5 fill-red-400 mr-2 cursor-pointer' onClick={() => deleteCollaboratorClick(collaborator._id)}>
            <path d='M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z' />
            <path fillRule='evenodd' d='M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z' clipRule='evenodd' />
          </svg>
        )}
      </div>
    </>
  )
}

export default Collaborator

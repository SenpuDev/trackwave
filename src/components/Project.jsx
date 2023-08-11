import { useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import { useEffect, useState } from 'react'
import { deleteProject } from '../helpers/requestFunctions'
import Alert from './Alert'
import Spinner from './Spinner'
import useFetch from '../hooks/useFetch'
import MenuDropdown from '../components/MenuDropdown'
import ModalTask from '../components/ModalTask'
import Tasks from './Tasks'
import Collaborator from './Collaborator'
import useAdmin from '../hooks/useAdmin'
import io from 'socket.io-client'
import ArtFullImg from '../img/art-full.png'
import '../styles/swalCustom.css'
import { provideSwal } from '../helpers/swalCustom'
import Divider from './Divider'
import { toast } from 'react-hot-toast'

let socket

const Project = () => {
  const params = useParams()
  const isAdmin = useAdmin()

  const { project, loading, obtainProject, setProject, projectAlert } = useProjects()
  const { name, description, client, deadLine } = project

  const deleteProjectObject = { id: params.id }
  const { fetchAlert, setStartFetch } = useFetch(deleteProjectObject, deleteProject)

  const [modal, setModal] = useState(false)

  useEffect(() => {
    obtainProject(params.id)
  }, [])

  const deleteProjectClick = async () => {
    const tailwindSwal = await provideSwal()
    tailwindSwal.fire({
      title: 'Are you sure?',
      html: `Wants to delete <span class='text-orange-400'>${name}</span> project? You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#818CF8',
      cancelButtonColor: '#f87171',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setStartFetch(true)
      }
    })
  }

  // Socket.io {
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('open project', params.id)
  }, [])

  useEffect(() => {
    const handleTaskAdded = (addedTask) => {
      if (addedTask.project._id === project._id) {
        const projectWithNewTask = { ...project }
        projectWithNewTask.tasks = [...project.tasks, addedTask]
        setProject(projectWithNewTask)
        toast.custom((t) => (
          <div className={`${t.visible ? 'animate-fade-down' : 'animate-fade-up animate-alternate-reverse'} dark:text-white bg-gray-50 dark:bg-slate-700 text-center rounded-lg mx-auto p-2 max-w-md w-full shadow-lg`}>
            <svg aria-hidden='true' className='flex-shrink-0 inline w-6 h-6 mr-3' fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' clipRule='evenodd' /></svg>
            <span className='text-orange-400'>{addedTask.name} </span>
            updated by {addedTask.lastUpdateBy.name}
          </div>
        ), { duration: 4000 })
      }
    }
    const handleTaskDeleted = (deletedTask) => {
      if (deletedTask.project._id === project._id) {
        const updatedTasks = { ...project }
        updatedTasks.tasks = updatedTasks.tasks.filter(task => task._id !== deletedTask._id)
        setProject(updatedTasks)
        toast.custom((t) => (
          <div className={`${t.visible ? 'animate-fade-down' : 'animate-fade-up animate-alternate-reverse'} dark:text-white bg-gray-50 dark:bg-slate-700 text-center rounded-lg mx-auto p-2 max-w-md w-full shadow-lg`}>
            <svg aria-hidden='true' className='flex-shrink-0 inline w-6 h-6 mr-3' fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' clipRule='evenodd' /></svg>
            <span className='text-orange-400'>{deletedTask.name} </span>
            deleted by {deletedTask.lastUpdateBy.name}
          </div>
        ), { duration: 4000 })
      }
    }
    const handleTaskUpdate = (editedTask) => {
      if (editedTask.project._id === project._id) {
        const projectWithUpdatedTask = { ...project }
        projectWithUpdatedTask.tasks = projectWithUpdatedTask.tasks.map(task => task._id === editedTask._id ? editedTask : task)
        setProject(projectWithUpdatedTask)

        toast.custom((t) => (
          <div className={`${t.visible ? 'animate-fade-down' : 'animate-fade-up animate-alternate-reverse'} dark:text-white bg-gray-50 dark:bg-slate-700 text-center rounded-lg mx-auto p-2 max-w-md w-full shadow-lg`}>
            <svg aria-hidden='true' className='flex-shrink-0 inline w-6 h-6 mr-3' fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' clipRule='evenodd' /></svg>
            <span className='text-orange-400'>{editedTask.name} </span>
            updated by {editedTask.lastUpdateBy.name}
          </div>
        ), { duration: 4000 })
      }
    }

    socket.on('task added', handleTaskAdded)
    socket.on('task deleted', handleTaskDeleted)
    socket.on('task updated', handleTaskUpdate)

    return () => {
      socket.off('task added', handleTaskAdded)
      socket.off('task deleted', handleTaskDeleted)
      socket.off('task updated', handleTaskUpdate)
    }
  }) // } Socket.io

  const date = new Date(deadLine)

  if (loading) return <Spinner />

  return (
    <>
      {projectAlert.msg && (
        <div className='p-10 shadow-sm bg-gray-50 dark:bg-slate-800 rounded'>
          <Alert alert={projectAlert} />
        </div>
      )}
      {fetchAlert.msg && (
        <Alert alert={fetchAlert} />
      )}
      {project.name &&
        (
          <>
            <ModalTask modal={modal} setModal={setModal}>
              <Divider type='task' text='Add new task' />
            </ModalTask>

            <div className='p-10 shadow-sm bg-gray-50 dark:bg-slate-800 rounded relative'>
              <img src={ArtFullImg} alt='Decorative art' className='absolute top-0 right-0 opacity-10 w-full pointer-events-none' />
              <div className='flex justify-between items-center'>
                <h2 className='text-3xl font-bold dark:text-white'>{name}</h2>
                {isAdmin && (
                  <div className='gap-3 flex'>
                    <MenuDropdown addActions setModal={setModal} addCollaboratorLink={`/projects/new-collaborator/${params.id}`} />
                    <MenuDropdown projectActions deleteProjectClick={deleteProjectClick} editProjectLink={`/projects/edit/${params.id}`} />
                  </div>
                )}
              </div>

              <div className='my-5'>
                <p className='dark:text-gray-50'>{description}</p>
              </div>

              <Divider type='task' text='Tasks' />

              <div className='mb-5'>
                {project.tasks?.length
                  ? <Tasks tasks={project.tasks} />
                  : <p className='mx-auto dark:text-gray-50 w-full text-center m-2 p-2'>You don&#39;t have any tasks</p>}
              </div>

              <Divider type='collaborator' text='Collaborators' />

              {project.collaborators?.length
                ? (
                  <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {project.collaborators.map(collaborator => (
                      <Collaborator key={collaborator._id} collaborator={collaborator} projectId={params.id} />
                    ))}
                  </div>
                  )
                : (
                  <p className='mx-auto dark:text-gray-50 w-full text-center m-2 p-2'>No collaborators for now</p>
                  )}
              <div className='flex justify-between mt-10'>
                <p className='dark:text-gray-50'>
                  <span className='italic text-gray-400 text-sm'>Client: </span>
                  {client}
                </p>
                <p className='dark:text-gray-50'>
                  <span className='italic text-gray-400 text-sm'>Estimated finish date: </span>
                  {date.toLocaleString()}
                </p>
              </div>
            </div>
          </>
        )}

    </>
  )
}

export default Project

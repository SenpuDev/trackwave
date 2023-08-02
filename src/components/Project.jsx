import { useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import { useEffect, useState } from 'react'
import { deleteProject } from '../helpers/requestFunctions'
import useAuth from '../hooks/useAuth'
import Alert from './Alert'
import Swal from 'sweetalert2'
import Spinner from './Spinner'
import useSendRequest from '../hooks/useSendRequest'
import MenuDropdown from '../components/MenuDropdown'
import ModalTask from '../components/ModalTask'
import Tasks from './Tasks'
import TasksStatus from './TasksStatus'
import Collaborator from './Collaborator'
import useAdmin from '../hooks/useAdmin'
import io from 'socket.io-client'

let socket
const Project = () => {
  const params = useParams()
  const { auth } = useAuth()
  const isAdmin = useAdmin()

  const { project, loading, obtainProject, setProject } = useProjects()
  const { name, description, client, deadLine } = project

  const deleteInitialObject = { id: params.id, token: auth.token }
  const { alert, setValidateForm } = useSendRequest(deleteInitialObject, deleteProject)

  const [modal, setModal] = useState(false)

  useEffect(() => {
    obtainProject(params.id)
  }, [])

  // Socket.io
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('open project', params.id)
  }, [])

  useEffect(() => {
    socket.on('task added', addedTask => {
      if (addedTask.project._id === project._id) {
        const projectWithNewTask = { ...project }
        projectWithNewTask.tasks = [...project.tasks, addedTask]
        setProject(projectWithNewTask)
      }
    })
    socket.on('task deleted', deletedTask => {
      if (deletedTask.project._id === project._id) {
        const updatedTasks = { ...project }
        updatedTasks.tasks = updatedTasks.tasks.filter(task => task._id !== deletedTask._id)
        setProject(updatedTasks)
      }
    })

    socket.on('task updated', editedTask => {
      if (editedTask.project._id === project._id) {
        const projectWithUpdatedTask = { ...project }
        projectWithUpdatedTask.tasks = projectWithUpdatedTask.tasks.map(task => task._id === editedTask._id ? editedTask : task)
        setProject(projectWithUpdatedTask)
      }
    })
  })

  const deleteClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setValidateForm(true)
      }
    })
  }

  const date = new Date(deadLine)

  if (loading) return <Spinner />

  return (
    <>
      {project.name &&
        (
          <>
            {alert.msg && <Alert alert={alert} />}
            <ModalTask modal={modal} setModal={setModal}>
              <h3>Add task</h3>
            </ModalTask>

            <div className='p-10 shadow-md bg-gray-50 dark:bg-slate-800 rounded'>

              <div className='flex justify-between items-center'>
                <h2 className='text-3xl'>{name}</h2>
                {isAdmin && (
                  <div className='gap-3 flex'>
                    <MenuDropdown addActions setModal={setModal} addCollaboratorLink={`/projects/new-collaborator/${params.id}`} />
                    <MenuDropdown projectActions deleteClick={deleteClick} editLink={`/projects/edit/${params.id}`} />
                  </div>
                )}
              </div>

              <div className='mt-5'>
                <p>{description}</p>
                <div className='flex justify-between mt-5'>
                  <p>{client}</p>
                  <p>{date.toLocaleString()}</p>
                </div>
              </div>

              <div className='bg-slate-200 rounded-md py-2'>
                <TasksStatus />
                <div className='flex'>
                  {project.tasks?.length
                    ? <Tasks tasks={project.tasks} />
                    : <p className='mx-auto bg-slate-200 w-full text-center m-2 p-2'>You don&#39;t have any tasks</p>}
                </div>
              </div>
              <div className='grid grid-cols-1 grid-rows-3 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2'>
                {project.collaborators?.length
                  ? project.collaborators.map(collaborator =>
                    <Collaborator key={collaborator._id} collaborator={collaborator} projectId={params.id} token={auth.token} />
                  )
                  : <p className='mx-auto bg-slate-200 w-full text-center m-2 p-2'>No collaborators</p>}
              </div>
            </div>
          </>
        )}

    </>
  )
}

export default Project

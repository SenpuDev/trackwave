import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import ModalTask from './ModalTask'
import useAuth from '../hooks/useAuth'
import { deleteTask, updateTaskStatus } from '../helpers/requestFunctions'
import { camelCaseToWords } from '../helpers/miscellaneous'
import useAdmin from '../hooks/useAdmin'
import io from 'socket.io-client'
import { useParams } from 'react-router-dom'
import DraggableTask from './DraggableTask'
import useFetch from '../hooks/useFetch'
import Divider from './Divider'
import { provideSwal } from '../helpers/swalCustom'

let socket

const Tasks = ({ tasks }) => {
  const params = useParams()
  const { auth } = useAuth()
  const isAdmin = useAdmin()
  const [pending, setPending] = useState([])
  const [inProgress, setInProgress] = useState([])
  const [underReview, setUnderReview] = useState([])
  const [completed, setCompleted] = useState([])
  const [taskObject, setTaskObject] = useState({ id: '' })

  const [currentTask, setCurrentTask] = useState()

  const { setStartFetch } = useFetch(taskObject, deleteTask)

  // Socket.io
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('open project', params.id)
  }, [])

  const deleteClick = async (itemId, itemName) => {
    const updateTaskObject = { ...taskObject }
    updateTaskObject.id = itemId
    setTaskObject(updateTaskObject)
    const tailwindSwal = await provideSwal()
    tailwindSwal.fire({
      title: 'Are you sure?',
      html: `Delete the following task: <span class='text-orange-400'>${itemName}</span>? You won't be able to revert this!`,
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
  const [modal, setModal] = useState(false)
  useEffect(() => {
    setPending(tasks.filter((item) => item.status === 'Pending'))
    setInProgress(tasks.filter((item) => item.status === 'In Progress'))
    setUnderReview(tasks.filter((item) => item.status === 'Under Review'))
    setCompleted(tasks.filter((item) => item.status === 'Completed'))
  }, [tasks])

  // Get specific state
  const getList = (id) => {
    switch (id) {
      case 'pending':
        return pending
      case 'inProgress':
        return inProgress
      case 'underReview':
        return underReview
      case 'completed':
        return completed
    }
  }

  // When moves a item in same list
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  // When moves an item to other item list
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
  }

  const onDragEnd = (result) => {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }

    // dropped in same list
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      )

      if (source.droppableId === 'pending') {
        setPending(items)
      }
      if (source.droppableId === 'inProgress') {
        setInProgress(items)
      }
      if (source.droppableId === 'underReview') {
        setUnderReview(items)
      }
      if (source.droppableId === 'completed') {
        setCompleted(items)
      }
    } else { // dropped in diferent list
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      )
      const sourceIndex = source.index

      result.pending && setPending(result.pending)
      result.inProgress && setInProgress(result.inProgress)
      result.underReview && setUnderReview(result.underReview)
      result.completed && setCompleted(result.completed)

      const updateTaskInDb = async () => {
        let elementToSend

        switch (source.droppableId) {
          case 'pending':
            elementToSend = pending[sourceIndex]
            break
          case 'inProgress':
            elementToSend = inProgress[sourceIndex]
            break
          case 'underReview':
            elementToSend = underReview[sourceIndex]
            break
          case 'completed':
            elementToSend = completed[sourceIndex]
            break
          default:
            break
        }

        elementToSend.lastUpdateBy = auth._id
        elementToSend.status = camelCaseToWords(destination.droppableId)
        const result = await updateTaskStatus(elementToSend)
        socket.emit('update task', result.editedTask)
      }
      updateTaskInDb()
    }
  }

  return (
    <>
      <ModalTask modal={modal} setModal={setModal} currentTask={currentTask}>
        <Divider type='task' text='Edit task' />
      </ModalTask>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='flex flex-col lg:flex-row gap-4 flex-1'>
          <div className='w-full z-10'>
            <p className='text-center p-2 rounded-md relative shadow-md bg-gray-50 dark:bg-slate-700 dark:text-gray-50'>
              <span className='right-0 mx-auto left-0 top-0 w-full py-0.5 rounded-tr-md rounded-tl-md bg-red-400 absolute' />
              Pending
            </p>
            <Droppable droppableId='pending'>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={`${snapshot.isDraggingOver && 'bg-red-200'}`}
                >
                  {pending?.map((item, index) => (
                    <DraggableTask item={item} index={index} key={index} isAdmin={isAdmin} deleteClick={deleteClick} setModal={setModal} setCurrentTask={setCurrentTask} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

          </div>
          <div className='w-full z-10'>
            <p className='text-center p-2 rounded-md relative shadow-md bg-gray-50 dark:bg-slate-700 dark:text-gray-50'>
              <span className='right-0 mx-auto left-0 top-0 w-full py-0.5 rounded-tr-md rounded-tl-md bg-orange-400 absolute' />
              In progress
            </p>
            <Droppable droppableId='inProgress'>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={`${snapshot.isDraggingOver && 'bg-orange-200'}`}
                >
                  {inProgress?.map((item, index) => (
                    <DraggableTask item={item} index={index} key={index} isAdmin={isAdmin} deleteClick={deleteClick} setModal={setModal} setCurrentTask={setCurrentTask} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className='w-full z-10'>
            <p className='text-center p-2 rounded-md relative shadow-md bg-gray-50 dark:bg-slate-700 dark:text-gray-50'>
              <span className='right-0 mx-auto left-0 top-0 w-full py-0.5 rounded-tr-md rounded-tl-md bg-yellow-400 absolute' />
              Under Review
            </p>
            <Droppable droppableId='underReview'>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={`${snapshot.isDraggingOver && 'bg-yellow-200'}`}
                >
                  {underReview?.map((item, index) => (
                    <DraggableTask item={item} index={index} key={index} isAdmin={isAdmin} deleteClick={deleteClick} setModal={setModal} setCurrentTask={setCurrentTask} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className='w-full z-10'>
            <p className='text-center p-2 rounded-md relative shadow-md bg-gray-50 dark:bg-slate-700 dark:text-gray-50'>
              <span className='right-0 mx-auto left-0 top-0 w-full py-0.5 rounded-tr-md rounded-tl-md bg-green-400 absolute' />
              Completed
            </p>
            <Droppable droppableId='completed'>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={`${snapshot.isDraggingOver && 'bg-green-200'}`}
                >
                  {completed?.map((item, index) => (
                    <DraggableTask item={item} index={index} key={index} isAdmin={isAdmin} deleteClick={deleteClick} setModal={setModal} setCurrentTask={setCurrentTask} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </>
  )
}

export default Tasks

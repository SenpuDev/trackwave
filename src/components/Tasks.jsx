import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import ModalTask from './ModalTask'
import useSendRequest from '../hooks/useSendRequest'
import useAuth from '../hooks/useAuth'
import { deleteTask, updateTaskStatus } from '../helpers/requestFunctions'
import Swal from 'sweetalert2'
import { camelCaseToWords } from '../helpers/miscellaneous'
import useAdmin from '../hooks/useAdmin'
import io from 'socket.io-client'
import { useParams } from 'react-router-dom'

let socket
const Tasks = ({ tasks }) => {
  const params = useParams()
  const { auth } = useAuth()
  const isAdmin = useAdmin()
  const [pending, setPending] = useState([])
  const [inProgress, setInProgress] = useState([])
  const [underReview, setUnderReview] = useState([])
  const [completed, setCompleted] = useState([])

  const [expandedItems, setExpandedItems] = useState([])

  const [currentTask, setCurrentTask] = useState()

  const deleteInitialObject = { id: '', token: auth.token }
  const { setFormData, setValidateForm } = useSendRequest(deleteInitialObject, deleteTask)

  // Socket.io
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('open project', params.id)
  }, [])

  const deleteClick = (itemId) => {
    const updatedFormData = { ...deleteInitialObject }
    updatedFormData.id = itemId
    setFormData(updatedFormData)
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
  const [modal, setModal] = useState(false)

  const handleClickExpand = (itemId) => {
    setExpandedItems((prevExpanded) =>
      prevExpanded.includes(itemId)
        ? prevExpanded.filter((id) => id !== itemId)
        : [...prevExpanded, itemId]
    )
  }

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
        const result = await updateTaskStatus(elementToSend, auth.token)
        socket.emit('update task', result.editedTask)
      }
      updateTaskInDb()
    }
  }

  return (
    <>
      <ModalTask modal={modal} setModal={setModal} currentTask={currentTask}>
        <h3>Edit task</h3>
      </ModalTask>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='pending'>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className={`w-1/4 ${snapshot.isDraggingOver ? 'bg-red-200' : 'bg-slate-200'}`}
            >
              {pending?.map((item, index) => (
                <Draggable
                  key={item._id}
                  draggableId={item._id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-2 rounded-md m-2 bg-gray-50 shadow-md ${snapshot.isDragging}`}
                    >
                      <div className='flex justify-between'>
                        <p>{item.name}</p>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='#9ca3af' className='w-6 h-6 cursor-pointer' onClick={() => handleClickExpand(item._id)}>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                        </svg>
                      </div>

                      <div className='flex justify-between mt-2'>
                        <p className={`text-xs ${item.priority === 'Low' ? 'text-green-600' : item.priority === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>{item.priority}</p>
                        <p className='text-gray-400 text-xs '>{new Date(item.deadLine).toLocaleString().split(',')[0]}</p>
                      </div>

                      {expandedItems.includes(item._id) && (
                        <>
                          <p className='text-gray-400 text-xs mt-2'>{item.description}</p>
                          {item.lastUpdateBy?.name && (
                            <p className='text-gray-400 font-bold text-xs mt-2'>Last update: {item.lastUpdateBy.name}</p>
                          )}
                          {isAdmin && (
                            <div className='flex justify-end gap-2'>
                              <svg
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='mt-1 h-5 w-5 opacity-50 cursor-pointer'
                                aria-hidden='true'
                                onClick={() => [setModal(true), setCurrentTask(item)]}
                              >
                                <path
                                  d='M4 13V16H7L16 7L13 4L4 13Z'
                                  fill='#EDE9FE'
                                  stroke='#7893f9'
                                  strokeWidth='2'
                                />
                              </svg>

                              <svg
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='mt-1 h-5 w-5 opacity-50 cursor-pointer'
                                onClick={() => deleteClick(item._id)}
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
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId='inProgress'>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className={`w-1/4 ${snapshot.isDraggingOver ? 'bg-orange-200' : 'bg-slate-200'}`}
            >
              {inProgress?.map((item, index) => (
                <Draggable
                  key={item._id}
                  draggableId={item._id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-2 rounded-md m-2 bg-gray-50 shadow-md ${snapshot.isDragging}`}
                    >
                      <div className='flex justify-between'>
                        <p>{item.name}</p>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='#9ca3af' className='w-6 h-6 cursor-pointer' onClick={() => handleClickExpand(item._id)}>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                        </svg>
                      </div>

                      <div className='flex justify-between mt-2'>
                        <p className={`text-xs ${item.priority === 'Low' ? 'text-green-600' : item.priority === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>{item.priority}</p>
                        <p className='text-gray-400 text-xs '>{new Date(item.deadLine).toLocaleString().split(',')[0]}</p>
                      </div>

                      {expandedItems.includes(item._id) && (
                        <>
                          <p className='text-gray-400 text-xs mt-2'>{item.description}</p>
                          {item.lastUpdateBy?.name && (
                            <p className='text-gray-400 font-bold text-xs mt-2'>Last update: {item.lastUpdateBy.name}</p>
                          )}
                          {isAdmin && (
                            <div className='flex justify-end gap-2'>
                              <svg
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='mt-1 h-5 w-5 opacity-50 cursor-pointer'
                                aria-hidden='true'
                                onClick={() => [setModal(true), setCurrentTask(item)]}
                              >
                                <path
                                  d='M4 13V16H7L16 7L13 4L4 13Z'
                                  fill='#EDE9FE'
                                  stroke='#7893f9'
                                  strokeWidth='2'
                                />
                              </svg>

                              <svg
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='mt-1 h-5 w-5 opacity-50 cursor-pointer'
                                onClick={() => deleteClick(item._id)}
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
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId='underReview'>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className={`w-1/4 ${snapshot.isDraggingOver ? 'bg-yellow-200' : 'bg-slate-200'}`}
            >
              {underReview?.map((item, index) => (
                <Draggable
                  key={item._id}
                  draggableId={item._id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-2 rounded-md m-2 bg-gray-50 shadow-md ${snapshot.isDragging}`}
                    >
                      <div className='flex justify-between'>
                        <p>{item.name}</p>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='#9ca3af' className='w-6 h-6 cursor-pointer' onClick={() => handleClickExpand(item._id)}>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                        </svg>
                      </div>

                      <div className='flex justify-between mt-2'>
                        <p className={`text-xs ${item.priority === 'Low' ? 'text-green-600' : item.priority === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>{item.priority}</p>
                        <p className='text-gray-400 text-xs '>{new Date(item.deadLine).toLocaleString().split(',')[0]}</p>
                      </div>

                      {expandedItems.includes(item._id) && (
                        <>
                          <p className='text-gray-400 text-xs mt-2'>{item.description}</p>
                          {item.lastUpdateBy?.name && (
                            <p className='text-gray-400 font-bold text-xs mt-2'>Last update: {item.lastUpdateBy.name}</p>
                          )}
                          {isAdmin && (
                            <div className='flex justify-end gap-2'>
                              <svg
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='mt-1 h-5 w-5 opacity-50 cursor-pointer'
                                aria-hidden='true'
                                onClick={() => [setModal(true), setCurrentTask(item)]}
                              >
                                <path
                                  d='M4 13V16H7L16 7L13 4L4 13Z'
                                  fill='#EDE9FE'
                                  stroke='#7893f9'
                                  strokeWidth='2'
                                />
                              </svg>

                              <svg
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='mt-1 h-5 w-5 opacity-50 cursor-pointer'
                                onClick={() => deleteClick(item._id)}
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
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId='completed'>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className={`w-1/4 ${snapshot.isDraggingOver ? 'bg-green-200' : 'bg-slate-200'}`}
            >
              {completed?.map((item, index) => (
                <Draggable
                  key={item._id}
                  draggableId={item._id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-2 rounded-md m-2 bg-gray-50 shadow-md ${snapshot.isDragging}`}
                    >
                      <div className='flex justify-between'>
                        <p>{item.name}</p>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='#9ca3af' className='w-6 h-6 cursor-pointer' onClick={() => handleClickExpand(item._id)}>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                        </svg>
                      </div>

                      <div className='flex justify-between mt-2'>
                        <p className={`text-xs ${item.priority === 'Low' ? 'text-green-600' : item.priority === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>{item.priority}</p>
                        <p className='text-gray-400 text-xs '>{new Date(item.deadLine).toLocaleString().split(',')[0]}</p>
                      </div>

                      {expandedItems.includes(item._id) && (
                        <>
                          <p className='text-gray-400 text-xs mt-2'>{item.description}</p>
                          {item.lastUpdateBy?.name && (
                            <p className='text-gray-400 font-bold text-xs mt-2'>Last update: {item.lastUpdateBy.name}</p>
                          )}
                          {isAdmin && (
                            <div className='flex justify-end gap-2'>
                              <svg
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='mt-1 h-5 w-5 opacity-50 cursor-pointer'
                                aria-hidden='true'
                                onClick={() => [setModal(true), setCurrentTask(item)]}
                              >
                                <path
                                  d='M4 13V16H7L16 7L13 4L4 13Z'
                                  fill='#EDE9FE'
                                  stroke='#7893f9'
                                  strokeWidth='2'
                                />
                              </svg>

                              <svg
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='mt-1 h-5 w-5 opacity-50 cursor-pointer'
                                onClick={() => deleteClick(item._id)}
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
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default Tasks

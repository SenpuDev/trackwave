import { Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'

const DraggableTask = ({ item, index, isAdmin, deleteClick, setModal, setCurrentTask }) => {
  const [expandedItems, setExpandedItems] = useState([])

  const handleClickExpand = (itemId) => {
    setExpandedItems((prevExpanded) =>
      prevExpanded.includes(itemId)
        ? prevExpanded.filter((id) => id !== itemId)
        : [...prevExpanded, itemId]
    )
  }
  return (
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
          className={`p-2 rounded-md my-2 bg-gray-50 dark:bg-slate-700 shadow-md ${snapshot.isDragging}`}
        >
          <div className='flex justify-between'>
            <p className='dark:text-gray-50'>{item.name}</p>
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
                <div className='flex justify-end gap'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='mt-1 w-5 h-5 fill-indigo-400 mr-2 cursor-pointer' onClick={() => [setModal(true), setCurrentTask(item)]}>
                    <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z' />
                    <path d='M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z' />
                  </svg>

                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='mt-1 w-5 h-5 fill-red-400 mr-2 cursor-pointer' onClick={() => deleteClick(item._id, item.name)}>
                    <path d='M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z' />
                    <path fillRule='evenodd' d='M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z' clipRule='evenodd' />
                  </svg>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Draggable>
  )
}

export default DraggableTask

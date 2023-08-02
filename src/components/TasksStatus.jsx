const TasksStatus = () => {
  return (
    <ul className='w-full flex px-2 gap-4'>
      <li className='w-1/4 text-center p-2 rounded-md relative shadow-md bg-gray-50'>
        <span className='right-0 mx-auto left-0 top-0 text-white w-full py-0.5 rounded-tr-md rounded-tl-md bg-red-400 absolute' />
        Pending
      </li>
      <li className='w-1/4 text-center p-2 rounded-md relative shadow-md bg-gray-50'>
        <span className='right-0 mx-auto left-0 top-0 text-white w-full py-0.5 rounded-tr-md rounded-tl-md bg-orange-400 absolute' />
        In progress
      </li>
      <li className='w-1/4 text-center p-2 rounded-md relative shadow-md bg-gray-50'>
        <span className='right-0 mx-auto left-0 top-0 text-white w-full py-0.5 rounded-tr-md rounded-tl-md bg-yellow-400 absolute' />
        Under Review
      </li>
      <li className='w-1/4 text-center p-2 rounded-md relative shadow-md bg-gray-50'>
        <span className='right-0 mx-auto left-0 top-0 text-white w-full py-0.5 rounded-tr-md rounded-tl-md bg-green-400 absolute' />
        Completed
      </li>
    </ul>
  )
}

export default TasksStatus

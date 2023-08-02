import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const MenuDropdown = ({ deleteClick, editLink, projectActions = false, addActions = false, setModal = false, addCollaboratorLink }) => {
  return (
    <>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='rounded-full bg-indigo-400 px-2 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>

            {projectActions && (
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z' />
              </svg>
            )}

            {addActions && (
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
              </svg>
            )}

          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            {projectActions && (
              <>
                <div className='px-1 py-1 '>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`${
                        active ? 'bg-indigo-400 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`} to={editLink}
                      >
                        {active
                          ? (
                            <EditActiveIcon
                              className='mr-2 h-5 w-5'
                              aria-hidden='true'
                            />
                            )
                          : (
                            <EditInactiveIcon
                              className='mr-2 h-5 w-5'
                              aria-hidden='true'
                            />
                            )}Edit Project Info
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className='px-1 py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={deleteClick}
                        className={`${
                      active ? 'bg-red-400 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active
                          ? (
                            <DeleteActiveIcon
                              className='mr-2 h-5 w-5'
                              aria-hidden='true'
                            />
                            )
                          : (
                            <DeleteInactiveIcon
                              className='mr-2 h-5 w-5'
                              aria-hidden='true'
                            />
                            )}
                        Delete Project
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </>
            )}
            {addActions && (
              <>
                <div className='px-1 py-1 '>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setModal(true)}
                        className={`${
                        active ? 'bg-indigo-400 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`} to={editLink}
                      >
                        {active
                          ? (
                            <AddTaskActiveIcon
                              className='mr-2 h-5 w-5'
                              aria-hidden='true'
                            />
                            )
                          : (
                            <AddTaskInactiveIcon
                              className='mr-2 h-5 w-5'
                              aria-hidden='true'
                            />
                            )}Add Task
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className='px-1 py-1 '>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`${
                        active ? 'bg-indigo-400 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`} to={addCollaboratorLink}
                      >
                        {active
                          ? (
                            <AddCollaboratorActiveIcon
                              className='mr-2 h-5 w-5'
                              aria-hidden='true'
                            />
                            )
                          : (
                            <AddCollaboratorInactiveIcon
                              className='mr-2 h-5 w-5'
                              aria-hidden='true'
                            />
                            )}Add Colaborator
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

// Button styles icons (Active and inactive)
function EditInactiveIcon (props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 13V16H7L16 7L13 4L4 13Z'
        fill='#EDE9FE'
        stroke='#7893f9'
        strokeWidth='2'
      />
    </svg>
  )
}

function EditActiveIcon (props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 13V16H7L16 7L13 4L4 13Z'
        fill='#7893f9'
        stroke='#EDE9FE'
        strokeWidth='2'
      />
    </svg>
  )
}

function DeleteInactiveIcon (props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='5'
        y='6'
        width='10'
        height='10'
        fill='#EDE9FE'
        stroke='#7893f9'
        strokeWidth='2'
      />
      <path d='M3 6H17' stroke='#7893f9' strokeWidth='2' />
      <path d='M8 6V4H12V6' stroke='#7893f9' strokeWidth='2' />
    </svg>
  )
}

function DeleteActiveIcon (props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='5'
        y='6'
        width='10'
        height='10'
        fill='#f87171'
        stroke='#EDE9FE'
        strokeWidth='2'
      />
      <path d='M3 6H17' stroke='#EDE9FE' strokeWidth='2' />
      <path d='M8 6V4H12V6' stroke='#EDE9FE' strokeWidth='2' />
    </svg>
  )
}

function AddCollaboratorActiveIcon (props) {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
      <path stroke='#EDE9FE' strokeWidth='2' fill='#7893f9' d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z' />
    </svg>
  )
}
function AddCollaboratorInactiveIcon (props) {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
      <path stroke='#7893f9' fill='#EDE9FE' strokeWidth='2' d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z' />
    </svg>
  )
}

function AddTaskActiveIcon (props) {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
      <path stroke='#EDE9FE' strokeWidth='2' fill='#7893f9' d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' />
    </svg>
  )
}
function AddTaskInactiveIcon (props) {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
      <path stroke='#7893f9' fill='#EDE9FE' strokeWidth='2' d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' />
    </svg>
  )
}

export default MenuDropdown

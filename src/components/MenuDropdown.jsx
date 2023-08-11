import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const MenuDropdown = ({ deleteProjectClick, editProjectLink, projectActions = false, addActions = false, setModal = false, addCollaboratorLink }) => {
  return (
    <>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='rounded-full bg-indigo-400 p-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>

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
          <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10'>
            {projectActions && (
              <>
                <div className='px-1 py-1 '>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`${
                        active ? 'bg-indigo-400 text-white' : 'text-gray-900 dark:text-white'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`} to={editProjectLink}
                      >
                        {active
                          ? (
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5 fill-white mr-2'>
                              <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z' />
                              <path d='M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z' />
                            </svg>

                            )
                          : (
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-5 h-5 fill-indigo-400 mr-2'>
                              <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z' />
                              <path d='M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z' />
                            </svg>

                            )}Edit Project Info
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className='px-1 py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={deleteProjectClick}
                        className={`${
                      active ? 'bg-red-400 text-white' : 'text-gray-900 dark:text-white'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active
                          ? (
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-5 h-5 fill-white mr-2'>
                              <path d='M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z' />
                              <path fillRule='evenodd' d='M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z' clipRule='evenodd' />
                            </svg>

                            )
                          : (
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-5 h-5 fill-indigo-400 mr-2'>
                              <path d='M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z' />
                              <path fillRule='evenodd' d='M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z' clipRule='evenodd' />
                            </svg>

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
                        active ? 'bg-indigo-400 text-white' : 'text-gray-900 dark:text-white'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`} to={editProjectLink}
                      >
                        {active
                          ? (
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-5 h-5 fill-white mr-2'>
                              <path fillRule='evenodd' d='M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM12.75 12a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12z' clipRule='evenodd' />
                              <path d='M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z' />
                            </svg>
                            )
                          : (
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-5 h-5 fill-indigo-400 mr-2'>
                              <path fillRule='evenodd' d='M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM12.75 12a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12z' clipRule='evenodd' />
                              <path d='M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z' />
                            </svg>

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
                        active ? 'bg-indigo-400 text-white' : 'text-gray-900 dark:text-white'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`} to={addCollaboratorLink}
                      >
                        {active
                          ? (
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-5 h-5 fill-white mr-2'>
                              <path d='M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z' />
                            </svg>
                            )
                          : (
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-5 h-5 fill-indigo-400 mr-2'>
                              <path d='M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z' />
                            </svg>
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

export default MenuDropdown

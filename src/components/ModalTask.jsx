import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import FormField from './FormField'
import { useParams } from 'react-router-dom'
import { addTask, editTask } from '../helpers/requestFunctions'
import Alert from './Alert'
import { kebabToCamelCase, minDate, localDate } from '../helpers/miscellaneous'
import useValidate from '../hooks/useValidate'
import useFetch from '../hooks/useFetch'

const PRIORITY = ['Low', 'Medium', 'High']

const ModalTask = ({ modal, setModal, children, currentTask }) => {
  const params = useParams()

  const initialObject = { name: '', description: '', deadLine: '', priority: '', project: params.id }
  const { validationAlert, setStartValidation, objectToValidate, setObjectToValidate, setObjectIsValid, objectIsValid } = useValidate(initialObject)
  const { fetchAlert, setFetchAlert, setStartFetch, dataSentOk, setDataSentOk } = useFetch(objectToValidate, currentTask?.name ? editTask : addTask, setObjectIsValid)

  // When edit, fill the form
  useEffect(() => {
    const fillForm = () => {
      if (currentTask?.name) {
        const updatedObjectToValidate = { id: currentTask._id, name: currentTask.name, description: currentTask.description, deadLine: currentTask.deadLine, priority: currentTask.priority, project: params.id }
        setObjectToValidate(updatedObjectToValidate)
      }
    }
    fillForm()
  }, [currentTask])

  // If object to send has id, editTask, else add task

  const handleChange = (e) => {
    const { name, value } = e.target
    const camelCaseName = kebabToCamelCase(name)
    setObjectToValidate((objectToValidate) => ({ ...objectToValidate, [camelCaseName]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStartValidation(true)
  }

  // Send Request if Object is Ok!
  useEffect(() => {
    if (objectIsValid) {
      setStartFetch(true)
    }
  }, [objectIsValid])

  // Reset Form on Data successfully send
  useEffect(() => {
    if (dataSentOk) {
      setObjectToValidate(initialObject)
      setDataSentOk(false)
      setTimeout(() => { setModal(false) }, 1250)
      setTimeout(() => [setFetchAlert({}), setDataSentOk(false)], 1500)
    }
  }, [dataSentOk])

  return (
    <Transition.Root show={modal} as={Fragment}>
      <Dialog as='div' className='fixed inset-0 overflow-y-auto  z-20' onClose={() => setModal(false)}>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay
              className='fixed inset-0 bg-gray-500 dark:bg-gray-950 dark:bg-opacity-75 bg-opacity-75 transition-opacity'
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-gray-50 dark:bg-slate-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>

              <div className='hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
                <button
                  type='button'
                  className='bg-white  dark:bg-slate-800 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'
                  onClick={() => setModal(false)}
                >
                  <span className='sr-only'>Close</span>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 20 20' fill='currentColor'>
                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
                  </svg>
                </button>
              </div>

              <div className='sm:flex sm:items-start'>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                  {children}
                  {(validationAlert.msg || fetchAlert.msg) && <Alert alert={validationAlert.msg ? validationAlert : fetchAlert} />}
                  <form onSubmit={handleSubmit}>
                    <FormField type='text' id='name' text='name' value={objectToValidate.name} onChange={handleChange} />
                    <FormField type='textarea' id='description' text='description' value={objectToValidate.description} onChange={handleChange} />
                    <FormField type='datetime-local' min={minDate} id='dead-line' text='Dead Line' onChange={handleChange} value={currentTask && localDate(objectToValidate.deadLine)} />
                    <FormField type='select' id='priority' text='Priority' value={objectToValidate.priority} selectOptions={PRIORITY} onChange={handleChange} />
                    <input type='submit' value={currentTask ? 'Update task' : 'Add Task'} className='bg-indigo-400 hover:bg-indigo-500 transition-all  cursor-pointer w-full py-3 text-white font-bold rounded uppercase' />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalTask

const FormField = ({ type, id, text, value, min, selectOptions, onChange }) => {
  let content

  switch (type) {
    case 'datetime-local':
    case 'email':
    case 'password':
    case 'text':
      content = (
        <input
          className='w-full p-1 rounded-lg bg-gray-100 dark:bg-slate-600 dark:border-slate-600 dark:text-slate-100 outline-none border sm:flex-1'
          type={type}
          min={min}
          id={id}
          name={id}
          value={value}
          placeholder={text}
          onChange={onChange}
        />
      )
      break

    case 'textarea':
      content = (
        <textarea
          className='w-full p-1 rounded-lg bg-gray-100 dark:bg-slate-600 dark:border-slate-600 dark:text-slate-100 outline-none border sm:flex-1'
          id={id}
          name={id}
          value={value}
          placeholder={text}
          onChange={onChange}
        />
      )
      break

    case 'select':
      content = (
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className='w-full p-1 rounded-lg bg-gray-100 dark:bg-slate-600 dark:border-slate-600 dark:text-slate-100 outline-none border sm:flex-1'
        >
          <option value=''>-- Select one --</option>

          {selectOptions.map(option => (
            <option key={option}>{option}</option>
          ))}

        </select>
      )
      break

    default:
      content = null
      break
  }
  return (
    <div className='flex sm:items-center mb-4 gap-2 flex-col sm:flex-row sm:gap-4 transition-all'>
      <label
        className='basis-1/6 uppercase text-gray-500 dark:text-gray-200 text-l italic font-semibold'
        htmlFor={id}
      >
        {text}
      </label>

      {content}
    </div>

  )
}

export default FormField

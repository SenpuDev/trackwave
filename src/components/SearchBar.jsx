import useProjects from '../hooks/useProjects'

const SearchBar = ({ header = false }) => {
  const { setSearch } = useProjects()

  return (
    <div className={`relative shadow-md rounded-xl ${header ? 'hidden md:block' : 'md:hidden block mb-4'}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3'
        fill='none '
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        />
      </svg>
      <form>
        <input
          type='text'
          placeholder='Search'
          onChange={e => setSearch(e.target.value)}
          className='w-full py-1 pl-12 text-gray-500 dark:text-white rounded-xl outline-none bg-white dark:dark:bg-slate-600 focus:border-gray-500'
        />
      </form>
    </div>
  )
}

export default SearchBar

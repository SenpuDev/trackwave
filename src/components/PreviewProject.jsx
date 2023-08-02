import { Link } from 'react-router-dom'
import ArtImg from '../img/art.png'
import useAuth from '../hooks/useAuth'

const PreviewProject = ({ project }) => {
  const { auth } = useAuth()
  const { name, _id, client, deadLine, createdBy } = project
  const date = new Date(deadLine)
  return (

    <li className='bg-gray-50 rounded dark:bg-slate-800 overflow-hidden shadow-sm relative hover:scale-105 transition-all'>
      <Link to={`${_id}`} className='px-4 py-2 flex flex-col'>
        <div className='flex gap-4'>
          <h2 className=' dark:text-gray-200'>{name}</h2>
          {auth._id !== createdBy && (
            <p className='text-xs rounded-lg p-1 font-bold text-white uppercase bg-green-400'>Collaborator</p>
          )}
        </div>

        <div className='flex justify-between'>
          <p className='text-gray-400'>{client}</p>
          <p className='text-gray-400'>{date.toLocaleString().split(',')[0]}</p>
        </div>
        <img src={ArtImg} alt='' className='absolute top-0 right-0 opacity-30' />
      </Link>

    </li>
  )
}

export default PreviewProject

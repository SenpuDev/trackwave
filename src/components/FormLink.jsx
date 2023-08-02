import { Link } from 'react-router-dom'

const FormLink = ({ to, text }) => {
  return (
    <Link to={to} className='whitespace-nowrap block text-center my-5 font-bold text-slate-400 italic uppercase text-xs hover:scale-105 transition-all cursor-pointer'>{text}</Link>
  )
}

export default FormLink

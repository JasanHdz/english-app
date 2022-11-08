import { Link, useLocation } from 'react-router-dom'

const items = [
  {
    label: 'APRENDER',
    iconURL: 'https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg',
    link: '/learn',
  },
  {
    label: 'EJERCICIOS',
    iconURL: 'https://d35aaqx5ub95lt.cloudfront.net/images/93586c9e933781ed90e75c15a6b4a185.svg',
    link: '/practice',
  },
  {
    label: 'TARJETAS',
    iconURL: 'https://d35aaqx5ub95lt.cloudfront.net/images/path/d6ba80faa8ea800a09f77470e0852f8c.svg',
    link: '/cards',
  },
]

export function SideBar() {
  const active = 'border-2 border-blue-400 bg-blue-50'
  const location = useLocation()
  return (
    <div className='mr-3 sm:mx-6 sticky top-0'>
      <ul className='flex flex-col gap-6 sm:gap-2'>
        {items.map(({ label, iconURL, link }) => {
          const classItem = 'flex gap-2 items-center px-3 sm:px-5 sm:w-56 py-2 rounded-2xl hover:bg-gray-100'.split(' ')
          if (location.pathname.includes(link)) classItem.push(...active.split(' '))
          return (
            <Link to={link}>
              <li className={classItem.join(' ')}>
                <div className='inline-block w-max'>
                  <img className='w-9 h-9' src={iconURL} alt={label} />
                </div>
                <p className={`hidden sm:block text-sm text-${location.pathname.includes(link) ? 'blue' : 'gray'}-400 font-bold hover:text-gray-600`}>{label}</p>
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}
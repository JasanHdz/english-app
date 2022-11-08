import { useMemo } from 'react'
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
  {
    label: 'Profile',
    iconURL: 'https://simg-ssl.duolingo.com/avatar/default_2/medium',
    link: '/profile',
  },
]

export function SideBar() {
  const active = 'border-2 border-blue-400 bg-blue-50'
  const location = useLocation()
  const { platform } = useMemo(() => window.navigator, [])

  return (
    <div style={{ paddingBottom: platform === 'iPhone' ? 28 : 12 }} className="fixed bg-white inset-x-0 bottom-0 px-4 border-t pt-3 sm:p-0 sm:border-none sm:sticky sm:mr-6 sm:top-0">
      <ul className='flex justify-between gap-6 sm:flex-col sm:gap-2'>
        {items.map(({ label, iconURL, link }) => {
          const classItem = 'flex gap-2 items-center rounded-xl p-0.5 sm:h-14 sm:p-2 sm:px-5 sm:w-56 hover:bg-gray-100'.split(' ')
          if (location.pathname.includes(link)) classItem.push(...active.split(' '))
          return (
            <Link key={link} to={link}>
              <li className={classItem.join(' ')}>
                <div className='inline-block w-max'>
                  <img className={`${link.includes('profile') ? 'rounded-full' : ''} w-9 h-9`} src={iconURL} alt={label} />
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
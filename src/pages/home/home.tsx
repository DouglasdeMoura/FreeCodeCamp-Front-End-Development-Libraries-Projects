import { FC } from 'react'
import { Link } from 'react-router-dom'

import { routes } from '../../routes'

export const Home: FC = () => (
  <div className="flex flex-col justify-center items-center">
    <h1 className="mb-6 text-2xl font-bold text-white">
      FreeCodeCamp&apos;s Front End Development Libraries Projects
    </h1>

    <ul className="w-96 text-gray-900 bg-white rounded-lg border border-gray-200">
      {routes.map((route) => (
        <li
          className="py-2 px-6 w-full border-b border-gray-200"
          key={route.title}
        >
          <Link to={route.path || '/'}>{route.title}</Link>
        </li>
      ))}
    </ul>
  </div>
)

import { FC } from 'react'
import { Link } from 'react-router-dom'

import { routes } from '../../routes'

export const Home: FC = () => (
  <div className="flex flex-col items-center justify-center">
    <h1 className="mb-6 text-2xl font-bold text-white">
      FreeCodeCamp&apos;s Front End Development Libraries Projects
    </h1>

    <ul className="w-96 rounded-lg border border-gray-200 bg-white text-gray-900">
      {routes.map((route) => (
        <li
          className="w-full border-b border-gray-200 py-2 px-6"
          key={route.title}
        >
          <Link to={route.path || '/'}>{route.title}</Link>
        </li>
      ))}
    </ul>
  </div>
)

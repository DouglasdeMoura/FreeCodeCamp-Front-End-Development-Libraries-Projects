import { lazy } from 'react'
import { RouteProps } from 'react-router-dom'

const Quote = lazy(() => import('./components/quote'))

export const routes: RouteProps[] = [
  {
    element: <Quote />,
    path: 'random-quote-machine',
  },
]

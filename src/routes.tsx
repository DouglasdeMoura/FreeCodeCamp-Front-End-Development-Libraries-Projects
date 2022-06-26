import { lazy } from 'react'
import { RouteProps } from 'react-router-dom'

const Quote = lazy(() => import('./components/quote'))

type Routes = {
  title: string
} & RouteProps

export const routes: Routes[] = [
  {
    title: 'Random Quote Machine',
    element: <Quote />,
    path: 'random-quote-machine',
  },
]

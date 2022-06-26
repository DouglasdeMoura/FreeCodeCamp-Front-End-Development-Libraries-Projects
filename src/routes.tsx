import { lazy } from 'react'
import { RouteProps } from 'react-router-dom'

const RandomQuoteMachine = lazy(() => import('./pages/random-quote-machine'))

type Routes = {
  title: string
} & RouteProps

export const routes: Routes[] = [
  {
    title: 'Random Quote Machine',
    element: <RandomQuoteMachine />,
    path: 'random-quote-machine',
  },
]

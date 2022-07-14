import { lazy } from 'react'
import { RouteProps } from 'react-router-dom'

const RandomQuoteMachine = lazy(() => import('./pages/random-quote-machine'))
const MarkdownPreviewer = lazy(() => import('./pages/markdown-previewer'))
const DrumMachine = lazy(() => import('./pages/drum-machine'))
const Calculator = lazy(() => import('./pages/calculator'))

type Routes = {
  title: string
} & RouteProps

export const routes: Routes[] = [
  {
    title: 'Random Quote Machine',
    element: <RandomQuoteMachine />,
    path: 'random-quote-machine',
  },
  {
    title: 'Markdown Previewer',
    element: <MarkdownPreviewer />,
    path: 'markdown-previewer',
  },
  {
    title: 'Drum Machine',
    element: <DrumMachine />,
    path: 'drum-machine',
  },
  {
    title: 'Calculator',
    element: <Calculator />,
    path: 'calculator',
  },
]

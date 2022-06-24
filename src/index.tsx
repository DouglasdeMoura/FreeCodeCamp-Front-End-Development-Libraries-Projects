import { createRoot } from 'react-dom/client'

import { Quote } from './components/quote'

if (import.meta.env.MODE === 'development') {
  const { worker } = await import('./mocks/browser')

  worker.start()
}

const container = document.getElementById('Quote')
const root = createRoot(container!)

root.render(<Quote />)

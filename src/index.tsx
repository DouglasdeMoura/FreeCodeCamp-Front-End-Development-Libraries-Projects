import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Quote } from './components/quote'

if (import.meta.env.MODE === 'development') {
  const { worker } = await import('./mocks/browser')

  worker.start()
}

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Quote />
  </QueryClientProvider>
)

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(<App />)

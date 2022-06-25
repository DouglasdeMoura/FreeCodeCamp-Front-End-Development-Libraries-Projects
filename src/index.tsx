import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Quote } from './components/quote'

if (import.meta.env.MODE === 'development') {
  const { worker } = await import('./mocks/browser')

  worker.start()
}

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="random-quote-machine" element={<Quote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
)

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(<App />)

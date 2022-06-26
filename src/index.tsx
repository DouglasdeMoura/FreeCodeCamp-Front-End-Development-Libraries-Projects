import './styles/global.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import { ErrorBoundary } from './components/error-boundary'
import Home from './pages/home'
import { routes } from './routes'

if (import.meta.env.MODE === 'development') {
  const { worker } = await import('./mocks/browser')

  worker.start()
}

const SuspendedRoute: React.FC = () => (
  <div className="flex justify-center items-center w-screen h-screen bg-emerald-500">
    <React.Suspense>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </React.Suspense>
  </div>
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SuspendedRoute />}>
          {routes.map((props) => (
            <Route {...props} key={props.path} />
          ))}
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
)

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

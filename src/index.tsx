import './styles/global.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom'

import { ErrorBoundary } from './components/error-boundary'
import Home from './pages/home'
import { routes } from './routes'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

if (import.meta.env.MODE === 'development2') {
  const { worker } = await import('./mocks/browser')

  worker.start()
}

const SuspendedRoute: React.FC = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-emerald-500">
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
    <HashRouter>
      <Routes>
        <Route path="/" element={<SuspendedRoute />}>
          {routes.map((props) => (
            <Route {...props} key={props.path} />
          ))}
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  </QueryClientProvider>
)

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

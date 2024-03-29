import { createElement as h } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { worker } from '../src/mocks/browser'

if (typeof window !== 'undefined') {
  worker.start()
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}


const queryClient = new QueryClient()

export const decorators = [
  (Story) => (
    h(QueryClientProvider, { client: queryClient }, h(Story))
  )
]

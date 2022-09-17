import * as testingLibrary from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import assert from 'node:assert'

export function querySelector<T extends Element>(
  container: HTMLElement,
  id: string,
): T {
  const element = container.querySelector<T>(id)
  assert(element !== null, `Unable to find an element with ID #${id}.`)
  return element
}

export * from '@testing-library/react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: false,
    },
  },
})

export const render = (
  ui: React.ReactElement,
  options?: testingLibrary.RenderOptions,
) => ({
  user: userEvent.setup(),
  ...testingLibrary.render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    options,
  ),
})

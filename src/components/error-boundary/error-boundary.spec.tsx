import { render, screen } from '@testing-library/react'

import { ErrorBoundary } from './error-boundary'

const ThrowError = () => {
  throw new Error('mock_error')
}

describe('<ErrorBoundary />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
  })

  it('should display the error message from the children components', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    )

    expect(screen.getByText('Something went wrong:')).toBeInTheDocument()
    expect(screen.getByText('mock_error')).toBeInTheDocument()
    expect(screen.getByText('Try again')).toBeInTheDocument()
  })
})

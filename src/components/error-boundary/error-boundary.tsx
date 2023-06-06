import { FC } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

import { Button } from '../button'

type ErrorBoundaryProps = {
  children: React.ReactNode
  showTryAgain?: boolean
  tryAgainText?: string
}

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({
  children,
  showTryAgain = true,
  tryAgainText,
}) => (
  <ReactErrorBoundary
    fallbackRender={({ error, resetErrorBoundary }) => (
      <div className="m-4 flex w-full justify-center">
        <div
          role="alert"
          className="mb-4 rounded-lg bg-red-100 py-5 px-6 text-base text-red-700"
        >
          <h2>Something went wrong:</h2>
          <pre className="mb-4 whitespace-pre-line">{error.message}</pre>
          {showTryAgain && (
            <Button onClick={() => resetErrorBoundary()} variant="danger">
              {tryAgainText || 'Try again'}
            </Button>
          )}
        </div>
      </div>
    )}
  >
    {children}
  </ReactErrorBoundary>
)

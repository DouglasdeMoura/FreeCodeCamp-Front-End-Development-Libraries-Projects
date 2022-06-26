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
      <div className="flex justify-center m-4 w-full h-full">
        <div
          role="alert"
          className="py-5 px-6 mb-4 text-base text-red-700 bg-red-100 rounded-lg"
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

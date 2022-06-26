import { FC, forwardRef } from 'react'

type ButtonProps = {
  children?: React.ReactNode
  variant?: 'primary' | 'secondary'
} & React.ComponentPropsWithRef<'button'>

const primary =
  'inline-block py-2.5 px-6 text-xs font-medium leading-tight text-white uppercase bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 rounded focus:outline-none focus:ring-0 shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out'

const secondary =
  'inline-block py-2 px-6 text-xs font-medium leading-tight text-blue-600 uppercase rounded border-2 border-blue-600 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'

export const Button: FC<ButtonProps> = forwardRef(
  ({ children, variant = 'primary', className, ...props }, ref) => {
    return (
      <button
        {...props}
        className={`${className} ${
          variant === 'primary' ? primary : secondary
        }`}
        ref={ref}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
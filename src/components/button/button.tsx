import { FC, forwardRef } from 'react'

import { Slot } from '@radix-ui/react-slot'

type ButtonProps = {
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  asChild?: boolean
} & React.ComponentPropsWithRef<'button'>

const primary =
  'inline-block py-2.5 px-6 text-xs font-medium leading-tight text-white uppercase bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 rounded focus:outline-none focus:ring-0 shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out'

const secondary =
  'inline-block py-2 px-6 text-xs font-medium leading-tight text-blue-600 uppercase rounded border-2 border-blue-600 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'

const danger =
  'inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out'

export const Button: FC<ButtonProps> = forwardRef(
  ({ children, variant = 'primary', className, asChild, ...props }, ref) => {
    const Component = asChild ? Slot : 'button'

    const getVariant = () => {
      if (variant === 'primary') return primary

      if (variant === 'secondary') return secondary

      if (variant === 'danger') return danger
    }

    return (
      <Component
        {...props}
        className={`${className} ${getVariant()}`}
        ref={ref}
      >
        {children}
      </Component>
    )
  },
)

Button.displayName = 'Button'

import { render, screen } from '@testing-library/react'

import { Button } from './button'

describe('<Button />', () => {
  it('should render a button element', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('should render a a element', () => {
    render(
      <Button asChild>
        <a href="#!">Click me</a>
      </Button>,
    )

    expect(screen.getByRole('link', { name: 'Click me' })).toBeInTheDocument()
  })
})

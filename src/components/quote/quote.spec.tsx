import { querySelector, render, screen } from '../../utils/test-utils'
import { Quote } from './quote'

const props = { text: 'mock_quote', author: 'mock_author' }

describe('Random Quote Machine', () => {
  test('I can see a wrapper element with a corresponding id="quote-box"', () => {
    const { container } = render(<Quote {...props} />)

    expect(querySelector(container, '#quote-box')).not.toBeNull()
  })

  test('Within #quote-box, I can see an element with corresponding id="text"', () => {
    const { container } = render(<Quote {...props} />)
    expect(querySelector(container, '#quote-box #text')).not.toBeNull()
  })

  test('Within #quote-box, I can see an element with corresponding id="author".', () => {
    const { container } = render(<Quote {...props} />)
    expect(querySelector(container, '#quote-box #author')).not.toBeNull()
  })

  test('Within #quote-box, I can see a clickable element with corresponding id="new-quote"', () => {
    const { container } = render(<Quote {...props} />)

    expect(querySelector(container, '#quote-box #new-quote')).not.toBeNull()

    const button = screen.getByRole('button', { name: 'New Quote' })

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('id', 'new-quote')
  })

  test('Within #quote-box, I can see a clickable a element with a corresponding id="tweet-quote"', () => {
    const { container } = render(<Quote {...props} />)

    expect(querySelector(container, '#quote-box #author')).not.toBeNull()

    const link = screen.getByRole('link', { name: 'Tweet this quote!' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('id', 'tweet-quote')
  })
})

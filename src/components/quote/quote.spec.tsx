import userEvent from '@testing-library/user-event'

import {
  querySelector,
  customRender,
  screen,
  waitFor,
} from '../../utils/test-utils'
import { Quote } from './quote'

const props = { text: 'mock_quote', author: 'mock_author' }

describe('Random Quote Machine', () => {
  afterEach(() => {
    process.env.NEW_QUOTE = ''
  })

  test('I can see a wrapper element with a corresponding id="quote-box"', () => {
    const { container } = customRender(<Quote />)

    expect(querySelector(container, '#quote-box')).not.toBeNull()
  })

  test('Within #quote-box, I can see an element with corresponding id="text"', () => {
    const { container } = customRender(<Quote />)
    expect(querySelector(container, '#quote-box #text')).not.toBeNull()
  })

  test('Within #quote-box, I can see an element with corresponding id="author".', () => {
    const { container } = customRender(<Quote />)
    expect(querySelector(container, '#quote-box #author')).not.toBeNull()
  })

  test('Within #quote-box, I can see a clickable element with corresponding id="new-quote"', () => {
    const { container } = customRender(<Quote />)

    expect(querySelector(container, '#quote-box #new-quote')).not.toBeNull()

    const button = screen.getByRole('button', { name: 'New Quote' })

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('id', 'new-quote')
  })

  test('Within #quote-box, I can see a clickable a element with a corresponding id="tweet-quote"', () => {
    const { container } = customRender(<Quote />)

    expect(querySelector(container, '#quote-box #author')).not.toBeNull()

    const link = screen.getByRole('link', { name: 'Tweet this quote!' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('id', 'tweet-quote')
  })

  test('On first load, my quote machine displays a random quote in the element with id="text"', () => {
    customRender(<Quote />)

    const quoteBox = screen.getByText(props.text)

    expect(quoteBox).toBeInTheDocument()
    expect(quoteBox).toHaveAttribute('id', 'text')
  })

  test('On first load, my quote machine displays the random quote\'s author in the element with id="author"', () => {
    customRender(<Quote />)

    const author = screen.getByText(props.author)

    expect(author).toBeInTheDocument()
    expect(author).toHaveAttribute('id', 'author')
  })

  test('When the #new-quote button is clicked, my quote machine should fetch a new quote and display it in the #text element', async () => {
    customRender(<Quote />)
    process.env.NEW_QUOTE = 'yes'
    userEvent.click(screen.getByText(/New Quote/))

    await waitFor(() => {
      expect(screen.getByText('new_mock_quote')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('new_mock_quote')).toHaveAttribute('id', 'text')
    })
  })

  test("My quote machine should fetch the new quote's author when the #new-quote button is clicked and display it in the #author element.", async () => {
    customRender(<Quote />)
    process.env.NEW_QUOTE = 'yes'
    userEvent.click(screen.getByText(/New Quote/))

    await waitFor(() => {
      expect(screen.getByText('new_mock_author')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('new_mock_author')).toHaveAttribute(
        'id',
        'author',
      )
    })
  })

  test('I can tweet the current quote by clicking on the #tweet-quote a element. This a element should include the "twitter.com/intent/tweet" path in its href attribute to tweet the current quote', () => {
    customRender(<Quote />)

    const text = screen.getByText('Tweet this quote!')
    // eslint-disable-next-line testing-library/no-node-access
    const tweetThis = text?.parentElement as HTMLAnchorElement

    expect(tweetThis).toHaveAttribute('id', 'tweet-quote')
    expect(tweetThis).toHaveAttribute('target', '_blank')
    expect(tweetThis).toHaveAttribute(
      'href',
      'https://twitter.com/intent/tweet?text=%22new_mock_quote%22+new_mock_author',
    )
  })
})

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MarkdownPreviewer } from './markdown-previewer'
import { parseMarkdown } from './markdown-previewer.utils'

describe('<MarkdownPreviewer />', () => {
  test('I can see a textarea element with a corresponding id="editor"', () => {
    render(<MarkdownPreviewer />)
    expect(screen.getByTestId('editor')).toHaveAttribute('id', 'editor')
  })

  test('I can see an element with a corresponding id="preview"', () => {
    render(<MarkdownPreviewer />)
    expect(screen.getByTestId('preview')).toHaveAttribute('id', 'preview')
  })

  test('When I enter text into the #editor element, the #preview element is updated as I type to display the content of the textarea', async () => {
    render(<MarkdownPreviewer />)
    const editor = screen.getByTestId('editor')

    userEvent.clear(editor)
    userEvent.type(editor, '# Hello')

    await waitFor(() => {
      screen.getByText('Hello')
    })

    const hello = screen.getByText('Hello')

    expect(hello).toHaveAttribute('id', 'hello')
  })
})

describe('parseMarkdown()', () => {
  it('should return the sanitized HTML', () => {
    expect(parseMarkdown('# Hello')).toBe('<h1 id="hello">Hello</h1>\n')
    expect(parseMarkdown("<img src='javascript:while(1){}'>")).toBe('<img>')
  })
})

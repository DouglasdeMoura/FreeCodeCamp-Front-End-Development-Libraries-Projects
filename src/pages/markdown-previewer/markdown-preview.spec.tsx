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
    expect(parseMarkdown(`$${String.raw`\frac{1}{2}`}$`)).toBe(
      // eslint-disable-next-line no-irregular-whitespace
      String.raw`<p><span class="katex-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>\frac{1}{2}</math></span><span aria-hidden="true" class="katex-html"><span class="base"><span style="height:1.1901em;vertical-align:-0.345em;" class="strut"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span style="height:0.8451em;" class="vlist"><span style="top:-2.655em;"><span style="height:3em;" class="pstrut"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span><span style="top:-3.23em;"><span style="height:3em;" class="pstrut"></span><span style="border-bottom-width:0.04em;" class="frac-line"></span></span><span style="top:-3.394em;"><span style="height:3em;" class="pstrut"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span style="height:0.345em;" class="vlist"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>` +
        '\n',
    )
  })
})

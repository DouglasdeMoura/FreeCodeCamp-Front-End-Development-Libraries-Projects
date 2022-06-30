import 'dracula-prism/dist/css/dracula-prism.css'
import './markdown-previewer.css'

import { FC, useEffect, useRef } from 'react'

import { DEFAULT_VALUE } from './markdown-previewer.constants'
import { parseMarkdown } from './markdown-previewer.utils'

export const MarkdownPreviewer: FC = () => {
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = parseMarkdown(DEFAULT_VALUE)
    }
  }, [previewRef])

  return (
    <div className="flex flex-col w-screen h-full bg-white sm:flex-row">
      <div className="overflow-hidden h-1/2 sm:w-1/2 sm:h-screen">
        <textarea
          id="editor"
          data-testid="editor"
          className="overflow-auto p-4 w-full h-full max-h-screen font-mono bg-slate-300 resize-none"
          placeholder="Write your markdown here"
          defaultValue={DEFAULT_VALUE}
          onChange={(e) => {
            if (previewRef.current) {
              previewRef.current.innerHTML = parseMarkdown(e.target.value)
            }
          }}
        ></textarea>
      </div>
      <div className="overflow-auto py-8 px-4 max-w-full h-1/2 bg-white sm:w-1/2 sm:h-screen">
        <div
          id="preview"
          data-testid="preview"
          className="m-auto prose prose-slate"
          ref={previewRef}
        />
      </div>
    </div>
  )
}

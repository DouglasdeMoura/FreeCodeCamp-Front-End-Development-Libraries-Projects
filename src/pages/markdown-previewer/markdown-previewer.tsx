import 'dracula-prism/dist/css/dracula-prism.css'
import './markdown-previewer.css'

import { FC, useEffect, useRef } from 'react'

import { DEFAULT_VALUE } from './markdown-previewer.constants'

import { marked } from 'marked'
import Prism from 'prismjs'

const parse = (content: string) =>
  marked(content, {
    breaks: true,
    highlight: function (code, lang) {
      return Prism.highlight(code, Prism.languages[lang], lang)
    },
  })

export const MarkdownPreviewer: FC = () => {
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = parse(DEFAULT_VALUE)
    }
  }, [previewRef])

  return (
    <div className="flex gap-4 w-screen bg-white">
      <div className="overflow-hidden w-1/2 h-screen">
        <textarea
          id="editor"
          data-testid="editor"
          className="overflow-auto p-4 w-full h-full max-h-screen font-mono bg-slate-300 resize-none"
          placeholder="Write your markdown here"
          defaultValue={DEFAULT_VALUE}
          onChange={(e) => {
            if (previewRef.current) {
              previewRef.current.innerHTML = parse(e.target.value)
            }
          }}
        ></textarea>
      </div>
      <div className="overflow-auto py-8 px-4 w-1/2 max-w-full h-screen max-h-screen bg-white">
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

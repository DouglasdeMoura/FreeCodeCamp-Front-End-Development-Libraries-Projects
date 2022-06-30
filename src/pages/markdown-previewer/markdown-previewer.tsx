import 'dracula-prism/dist/css/dracula-prism.css'
import 'katex/dist/katex.min.css'
import './markdown-previewer.css'

import { FC, useEffect, useRef } from 'react'
import useSyncScroll from 'react-use-sync-scroll'

import { DEFAULT_VALUE } from './markdown-previewer.constants'
import { parseMarkdown } from './markdown-previewer.utils'

export const MarkdownPreviewer: FC = () => {
  const previewContainerRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const two = useRef([previewContainerRef, editorRef])

  useSyncScroll(two, {
    vertical: true,
  })

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = parseMarkdown(DEFAULT_VALUE)
    }
  }, [previewRef])

  return (
    <div className="flex flex-col w-screen h-full bg-white sm:flex-row">
      <div className="overflow-hidden w-full h-1/2 resize-y sm:h-screen sm:resize-x">
        <textarea
          id="editor"
          data-testid="editor"
          className="overflow-auto p-4 w-full min-w-max h-full max-h-screen font-mono bg-slate-300 resize-none"
          placeholder="Write your markdown here"
          defaultValue={DEFAULT_VALUE}
          ref={editorRef}
          onChange={(e) => {
            if (previewRef.current) {
              previewRef.current.innerHTML = parseMarkdown(e.target.value)
            }
          }}
        ></textarea>
      </div>
      <div
        className="overflow-hidden py-8 px-4 w-full h-1/2 bg-white sm:h-screen"
        ref={previewContainerRef}
      >
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

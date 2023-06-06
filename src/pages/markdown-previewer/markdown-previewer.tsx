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

  const insertParsedMarkdown = (value: string) => {
    if (previewRef.current) {
      previewRef.current.innerHTML = parseMarkdown(value)
    }
  }

  useSyncScroll(useRef([previewContainerRef, editorRef]), {
    vertical: true,
  })

  useEffect(() => {
    insertParsedMarkdown(DEFAULT_VALUE)
  }, [previewRef])

  return (
    <div className="flex h-full w-screen flex-col bg-white sm:flex-row">
      <div className="h-1/2 w-full resize-y overflow-hidden sm:h-screen sm:resize-x">
        <textarea
          id="editor"
          data-testid="editor"
          className="h-full max-h-screen w-full min-w-max resize-none overflow-auto bg-slate-300 p-4 font-mono"
          placeholder="Write your markdown here"
          defaultValue={DEFAULT_VALUE}
          ref={editorRef}
          onChange={(e) => insertParsedMarkdown(e.currentTarget.value)}
          spellCheck={false}
        ></textarea>
      </div>
      <div
        className="h-1/2 w-full overflow-hidden bg-white py-8 px-4 sm:h-screen"
        ref={previewContainerRef}
      >
        <div
          id="preview"
          data-testid="preview"
          className="prose prose-slate m-auto prose-code:rounded prose-code:bg-slate-200 prose-code:py-0.5 prose-code:px-1 prose-code:before:content-none prose-code:after:content-none"
          ref={previewRef}
        />
      </div>
    </div>
  )
}

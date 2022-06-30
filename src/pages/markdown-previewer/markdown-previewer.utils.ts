import DOMPurify from 'dompurify'
import { marked } from 'marked'
import Prism from 'prismjs'

export const parseMarkdown = (content: string) =>
  DOMPurify.sanitize(
    marked(content, {
      breaks: true,
      highlight: function (code, lang) {
        return Prism.highlight(code, Prism.languages[lang], lang)
      },
    }),
  )

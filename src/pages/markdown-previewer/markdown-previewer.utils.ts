import DOMPurify from 'dompurify'
import katex, { KatexOptions } from 'katex'
import { marked } from 'marked'
import Prism from 'prismjs'

const renderKatex = (math: string, options?: KatexOptions) =>
  katex.renderToString(math, {
    throwOnError: false,
    ...options,
  })

marked.use({
  extensions: [
    {
      name: 'katex-block',
      level: 'block',
      start(src) {
        return src.match(/\$\$[^$]/)?.index ?? -1
      },
      tokenizer(src) {
        const match = /^\$\$([^$]+)\$\$/.exec(src)

        if (match) {
          return {
            type: 'katex-block',
            raw: match[0],
            formula: match[1],
          }
        }
      },
      renderer(token) {
        const formula = renderKatex(token.formula, { displayMode: true })
        return `<div class="katex-block">${formula}</div>`
      },
    },
    {
      name: 'katex',
      level: 'inline',
      start(src) {
        return src.match(/\$[^$]/)?.index ?? -1
      },
      tokenizer(src) {
        const match = /^\$([^$]+)\$/.exec(src)

        if (match) {
          return {
            type: 'katex',
            raw: match[0],
            formula: match[1],
          }
        }
      },
      renderer(token) {
        const formula = renderKatex(token.formula)
        return `<span class="katex-inline">${formula}</span>`
      },
    },
  ],
})

export const parseMarkdown = (content: string) =>
  DOMPurify.sanitize(
    marked(content, {
      breaks: true,
      xhtml: true,
      highlight: function (code, lang) {
        return Prism.highlight(code, Prism.languages[lang], lang)
      },
    }),
  )

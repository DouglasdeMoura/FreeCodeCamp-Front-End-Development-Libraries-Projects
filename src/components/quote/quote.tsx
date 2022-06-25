import '../../styles/global.css'
import { FC } from 'react'

import { useQuote } from './quote.hooks'

const tweetURL = (text: string, author: string) => {
  const url = new URL('https://twitter.com/intent/tweet')
  url.searchParams.set('text', `"${text}" ${author}`)

  return url.toString()
}

export const Quote: FC = () => {
  const { data, refetch } = useQuote()

  return (
    <div id="quote-box">
      <figure>
        <blockquote id="text">{data?.text}</blockquote>
        <figcaption id="author">{data?.author}</figcaption>
      </figure>
      <button id="new-quote" onClick={() => refetch()}>
        New Quote
      </button>
      <a
        href={tweetURL(data?.text || '', data?.author || '')}
        id="tweet-quote"
        target="_blank"
        rel="noreferrer"
      >
        Tweet this quote!
      </a>
    </div>
  )
}

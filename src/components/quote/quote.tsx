import '../../styles/global.css'
import { FC } from 'react'

type QuoteProps = {
  quote: string
  author: string
}

export const Quote: FC<QuoteProps> = ({ author, quote }) => {
  return (
    <div id="quote-box">
      <figure>
        <blockquote id="text">{author}</blockquote>
        <figcaption id="author">{quote}</figcaption>
      </figure>
      <button id="new-quote">New Quote</button>
      <a href="#!" id="tweet-quote">
        Tweet this quote!
      </a>
    </div>
  )
}

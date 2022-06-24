import '../../styles/global.css'
import { FC } from 'react'

type QuoteProps = {
  author: string
  text: string
}

export const Quote: FC<QuoteProps> = ({ author, text }) => {
  return (
    <div id="quote-box">
      <figure>
        <blockquote id="text">{text}</blockquote>
        <figcaption id="author">{author}</figcaption>
      </figure>
      <button id="new-quote">New Quote</button>
      <a href="#!" id="tweet-quote">
        Tweet this quote!
      </a>
    </div>
  )
}

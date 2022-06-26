import '../../styles/global.css'
import { FC } from 'react'
import ContentLoader from 'react-content-loader'
import { FaTwitter } from 'react-icons/fa'

import { Button } from '../../components/button'
import { useQuote } from './random-quote-machine.hooks'

const tweetURL = (text: string, author: string) => {
  const url = new URL('https://twitter.com/intent/tweet')
  url.searchParams.set('text', `"${text}" ${author}`)

  return url.toString()
}

export const RandomQuoteMachine: FC = () => {
  const { data, refetch } = useQuote()

  return (
    <>
      <div
        id="quote-box"
        className="flex flex-col gap-4 p-6 max-w-md bg-slate-200 rounded-lg"
      >
        <figure className="flex flex-col gap-2">
          <blockquote id="text" className="flex gap-4 justify-between text-xl">
            {data?.text ? (
              data?.text
            ) : (
              <ContentLoader viewBox={`0 0 380 60`}>
                <rect x="0" y="0" rx="4" ry="4" width="300" height="25" />
                <rect x="0" y="36" rx="4" ry="4" width="280" height="25" />
              </ContentLoader>
            )}
          </blockquote>
          <figcaption
            id="author"
            className="flex gap-4 justify-between font-bold"
          >
            {data?.author ? (
              data?.author
            ) : (
              <ContentLoader viewBox={`0 0 380 32`}>
                <rect x="0" y="16" rx="4" ry="4" width="300" height="16" />
              </ContentLoader>
            )}
          </figcaption>
        </figure>
        <div className="flex gap-4 justify-between align-middle">
          <Button variant="secondary" asChild>
            <a
              href={tweetURL(data?.text || '', data?.author || '')}
              id="tweet-quote"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter size={16} />
              <span className="sr-only">Tweet this quote!</span>
            </a>
          </Button>
          <Button id="new-quote" onClick={() => refetch()} type="button">
            New Quote
          </Button>
        </div>
      </div>
    </>
  )
}

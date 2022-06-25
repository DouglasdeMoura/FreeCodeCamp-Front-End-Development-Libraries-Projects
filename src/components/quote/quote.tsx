import '../../styles/global.css'
import { FC } from 'react'
import { FaTwitter, FaCircleNotch } from 'react-icons/fa'

import { useQuote } from './quote.hooks'

const tweetURL = (text: string, author: string) => {
  const url = new URL('https://twitter.com/intent/tweet')
  url.searchParams.set('text', `"${text}" ${author}`)

  return url.toString()
}

export const Quote: FC = () => {
  const { data, isLoading, refetch } = useQuote()

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-emerald-500">
      <div
        id="quote-box"
        className="flex flex-col gap-4 p-6 max-w-md bg-slate-200 rounded-lg"
      >
        <figure className="flex flex-col gap-2">
          <blockquote id="text" className="text-xl">
            {isLoading && <FaCircleNotch />} {data?.text}
          </blockquote>
          <figcaption id="author" className="font-bold">
            {isLoading && <FaCircleNotch />}
            {data?.author}
          </figcaption>
        </figure>
        <div className="flex gap-4 justify-between align-middle">
          <a
            href={tweetURL(data?.text || '', data?.author || '')}
            id="tweet-quote"
            target="_blank"
            rel="noreferrer"
            className="inline-block py-2 px-6 text-xs font-medium leading-tight text-blue-600 uppercase rounded border-2 border-blue-600 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            <FaTwitter size={16} />
            <span className="sr-only">Tweet this quote!</span>
          </a>
          <button
            id="new-quote"
            onClick={() => refetch()}
            className="inline-block py-2.5 px-6 text-xs font-medium leading-tight text-white uppercase bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 rounded focus:outline-none focus:ring-0 shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out"
            type="button"
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  )
}

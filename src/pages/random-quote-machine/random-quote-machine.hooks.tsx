import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { api } from '../../api/client'

type Quote = {
  author: string
  text: string
}

function getRandomItem<T = unknown>(arr: T[]) {
  const id = Math.floor(Math.random() * arr.length)

  return arr[id]
}

const getQuotes = () => api.get<Quote[]>('/quotes').then((res) => res.data)

const useQuotes = () =>
  useQuery('quotes', getQuotes, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })

export const useQuote = () => {
  const [randomQuote, setRandomQuote] = useState<Quote>()
  const { data } = useQuotes()

  const getNewRandomQuote = () => {
    if (data) {
      const quote = getRandomItem(data)

      if (randomQuote?.text === quote?.text) {
        getNewRandomQuote()
      } else {
        setRandomQuote(quote)
      }
    }
  }

  useEffect(() => {
    if (data) {
      setRandomQuote(getRandomItem(data))
    }
  }, [data])

  return {
    quote: data && randomQuote,
    getNewRandomQuote,
  }
}

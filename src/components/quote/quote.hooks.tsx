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

const useQuotes = () => useQuery('quotes', getQuotes)

export const useQuote = () => {
  const { data, ...args } = useQuotes()

  return {
    ...args,
    data: data && getRandomItem(data),
  }
}

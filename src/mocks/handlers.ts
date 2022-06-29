import { rest } from 'msw'

export const testQuotesHandler = rest.get('/quotes', (_req, res, ctx) => {
  const response = [
    { text: 'new_mock_quote', author: 'new_mock_author' },
    { text: 'mock_quote', author: 'mock_author' },
  ]

  return res(ctx.status(200), ctx.json(response))
})

export const handlers = [
  rest.get('/quotes', (_req, res, ctx) => {
    if (process.env.NODE_ENV === 'test') {
      const response = process.env.NEW_QUOTE
        ? [{ text: 'new_mock_quote', author: 'new_mock_author' }]
        : [{ text: 'mock_quote', author: 'mock_author' }]

      return res(ctx.status(200), ctx.json(response))
    }

    return res(
      ctx.status(200),
      ctx.json([
        {
          text: 'Life isn’t about getting and having, it’s about giving and being.',
          author: 'Kevin Kruse',
        },
        {
          text: 'Whatever the mind of man can conceive and believe, it can achieve.',
          author: 'Napoleon Hill',
        },
        {
          text: 'Strive not to be a success, but rather to be of value.',
          author: 'Albert Einstein',
        },
        {
          text: 'Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.',
          author: 'Robert Frost',
        },
      ]),
    )
  }),
]

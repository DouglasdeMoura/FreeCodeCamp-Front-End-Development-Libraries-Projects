import { rest } from 'msw'

export const handlers = [
  rest.get('/api/quotes', (req, res, ctx) => {
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

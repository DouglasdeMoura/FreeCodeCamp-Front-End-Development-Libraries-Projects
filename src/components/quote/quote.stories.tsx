import { ComponentStory, ComponentMeta } from '@storybook/react'

import { worker } from '../../mocks/browser'
import { Quote } from './quote'

import { rest } from 'msw'

export default {
  title: 'Quote',
  component: Quote,
} as ComponentMeta<typeof Quote>

const Template: ComponentStory<typeof Quote> = (args) => <Quote {...args} />

export const Default = Template.bind({})

export const Loading = Template.bind({})
Loading.decorators = [
  (Story) => {
    worker.use(
      rest.get('/quotes', (_req, res, ctx) => {
        return res(ctx.delay('infinite'))
      }),
    )
    return <Story />
  },
]

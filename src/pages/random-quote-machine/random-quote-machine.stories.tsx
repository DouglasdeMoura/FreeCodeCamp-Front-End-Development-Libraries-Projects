import { ComponentStory, ComponentMeta } from '@storybook/react'

import { worker } from '../../mocks/browser'
import { RandomQuoteMachine } from './random-quote-machine'

import { rest } from 'msw'

export default {
  title: 'RandomQuoteMachine',
  component: RandomQuoteMachine,
} as ComponentMeta<typeof RandomQuoteMachine>

const Template: ComponentStory<typeof RandomQuoteMachine> = (args) => (
  <RandomQuoteMachine {...args} />
)

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

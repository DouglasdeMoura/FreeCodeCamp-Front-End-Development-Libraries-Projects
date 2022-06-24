import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Quote } from './quote'

export default {
  title: 'Quote',
  component: Quote,
} as ComponentMeta<typeof Quote>

const Template: ComponentStory<typeof Quote> = (args) => <Quote {...args} />

export const Default = Template.bind({})

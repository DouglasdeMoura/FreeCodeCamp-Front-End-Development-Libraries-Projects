import { ComponentMeta, ComponentStory } from '@storybook/react'

import TwentyFivePlusFiveClock from '.'

export default {
  title: 'TwentyFivePlusFiveClock',
  component: TwentyFivePlusFiveClock,
} as ComponentMeta<typeof TwentyFivePlusFiveClock>

const Template: ComponentStory<typeof TwentyFivePlusFiveClock> = (args) => (
  <TwentyFivePlusFiveClock {...args} />
)

export const Default = Template.bind({})

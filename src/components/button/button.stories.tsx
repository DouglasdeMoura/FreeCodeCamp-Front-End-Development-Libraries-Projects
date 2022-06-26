import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from './button'

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Button',
  variant: 'secondary',
}

export const Danger = Template.bind({})
Danger.args = {
  children: 'Button',
  variant: 'danger',
}

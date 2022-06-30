import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DrumMachine } from './drum-machine'

export default {
  title: 'DrumMachine',
  component: DrumMachine,
} as ComponentMeta<typeof DrumMachine>

const Template: ComponentStory<typeof DrumMachine> = (args) => (
  <DrumMachine {...args} />
)

export const Default = Template.bind({})

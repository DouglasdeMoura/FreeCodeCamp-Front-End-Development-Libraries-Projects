import { ComponentStory, ComponentMeta } from '@storybook/react'

import { MarkdownPreviewer } from './markdown-previewer'

export default {
  title: 'MarkdownPreviewer',
  component: MarkdownPreviewer,
} as ComponentMeta<typeof MarkdownPreviewer>

const Template: ComponentStory<typeof MarkdownPreviewer> = (args) => (
  <MarkdownPreviewer {...args} />
)

export const Default = Template.bind({})

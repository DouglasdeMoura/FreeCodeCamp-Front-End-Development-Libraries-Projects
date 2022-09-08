import{B as t}from"./button.052ec439.js";import{j as e}from"./jsx-runtime.17a86957.js";import"./iframe.16aac829.js";const d={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from '@storybook/react'

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
`,locationsMap:{primary:{startLoc:{col:48,line:10},endLoc:{col:78,line:10},startBody:{col:48,line:10},endBody:{col:78,line:10}},secondary:{startLoc:{col:48,line:10},endLoc:{col:78,line:10},startBody:{col:48,line:10},endBody:{col:78,line:10}},danger:{startLoc:{col:48,line:10},endLoc:{col:78,line:10},startBody:{col:48,line:10},endBody:{col:78,line:10}}}}},title:"Button",component:t},n=o=>e(t,{...o}),r=n.bind({});r.args={children:"Button"};const a=n.bind({});a.args={children:"Button",variant:"secondary"};const c=n.bind({});c.args={children:"Button",variant:"danger"};const m=["Primary","Secondary","Danger"];export{c as Danger,r as Primary,a as Secondary,m as __namedExportsOrder,d as default};
//# sourceMappingURL=button.stories.bbf2db78.js.map

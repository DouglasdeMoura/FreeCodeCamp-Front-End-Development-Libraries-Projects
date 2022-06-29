var l=Object.defineProperty;var e=Object.getOwnPropertySymbols;var s=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable;var a=(o,n,t)=>n in o?l(o,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[n]=t,c=(o,n)=>{for(var t in n||(n={}))s.call(n,t)&&a(o,t,n[t]);if(e)for(var t of e(n))d.call(n,t)&&a(o,t,n[t]);return o};import{B as i}from"./button.ee00c940.js";import{j as m}from"./jsx-runtime.4d6739be.js";import"./index.f03c8040.js";var x={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from '@storybook/react'

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
`,locationsMap:{primary:{startLoc:{col:48,line:10},endLoc:{col:78,line:10},startBody:{col:48,line:10},endBody:{col:78,line:10}},secondary:{startLoc:{col:48,line:10},endLoc:{col:78,line:10},startBody:{col:48,line:10},endBody:{col:78,line:10}},danger:{startLoc:{col:48,line:10},endLoc:{col:78,line:10},startBody:{col:48,line:10},endBody:{col:78,line:10}}}}},title:"Button",component:i};const r=o=>m(i,c({},o)),p=r.bind({});p.args={children:"Button"};const y=r.bind({});y.args={children:"Button",variant:"secondary"};const B=r.bind({});B.args={children:"Button",variant:"danger"};const S=["Primary","Secondary","Danger"];export{B as Danger,p as Primary,y as Secondary,S as __namedExportsOrder,x as default};
//# sourceMappingURL=button.stories.81dc3b9d.js.map

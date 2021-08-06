import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CalendarProps, MyCalendar } from './MyCalendar';
import { DisplayMode } from './utils';

export default {
  title: 'C&C/MyCalendar',
  component: MyCalendar,
} as ComponentMeta<typeof MyCalendar>;

const Template: ComponentStory<typeof MyCalendar> = (args: CalendarProps) => (
  <MyCalendar displayedDate={args.displayedDate} displayMode={args.displayMode} />
);

export const Primary = Template.bind({});
Primary.args = {
  displayedDate: new Date(),
  displayMode: DisplayMode.Week,
};

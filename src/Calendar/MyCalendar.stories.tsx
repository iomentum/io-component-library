import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as m from 'moment';
import { extendMoment } from 'moment-range';
import { CalendarProps, MyCalendar } from './MyCalendar';
import { DisplayMode, EventDateRange } from './utils';

const moment = extendMoment(m);

export default {
  title: 'C&C/MyCalendar',
  component: MyCalendar,
} as ComponentMeta<typeof MyCalendar>;

const Template: ComponentStory<typeof MyCalendar> = (args: CalendarProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MyCalendar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  displayedDate: new Date(),
  displayMode: DisplayMode.Week,
};

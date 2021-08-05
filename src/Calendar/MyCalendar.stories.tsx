import React from 'react';
import { MyCalendar, MyCalendarProps } from './MyCalendar';
import { DisplayMode, WeekStartsOn } from './types';
import { displayedDate, events, onCreate, onUpdate, onDelete } from './externalData';

export default {
  title: 'MyCalendar',
  component: MyCalendar,
};

const Template = (myCalendarProps: MyCalendarProps) => (
  <MyCalendar
    displayedDate={myCalendarProps.displayedDate}
    events={myCalendarProps.events}
    onCreate={myCalendarProps.onCreate}
    onDelete={myCalendarProps.onDelete}
    onUpdate={myCalendarProps.onUpdate}
    options={myCalendarProps.options}
  />
);

export const Primary = Template.bind({});

Primary.args = {
  displayedDate,
  events,
  onCreate,
  onUpdate,
  onDelete,
  options: {
    displayMode: DisplayMode.Week,
    displayedHours: [0, 24],
    timeFormat: 'HH:mm',
    locale: 'fr',
    weekStartsOn: WeekStartsOn.Monday,
  },
};

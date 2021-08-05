import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyCalendar, MyCalendarProps } from './MyCalendar';
import { DisplayMode, WeekStartsOn } from './utils';
import { MyCalendarEvent } from './utils/eventUtils';

export default {
  title: 'C&C/MyCalendar',
  component: MyCalendar,
} as ComponentMeta<typeof MyCalendar>;

const Template: ComponentStory<typeof MyCalendar> = (args: MyCalendarProps) => (
  <MyCalendar
    displayedDate={args.displayedDate}
    events={args.events}
    onCreate={args.onCreate}
    onDelete={args.onDelete}
    onUpdate={args.onUpdate}
    options={args.options}
  />
);

const date = new Date();

const myCalendarEvents: MyCalendarEvent[] = [
  {
    uuid: 'awdaw1-1231',
    title: 'test 1',
    startDate: new Date('2021-08-05T11:00:00'),
    endDate: new Date('2021-08-05T12:00:00'),
    metadata: {},
  },
  {
    uuid: 'awdaw1-1232',
    title: 'test 2',
    startDate: new Date('2021-08-05T14:00:00'),
    endDate: new Date('2021-08-05T16:00:00'),
    metadata: {},
  },
  {
    uuid: 'awdaw1-1233',
    title: 'test 3',
    startDate: new Date('2021-08-05T18:00:00'),
    endDate: new Date('2021-08-05T19:00:00'),
    metadata: {},
  },
];

export const Primary = Template.bind({});
Primary.args = {
  displayedDate: date,
  events: myCalendarEvents,
  onCreate: (event: Event) => myCalendarEvents,
  onUpdate: (event: Event) => myCalendarEvents,
  onDelete: (event: Event) => myCalendarEvents,
  options: {
    displayMode: DisplayMode.Week,
    displayedHours: [0, 24],
    timeFormat: 'HH:mm',
    locale: 'fr',
    weekStartsOn: WeekStartsOn.Monday,
  },
};

import { MyCalendarEvent } from '../types';

export const MockMyCalendarEvents: MyCalendarEvent[] = [
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

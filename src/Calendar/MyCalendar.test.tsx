/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { MyCalendar } from './MyCalendar';
import { DisplayMode, Event } from './utils';

const createEvent = (eventStart: Date): Event => {
  const eventEnd = new Date(eventStart);
  eventEnd.setHours(eventEnd.getHours() + 1);

  return {
    content: '',
    dateRange: {
      eventStart,
      eventEnd,
    },
  };
};

const formatDateAndHour = (dateToFormat: Date): [string, string] => {
  const timeZoneOffset = dateToFormat.getTimezoneOffset() * 60000;
  const [date, hour] = new Date(dateToFormat.getTime() - timeZoneOffset).toISOString().split('T');
  return [date, hour.slice(0, 5)];
};

jest.mock('./utils', () => ({
  computeIsFullDayEvent: jest.fn(),
  createExtendedMomentFromDate: () => new Date('2021-08-03'),
  DisplayMode: 'week',
  createEvent: () => createEvent(new Date('2021-08-03')),
  formatDateAndHour: () => formatDateAndHour(new Date('2021-08-03')),
}));

jest.mock('./utils/eventUtils', () => ({ isEventExisting: jest.fn() }));

describe('MyCalendar component', () => {
  describe('@snapshots', () => {
    it('should match with previous MyCalendar Month', () => {
      const newDate: Date = new Date('2021-08-03');
      const { asFragment } = render(
        <MyCalendar displayMode={DisplayMode.Month} displayedDate={newDate} />
      );

      expect(asFragment()).toMatchSnapshot('MyCalendar snapshot Month');
    });

    it('should match with previous MyCalendar Week', () => {
      const newDate: Date = new Date('2021-08-03');
      const { asFragment } = render(
        <MyCalendar displayMode={DisplayMode.Week} displayedDate={newDate} />
      );

      expect(asFragment()).toMatchSnapshot('MyCalendar snapshot Week');
    });

    it('should match with previous MyCalendar Day', () => {
      const newDate: Date = new Date('2021-08-03');
      const { asFragment } = render(
        <MyCalendar displayMode={DisplayMode.Day} displayedDate={newDate} />
      );

      expect(asFragment()).toMatchSnapshot('MyCalendar snapshot Day');
    });
  });
});

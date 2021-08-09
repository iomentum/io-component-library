/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { MyCalendar } from './MyCalendar';
import { MockMyCalendarEvents } from './utils/testUtils';
import { DisplayMode, WeekStartsOn, MyCalendarEvent } from './types';

const createDefaultMyCalendarEvent = (startDate: Date): MyCalendarEvent => {
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 1);

  return {
    uuid: `awdawd`,
    title: '',
    startDate,
    endDate,
    metadata: {},
  };
};

jest.mock('./utils/momentUtils', () => ({
  createExtendedMomentFromDate: () => new Date('2021-08-03'),
}));

jest.mock('./utils/eventUtils', () => {
  const Dayz = jest.requireActual('dayz');
  return {
    createDefaultMyCalendarEvent: () => createDefaultMyCalendarEvent(new Date('2021-08-03')),
    convertMyCalendarEventsIntoDayzEventsCollection: () => new Dayz.EventsCollection([]),
    getMyCalendarEventIndex: jest.fn(),
  };
});

describe('MyCalendar component', () => {
  describe('@snapshots', () => {
    it('should match with previous MyCalendar Month', () => {
      const { asFragment } = render(
        <MyCalendar
          events={MockMyCalendarEvents}
          displayedDate={new Date('2021-08-03')}
          onCreate={jest.fn()}
          onUpdate={jest.fn()}
          onDelete={jest.fn()}
          options={{
            displayMode: DisplayMode.Month,
            displayedHours: [0, 24],
            timeFormat: 'HH:mm',
            locale: 'fr',
            weekStartsOn: WeekStartsOn.Monday,
          }}
        />
      );

      expect(asFragment()).toMatchSnapshot('MyCalendar snapshot Month');
    });

    it('should match with previous MyCalendar Week', () => {
      const { asFragment } = render(
        <MyCalendar
          events={MockMyCalendarEvents}
          displayedDate={new Date('2021-08-03')}
          onCreate={jest.fn()}
          onUpdate={jest.fn()}
          onDelete={jest.fn()}
          options={{
            displayMode: DisplayMode.Week,
            displayedHours: [0, 24],
            timeFormat: 'HH:mm',
            locale: 'fr',
            weekStartsOn: WeekStartsOn.Monday,
          }}
        />
      );

      expect(asFragment()).toMatchSnapshot('MyCalendar snapshot Week');
    });

    it('should match with previous MyCalendar Day', () => {
      const { asFragment } = render(
        <MyCalendar
          events={MockMyCalendarEvents}
          displayedDate={new Date('2021-08-03')}
          onCreate={jest.fn()}
          onUpdate={jest.fn()}
          onDelete={jest.fn()}
          options={{
            displayMode: DisplayMode.Day,
            displayedHours: [0, 24],
            timeFormat: 'HH:mm',
            locale: 'fr',
            weekStartsOn: WeekStartsOn.Monday,
          }}
        />
      );

      expect(asFragment()).toMatchSnapshot('MyCalendar snapshot Day');
    });
  });
});

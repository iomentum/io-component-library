/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { MyCalendar } from './MyCalendar';
import { MockEvents } from './utils/testUtils';
import { DisplayMode, WeekStartsOn } from './types';

jest.mock('./utils/momentUtils', () => ({
  createExtendedMomentFromDate: () => new Date('2021-08-03'),
}));

jest.mock('./utils/eventUtils', () => {
  const Dayz = jest.requireActual('dayz');
  const { createDefaultEvent } = jest.requireActual('./__mocks__/eventUtils.mock');

  return {
    createDefaultEvent: () => createDefaultEvent(new Date('2021-08-03')),
    convertEventsIntoDayzEventsCollection: () => new Dayz.EventsCollection([]),
    getEventIndex: jest.fn(),
  };
});

const myCalendarMock = (displayMode: DisplayMode) =>
  render(
    <MyCalendar
      events={MockEvents}
      displayedDate={new Date('2021-08-03')}
      onCreate={() => []}
      onUpdate={() => []}
      onDelete={() => []}
      options={{
        displayMode,
        displayedHours: [0, 24],
        timeFormat: 'HH:mm',
        locale: 'fr',
        weekStartsOn: WeekStartsOn.Monday,
      }}
    />
  );

describe('MyCalendar component', () => {
  describe('@snapshots', () => {
    it('should match with previous MyCalendar Month', () =>
      expect(myCalendarMock(DisplayMode.Month).asFragment()).toMatchSnapshot(
        'MyCalendar snapshot Month'
      ));

    it('should match with previous MyCalendar Week', () =>
      expect(myCalendarMock(DisplayMode.Week).asFragment()).toMatchSnapshot(
        'MyCalendar snapshot Week'
      ));

    it('should match with previous MyCalendar Day', () =>
      expect(myCalendarMock(DisplayMode.Day).asFragment()).toMatchSnapshot(
        'MyCalendar snapshot Day'
      ));
  });
});

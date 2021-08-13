/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { CalendarContext } from '../contexts/CalendarContext';
import { EventContext, EventContextInterface } from '../contexts/EventContext';
import { DisplayMode, MyCalendarEvent } from '../types';
import { DayzWrapper } from './DayzWrapper';
import { MockMyCalendarEvents } from '../utils/testUtils';

jest.mock('../utils/momentUtils', () => ({
  createExtendedMomentFromDate: () => new Date('2021-08-03'),
  createDateFromMoment: jest.fn(),
}));

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

jest.mock('../utils/eventUtils', () => {
  const Dayz = jest.requireActual('dayz');
  return {
    convertMyCalendarEventIntoDayzEvent: jest.fn(),
    createDefaultMyCalendarEvent: () => createDefaultMyCalendarEvent(new Date('2021-08-03')),
    convertMyCalendarEventsIntoDayzEventsCollection: () => new Dayz.EventsCollection([]),
  };
});

const eventProviderValue: Partial<EventContextInterface> = {
  eventsCollection: MockMyCalendarEvents,
  setCurrentEvent: jest.fn(),
  setEventManagementOpened: jest.fn(),
};

const calendarContextMock = (component, calendarProviderValue) =>
  render(
    <CalendarContext.Provider value={calendarProviderValue}>
      <EventContext.Provider value={eventProviderValue as EventContextInterface}>
        {component}
      </EventContext.Provider>
    </CalendarContext.Provider>
  );

const calendarProviderValue = (displayMode: DisplayMode) => ({
  displayedDate: new Date('2021-08-03'),
  displayMode,
});

describe('DayzWrapper component', () => {
  describe('@snapshots', () => {
    it('should match with previous DayzWrapper displayMode Month', () => {
      const { asFragment } = calendarContextMock(
        <DayzWrapper />,
        calendarProviderValue(DisplayMode.Month)
      );
      expect(asFragment()).toMatchSnapshot('DayzWrapper snapshot displayMode Month');
    });

    it('should match with previous DayzWrapper displayMode Week', () => {
      const { asFragment } = calendarContextMock(
        <DayzWrapper />,
        calendarProviderValue(DisplayMode.Week)
      );
      expect(asFragment()).toMatchSnapshot('DayzWrapper snapshot displayMode Week');
    });

    it('should match with previous DayzWrapper displayMode Day', () => {
      const { asFragment } = calendarContextMock(
        <DayzWrapper />,
        calendarProviderValue(DisplayMode.Day)
      );
      expect(asFragment()).toMatchSnapshot('DayzWrapper snapshot displayMode Day');
    });
  });

  describe('@events', () => {
    it('should trigger handleDayEventClick', () => {
      calendarContextMock(
        <DayzWrapper data-testid="dayz" />,
        calendarProviderValue(DisplayMode.Week)
      );

      screen.getAllByText(3)[0].click();

      expect(eventProviderValue.setCurrentEvent).toBeCalledTimes(1);
      expect(eventProviderValue.setEventManagementOpened).toBeCalledWith(true);
    });
  });
});

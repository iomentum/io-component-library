/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { CalendarContext } from '../contexts/CalendarContext';
import { EventContext, EventContextInterface } from '../contexts/EventContext';
import { DisplayMode } from '../types';
import { EventType } from '../reducers/EventReducer';
import { DayzWrapper } from './DayzWrapper';
import { MockEvents } from '../utils/testUtils';
import { createDefaultEvent } from '../__mocks__/eventUtils.mock';

jest.mock('../utils/momentUtils', () => ({
  createExtendedMomentFromDate: () => new Date('2021-08-03'),
  createDateFromMoment: jest.fn(),
}));

jest.mock('../utils/eventUtils', () => {
  const Dayz = jest.requireActual('dayz');
  const eventUtilsMock = jest.requireActual('../__mocks__/eventUtils.mock');

  return {
    convertEventIntoDayzEvent: jest.fn(),
    createDefaultEvent: () => eventUtilsMock.createDefaultEvent(new Date('2021-08-03')),
    convertEventsIntoDayzEventsCollection: () => new Dayz.EventsCollection([]),
  };
});

const eventProviderValue: Partial<EventContextInterface> = {
  eventsCollection: MockEvents,
  dispatchEvent: jest.fn(),
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
      const startDate = new Date('2021-08-03');
      const event = createDefaultEvent(startDate);
      delete event.displayStartDate;
      delete event.displayEndDate;

      calendarContextMock(
        <DayzWrapper data-testid="dayz" />,
        calendarProviderValue(DisplayMode.Week)
      );

      screen.getAllByText(3)[0].click();

      expect(eventProviderValue.dispatchEvent).toBeCalledWith({
        type: EventType.UpdateEvent,
        ...event,
      });
      expect(eventProviderValue.setEventManagementOpened).toBeCalledWith(true);
    });
  });
});

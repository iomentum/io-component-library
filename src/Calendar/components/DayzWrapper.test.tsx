/**
 * @jest-environment jsdom
 */

import React from 'react';
import Dayz from 'dayz';
import { render, screen } from '@testing-library/react';
import { CalendarContext } from '../contexts/CalendarContext';
import { EventContext } from '../contexts/EventContext';
import { DisplayMode } from '../utils';
import { DayzWrapper } from './DayzWrapper';

jest.mock('../utils', () => ({
  createExtendedMomentFromDate: () => new Date('2021-08-03T14:36:39.811Z'),
  DisplayMode: 'week',
  createEvent: jest.fn(),
}));

const calendarContextMock = (component, calendarProviderValue, eventProviderValue) =>
  render(
    <CalendarContext.Provider value={calendarProviderValue}>
      <EventContext.Provider value={eventProviderValue}>{component}</EventContext.Provider>
    </CalendarContext.Provider>
  );

describe('DayzWrapper component', () => {
  describe('@snapshots', () => {
    it('should match with previous DayzWrapper', () => {
      const newDate = new Date('2021-08-03');

      const calendarProviderValue = { displayedDate: newDate, displayMode: DisplayMode.Week };
      const eventProviderValue = {
        eventsCollection: new Dayz.EventsCollection([]),
        setCurrentEvent: jest.fn(),
        setEventManagementOpened: jest.fn(),
      };

      const { asFragment } = calendarContextMock(
        <DayzWrapper />,
        calendarProviderValue,
        eventProviderValue
      );
      expect(asFragment()).toMatchSnapshot('DayzWrapper snapshot');
    });
  });

  describe('@events', () => {
    it('should trigger handleDayEventClick', () => {
      const newDate = new Date('2021-08-03');

      const calendarProviderValue = { displayedDate: newDate, displayMode: DisplayMode.Week };
      const eventProviderValue = {
        eventsCollection: new Dayz.EventsCollection([]),
        setCurrentEvent: jest.fn(),
        setEventManagementOpened: jest.fn(),
      };

      calendarContextMock(
        <DayzWrapper data-testid="dayz" />,
        calendarProviderValue,
        eventProviderValue
      );

      screen.getAllByText(3)[0].click();

      expect(eventProviderValue.setCurrentEvent).toBeCalledTimes(1);
      expect(eventProviderValue.setEventManagementOpened).toBeCalledWith(true);
    });
  });
});

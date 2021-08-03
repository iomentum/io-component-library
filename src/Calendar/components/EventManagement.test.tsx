/**
 * @jest-environment jsdom
 */

import React from 'react';
import Dayz from 'dayz';
import { render, screen } from '@testing-library/react';
import { EventContext } from '../contexts/EventContext';
import { EventManagement } from './EventManagement';
import { Event } from '../utils';

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

jest.mock('../utils', () => ({
  computeIsFullDayEvent: jest.fn(),
  createExtendedMomentFromDate: () => new Date('2021-08-03T14:36:39.811Z'),
  DisplayMode: 'week',
  createEvent: () => createEvent(new Date('2021-08-03')),
  formatDateAndHour: () => formatDateAndHour(new Date('2021-08-03')),
  convertEventIntoDayzEvent: () => ({ content: '', range: () => jest.fn() }),
}));

const eventContextMock = (component, providerValue) =>
  render(<EventContext.Provider value={providerValue}>{component}</EventContext.Provider>);

describe('EventManagement component', () => {
  describe('@snapshots', () => {
    it('should match with previous EventManagement modal closed', () => {
      const eventProviderValue = {
        currentEvent: createEvent(new Date('2021-08-03')),
        eventsCollection: new Dayz.EventsCollection([]),
        setEventsCollection: jest.fn(),
        eventManagementOpened: false,
        setEventManagementOpened: jest.fn(),
      };
      const { baseElement } = eventContextMock(<EventManagement />, eventProviderValue);

      expect(baseElement).toMatchSnapshot('EventManagement snapshot modal closed');
    });

    it('should match with previous EventManagement modal opened', () => {
      const eventProviderValue = {
        currentEvent: createEvent(new Date('2021-08-03')),
        eventsCollection: new Dayz.EventsCollection([]),
        setEventsCollection: jest.fn(),
        eventManagementOpened: true,
        setEventManagementOpened: jest.fn(),
      };
      const { baseElement } = eventContextMock(<EventManagement />, eventProviderValue);

      expect(baseElement).toMatchSnapshot('EventManagement snapshot modal opened');
    });
  });

  describe('@events', () => {
    it('should trigger handleSaveEvent', () => {
      const eventProviderValue = {
        currentEvent: createEvent(new Date('2021-08-03')),
        eventsCollection: new Dayz.EventsCollection([]),
        setEventsCollection: jest.fn(),
        eventManagementOpened: true,
        setEventManagementOpened: jest.fn(),
      };
      eventContextMock(<EventManagement />, eventProviderValue);

      screen.getByRole('button').click();

      expect(eventProviderValue.setEventManagementOpened).toHaveBeenLastCalledWith(false);
      expect(eventProviderValue.setEventsCollection).toHaveBeenCalledTimes(1);
    });
  });
});

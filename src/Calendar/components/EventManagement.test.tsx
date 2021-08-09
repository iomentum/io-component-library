/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { EventContext } from '../contexts/EventContext';
import { EventManagement } from './EventManagement';
import { MockMyCalendarEvents } from '../utils/testUtils';
import { createDefaultMyCalendarEvent } from '../utils/eventUtils';

jest.mock('../utils/momentUtils', () => ({
  createExtendedMomentFromDate: () => new Date('2021-08-03'),
}));

const eventContextMock = (component, providerValue) =>
  render(<EventContext.Provider value={providerValue}>{component}</EventContext.Provider>);

describe('EventManagement component', () => {
  describe('@snapshots', () => {
    it('should match with previous EventManagement modal closed', () => {
      const eventProviderValue = {
        currentEvent: createDefaultMyCalendarEvent(new Date('2021-08-03')),
        eventsCollection: MockMyCalendarEvents,
        eventManagementOpened: false,
      };
      const { baseElement } = eventContextMock(<EventManagement />, eventProviderValue);

      expect(baseElement).toMatchSnapshot('EventManagement snapshot modal closed');
    });

    it('should match with previous EventManagement modal opened', () => {
      const eventProviderValue = {
        currentEvent: createDefaultMyCalendarEvent(new Date('2021-08-03')),
        eventsCollection: MockMyCalendarEvents,
        eventManagementOpened: true,
      };
      const { baseElement } = eventContextMock(<EventManagement />, eventProviderValue);

      expect(baseElement).toMatchSnapshot('EventManagement snapshot modal opened');
    });
  });

  describe('@events', () => {
    it('should trigger handleSaveEvent', () => {
      const eventProviderValue = {
        currentEvent: createDefaultMyCalendarEvent(new Date('2021-08-03')),
        eventsCollection: MockMyCalendarEvents,
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

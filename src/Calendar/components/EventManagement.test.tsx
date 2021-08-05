/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { EventContext } from '../contexts/EventContext';
import { EventManagement } from './EventManagement';
import { MockEvents } from '../utils/testUtils';
import { formatDateAndHour } from '../utils/dateUtils';
import { Event } from '../reducers/EventReducer';
import { createDefaultEvent } from '../utils/eventUtils';

jest.mock('../utils/momentUtils', () => ({
  createExtendedMomentFromDate: () => new Date('2021-08-03'),
}));

const eventContextMock = (component, providerValue) =>
  render(<EventContext.Provider value={providerValue}>{component}</EventContext.Provider>);

const generateEvent = (startDate: Date): Event => {
  const { uuid, title, endDate, metadata } = createDefaultEvent(startDate);

  const [displayStartDate, startHour] = formatDateAndHour(startDate);
  const [displayEndDate, endHour] = formatDateAndHour(endDate);

  return {
    uuid,
    title,
    startDate,
    endDate,
    startHour,
    endHour,
    displayStartDate,
    displayEndDate,
    metadata,
  };
};

describe('EventManagement component', () => {
  describe('@snapshots', () => {
    it('should match with previous EventManagement modal closed', () => {
      const eventProviderValue = {
        event: generateEvent(new Date('2021-08-03')),
        eventsCollection: MockEvents,
        eventManagementOpened: false,
      };
      const { baseElement } = eventContextMock(<EventManagement />, eventProviderValue);

      expect(baseElement).toMatchSnapshot('EventManagement snapshot modal closed');
    });

    it('should match with previous EventManagement modal opened', () => {
      const eventProviderValue = {
        event: generateEvent(new Date('2021-08-03')),
        eventsCollection: MockEvents,
        eventManagementOpened: true,
      };
      const { baseElement } = eventContextMock(<EventManagement />, eventProviderValue);

      expect(baseElement).toMatchSnapshot('EventManagement snapshot modal opened');
    });
  });

  describe('@events', () => {
    it('should trigger handleSaveEvent', () => {
      const eventProviderValue = {
        event: generateEvent(new Date('2021-08-03')),
        eventsCollection: MockEvents,
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

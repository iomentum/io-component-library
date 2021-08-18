import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { EventContext } from '../contexts/EventContext';
import { EventManagement } from './EventManagement';
import { mockedEvents, getMockedEvent } from '../utils/testUtils';
import { createDefaultEvent } from '../utils/eventUtils';
import { EventType } from '../reducers/EventReducer';

const eventContextMock = (component, providerValue) =>
  render(<EventContext.Provider value={providerValue}>{component}</EventContext.Provider>);

describe('EventManagement component', () => {
  describe('@snapshots', () => {
    it('should match with previous EventManagement modal closed', () => {
      const eventProviderValue = {
        event: createDefaultEvent(new Date('2021-08-03')),
        eventsCollection: mockedEvents,
        eventManagementOpened: false,
      };
      const { baseElement } = eventContextMock(<EventManagement />, eventProviderValue);

      expect(baseElement).toMatchSnapshot('EventManagement snapshot modal closed');
    });

    it('should match with previous EventManagement modal opened', () => {
      const eventProviderValue = {
        event: createDefaultEvent(new Date('2021-08-03')),
        eventsCollection: mockedEvents,
        eventManagementOpened: true,
        dispatchEvent: jest.fn(),
      };
      const { baseElement } = eventContextMock(<EventManagement />, eventProviderValue);

      expect(baseElement).toMatchSnapshot('EventManagement snapshot modal opened');
    });

    it('should match with previous EventManagement modal opened for updating event', () => {
      const eventProviderValue = {
        event: getMockedEvent(),
        eventsCollection: mockedEvents,
        eventManagementOpened: true,
        dispatchEvent: jest.fn(),
      };
      const { baseElement } = eventContextMock(<EventManagement />, eventProviderValue);

      expect(baseElement).toMatchSnapshot('EventManagement snapshot modal opened');
    });
  });

  describe('@events', () => {
    it('should trigger handleSaveEvent', () => {
      const eventProviderValue = {
        event: createDefaultEvent(new Date('2021-08-03')),
        eventsCollection: mockedEvents,
        setEventsCollection: jest.fn(),
        eventManagementOpened: true,
        setEventManagementOpened: jest.fn(),
        dispatchEvent: jest.fn(),
      };
      eventContextMock(<EventManagement />, eventProviderValue);

      screen.getByRole('button').click();

      expect(eventProviderValue.setEventManagementOpened).toHaveBeenLastCalledWith(false);
      expect(eventProviderValue.setEventsCollection).toHaveBeenCalledTimes(1);
    });

    it('should trigger handleTitleChange', () => {
      const eventProviderValue = {
        event: createDefaultEvent(new Date('2021-08-03')),
        eventsCollection: mockedEvents,
        eventManagementOpened: true,
        dispatchEvent: jest.fn(),
      };
      eventContextMock(<EventManagement />, eventProviderValue);

      const input = screen.getByTestId('addTitle') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test' } });

      expect(eventProviderValue.dispatchEvent).toHaveBeenLastCalledWith({
        type: EventType.UpdateTitle,
        title: 'test',
      });
    });
  });
});

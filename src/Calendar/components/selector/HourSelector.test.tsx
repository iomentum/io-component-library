/**
 * @jest-environment jsdom
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { EventManagementContext } from '../../contexts/EventManagementContext';
import { HourSelector, computeStartHourChanges, computeEndHourChanges } from './HourSelector';
import { EventType } from '../../reducers/EventReducer';

const eventManagementContextMock = (component, { providerValue, ...renderOptions }) =>
  render(
    <EventManagementContext.Provider value={providerValue}>
      {component}
    </EventManagementContext.Provider>,
    renderOptions
  );

describe('HourSelector component', () => {
  describe('@snapshots', () => {
    it('should match with the previous HourSelector', () => {
      const providerValue = {
        event: {
          startHour: '00:00',
          endHour: '01:00',
        },
        dispatchEvent: jest.fn(),
      };
      const { asFragment } = eventManagementContextMock(<HourSelector />, { providerValue });

      expect(asFragment()).toMatchSnapshot('HourSelector snapshot');
    });
  });

  describe('@events', () => {
    it('should be dispatched with the right startHour', () => {
      const providerValue = {
        event: {
          startHour: '00:00',
          endHour: '01:00',
        },
        dispatchEvent: jest.fn(),
      };
      const component = eventManagementContextMock(<HourSelector />, {
        providerValue,
      });

      const input = component.getByTestId('startTime') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '01:10' } });

      expect(providerValue.dispatchEvent).toHaveBeenCalledWith({
        type: EventType.UpdateStartHour,
        startHour: '01:10',
      });
    });

    it('should be dispatched with the right endHour', () => {
      const providerValue = {
        event: {
          startHour: '00:00',
          endHour: '01:00',
        },
        dispatchEvent: jest.fn(),
      };
      const component = eventManagementContextMock(<HourSelector />, {
        providerValue,
      });

      const input = component.getByTestId('endTime') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '01:10' } });

      expect(providerValue.dispatchEvent).toHaveBeenCalledWith({
        type: EventType.UpdateEndHour,
        endHour: '01:10',
      });
    });
  });
});

describe('computeHourChanges functions', () => {
  describe('computeStartHourChanges function', () => {
    it('should not trigger dispatchEvent, 1st case', () => {
      const dispatchEvent = jest.fn();
      computeStartHourChanges('00:00', '00:50', dispatchEvent);

      expect(dispatchEvent).not.toHaveBeenCalled();
    });

    it('should not trigger dispatchEvent, 2nd case', () => {
      const dispatchEvent = jest.fn();
      computeStartHourChanges('23:15', '23:16', dispatchEvent);

      expect(dispatchEvent).not.toHaveBeenCalled();
    });

    it('should update endHour with +1 hour', () => {
      const dispatchEvent = jest.fn();
      computeStartHourChanges('01:00', '00:50', dispatchEvent);

      expect(dispatchEvent).toHaveBeenCalledWith({
        type: EventType.UpdateEndHour,
        endHour: '02:00',
      });
    });

    it('should update endHour with 23:59', () => {
      const dispatchEvent = jest.fn();
      computeStartHourChanges('23:10', '00:50', dispatchEvent);

      expect(dispatchEvent).toHaveBeenCalledWith({
        type: EventType.UpdateEndHour,
        endHour: '23:59',
      });
    });
  });

  describe('computeEndHourChanges function', () => {
    it('should not trigger dispatchEvent, 1st case', () => {
      const dispatchEvent = jest.fn();
      computeEndHourChanges('00:00', '00:50', dispatchEvent);

      expect(dispatchEvent).not.toHaveBeenCalled();
    });

    it('should not trigger dispatchEvent, 2nd case', () => {
      const dispatchEvent = jest.fn();
      computeEndHourChanges('23:15', '23:16', dispatchEvent);

      expect(dispatchEvent).not.toHaveBeenCalled();
    });

    it('should update startHour with +1 hour', () => {
      const dispatchEvent = jest.fn();
      computeEndHourChanges('02:50', '02:00', dispatchEvent);

      expect(dispatchEvent).toHaveBeenCalledWith({
        type: EventType.UpdateStartHour,
        startHour: '01:00',
      });
    });

    it('should update startHour with 00:00', () => {
      const dispatchEvent = jest.fn();
      computeEndHourChanges('23:10', '00:50', dispatchEvent);

      expect(dispatchEvent).toHaveBeenCalledWith({
        type: EventType.UpdateStartHour,
        startHour: '00:00',
      });
    });
  });
});

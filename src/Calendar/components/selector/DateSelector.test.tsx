/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { EventManagementContext } from '../../contexts/EventManagementContext';
import { EventType } from '../../reducers/EventReducer';
import { formatDateAndHour } from '../../utils';
import { DateSelector, DateType } from './DateSelector';

const eventManagementContextMock = (component, { providerValue, ...renderOptions }) =>
  render(
    <EventManagementContext.Provider value={providerValue}>
      {component}
    </EventManagementContext.Provider>,
    renderOptions
  );

describe('DateSelector component', () => {
  describe('@snapshot', () => {
    it('should match with previous DateType.Start DateSelector', () => {
      const startDate = new Date('2021-07-30');
      const [displayStartDate, startHour] = formatDateAndHour(startDate);

      const providerValue = {
        event: {
          startDate,
          displayStartDate,
          startHour,
        },
        dispatchEvent: jest.fn(),
      };
      const { asFragment } = eventManagementContextMock(
        <DateSelector dateType={DateType.Start} />,
        { providerValue }
      );

      expect(asFragment()).toMatchSnapshot('Start DateSelector snapshot');
    });

    it('should match with previous DateType.End DateSelector', () => {
      const endDate = new Date('2021-07-30');
      const [displayEndDate, endHour] = formatDateAndHour(endDate);

      const providerValue = {
        event: {
          endDate,
          displayEndDate,
          endHour,
        },
        dispatchEvent: jest.fn(),
      };
      const { asFragment } = eventManagementContextMock(<DateSelector dateType={DateType.End} />, {
        providerValue,
      });

      expect(asFragment()).toMatchSnapshot('End DateSelector snapshot');
    });
  });

  describe('@props', () => {
    describe('should match the expected dateType', () => {
      it('dateType: Start', () => {
        const startDate = new Date('2021-07-25');
        const [displayStartDate, startHour] = formatDateAndHour(startDate);

        const providerValue = {
          event: {
            startDate,
            displayStartDate,
            startHour,
          },
          dispatchEvent: jest.fn(),
        };

        eventManagementContextMock(<DateSelector dateType={DateType.Start} />, { providerValue });

        expect(screen.getByDisplayValue('2021-07-25')).not.toBeNull();
      });

      it('dateType: End', () => {
        const endDate = new Date('2021-07-30');
        const [displayEndDate, endHour] = formatDateAndHour(endDate);

        const providerValue = {
          event: {
            endDate,
            displayEndDate,
            endHour,
          },
          dispatchEvent: jest.fn(),
        };

        eventManagementContextMock(<DateSelector dateType={DateType.End} />, { providerValue });

        expect(screen.getByDisplayValue('2021-07-30')).not.toBeNull();
      });
    });
  });

  describe('@events', () => {
    it('should be dispatched with the right startDate', () => {
      const startDate = new Date('2021-07-25');
      const [displayStartDate, startHour] = formatDateAndHour(startDate);

      const providerValue = {
        event: {
          startDate,
          displayStartDate,
          startHour,
        },
        dispatchEvent: jest.fn(),
      };
      const component = eventManagementContextMock(<DateSelector dateType={DateType.Start} />, {
        providerValue,
      });

      const input = component.getByTestId('startDate') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '2021-07-26' } });

      expect(providerValue.dispatchEvent).toHaveBeenCalledWith({
        type: EventType.UpdateStartDate,
        startDate: new Date('2021-07-26'),
      });
    });

    it('should be dispatched with the right endDate', () => {
      const endDate = new Date('2021-07-25');
      const [displayEndDate, endHour] = formatDateAndHour(endDate);

      const providerValue = {
        event: {
          endDate,
          displayEndDate,
          endHour,
        },
        dispatchEvent: jest.fn(),
      };
      const component = eventManagementContextMock(<DateSelector dateType={DateType.End} />, {
        providerValue,
      });

      const input = component.getByTestId('endDate') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '2021-07-26' } });

      expect(providerValue.dispatchEvent).toHaveBeenCalledWith({
        type: EventType.UpdateEndDate,
        endDate: new Date('2021-07-26'),
      });
    });
  });
});

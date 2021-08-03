/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { EventManagementContext } from '../../contexts/EventManagementContext';
import { formatDateAndHour } from '../../utils';
import { DurationSelector } from './DurationSelector';

const eventManagementContextMock = (component, { providerValue, ...renderOptions }) =>
  render(
    <EventManagementContext.Provider value={providerValue}>
      {component}
    </EventManagementContext.Provider>,
    renderOptions
  );

const generateProviderValue = (isFullDayEvent: boolean) => ({
  isFullDayEvent,
  setIsFullDayEvent: jest.fn(),
  event: {
    startHour: '00:00',
    endHour: '01:00',
  },
  dispatchEvent: jest.fn(),
});

describe('DurationSelector component', () => {
  describe('@snapshot', () => {
    it('should match with the previous DurationSelector fullDayEvent', () => {
      const endDate = new Date('2021-07-30');
      const [displayEndDate, endHour] = formatDateAndHour(endDate);

      const providerValue = {
        isFullDayEvent: true,
        setIsFullDayEvent: jest.fn(),
        event: {
          endDate,
          displayEndDate,
          endHour,
        },
        dispatchEvent: jest.fn(),
      };
      const { asFragment } = eventManagementContextMock(<DurationSelector />, { providerValue });

      expect(asFragment()).toMatchSnapshot('DurationSelector fullDayEvent snapshot');
    });

    it('should match with the previous DurationSelector notFullDayEvent', () => {
      const { asFragment } = eventManagementContextMock(<DurationSelector />, {
        providerValue: generateProviderValue(false),
      });

      expect(asFragment()).toMatchSnapshot('DurationSelector notFullDayEvent snapshot');
    });
  });

  describe('@events', () => {
    describe('checkbox toggle', () => {
      it('should call setIsFullDayEvent with false', () => {
        const providerValue = generateProviderValue(true);

        eventManagementContextMock(<DurationSelector />, {
          providerValue,
        });

        const inputDisplayCheckbox = screen.getByRole('checkbox');
        inputDisplayCheckbox.click();

        expect(providerValue.setIsFullDayEvent).toHaveBeenCalledWith(!providerValue.isFullDayEvent);
      });

      it('should call setIsFullDayEvent with true', () => {
        const providerValue = generateProviderValue(false);

        eventManagementContextMock(<DurationSelector />, {
          providerValue,
        });

        const inputDisplayCheckbox = screen.getByRole('checkbox');
        inputDisplayCheckbox.click();

        expect(providerValue.setIsFullDayEvent).toHaveBeenCalledWith(!providerValue.isFullDayEvent);
      });
    });
  });

  describe('@props', () => {
    it('should display DateSelector when isFullDayEvent is true', () => {
      eventManagementContextMock(<DurationSelector />, {
        providerValue: generateProviderValue(true),
      });

      expect(screen.getByTestId('endDate')).not.toBeNull();
    });

    it('should display HourSelector when isFullDayEvent is false', () => {
      eventManagementContextMock(<DurationSelector />, {
        providerValue: generateProviderValue(false),
      });

      expect(screen.getByTestId('startTime')).not.toBeNull();
      expect(screen.getByTestId('endTime')).not.toBeNull();
    });
  });
});

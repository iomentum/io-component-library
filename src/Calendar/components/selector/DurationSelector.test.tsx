/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { EventContext } from '../../contexts/EventContext';
import { EventManagementContext } from '../../contexts/EventManagementContext';
import { formatDateAndHour } from '../../utils/dateUtils';
import { DurationSelector } from './DurationSelector';

const contextMock = (component, eventProviderValue, eventManagementProviderValue) =>
  render(
    <EventContext.Provider value={eventProviderValue}>
      <EventManagementContext.Provider value={eventManagementProviderValue}>
        {component}
      </EventManagementContext.Provider>
    </EventContext.Provider>
  );

const generateEventManagementProviderValue = (isFullDayEvent: boolean) => ({
  isFullDayEvent,
  setIsFullDayEvent: jest.fn(),
});

const eventProviderValue = {
  event: {
    startHour: '00:00',
    endHour: '01:00',
  },
  dispatchEvent: jest.fn(),
};

describe('DurationSelector component', () => {
  describe('@snapshots', () => {
    it('should match with the previous DurationSelector fullDayEvent', () => {
      const endDate = new Date('2021-07-30');
      const [displayEndDate, endHour] = formatDateAndHour(endDate);

      const { asFragment } = contextMock(
        <DurationSelector />,
        {
          event: {
            endDate,
            displayEndDate,
            endHour,
          },
          dispatchEvent: jest.fn(),
        },
        generateEventManagementProviderValue(true)
      );

      expect(asFragment()).toMatchSnapshot('DurationSelector fullDayEvent snapshot');
    });

    it('should match with the previous DurationSelector notFullDayEvent', () => {
      const { asFragment } = contextMock(
        <DurationSelector />,
        eventProviderValue,
        generateEventManagementProviderValue(false)
      );

      expect(asFragment()).toMatchSnapshot('DurationSelector notFullDayEvent snapshot');
    });
  });

  describe('@events', () => {
    describe('checkbox toggle', () => {
      it('should call setIsFullDayEvent with false', () => {
        const providerValue = generateEventManagementProviderValue(true);
        contextMock(<DurationSelector />, eventProviderValue, providerValue);

        const inputDisplayCheckbox = screen.getByRole('checkbox');
        inputDisplayCheckbox.click();

        expect(providerValue.setIsFullDayEvent).toHaveBeenCalledWith(!providerValue.isFullDayEvent);
      });

      it('should call setIsFullDayEvent with true', () => {
        const providerValue = generateEventManagementProviderValue(false);
        contextMock(<DurationSelector />, eventProviderValue, providerValue);

        const inputDisplayCheckbox = screen.getByRole('checkbox');
        inputDisplayCheckbox.click();

        expect(providerValue.setIsFullDayEvent).toHaveBeenCalledWith(!providerValue.isFullDayEvent);
      });
    });
  });

  describe('@props', () => {
    it('should display DateSelector when isFullDayEvent is true', () => {
      contextMock(
        <DurationSelector />,
        eventProviderValue,
        generateEventManagementProviderValue(true)
      );

      expect(screen.getByTestId('endDate')).not.toBeNull();
    });

    it('should display HourSelector when isFullDayEvent is false', () => {
      contextMock(
        <DurationSelector />,
        eventProviderValue,
        generateEventManagementProviderValue(false)
      );

      expect(screen.getByTestId('startTime')).not.toBeNull();
      expect(screen.getByTestId('endTime')).not.toBeNull();
    });
  });
});

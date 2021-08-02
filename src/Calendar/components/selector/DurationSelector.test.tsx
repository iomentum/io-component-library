/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
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
      const providerValue = {
        isFullDayEvent: false,
        setIsFullDayEvent: jest.fn(),
        event: {
          startHour: '00:00',
          endHour: '01:00',
        },
        dispatchEvent: jest.fn(),
      };
      const { asFragment } = eventManagementContextMock(<DurationSelector />, { providerValue });

      expect(asFragment()).toMatchSnapshot('DurationSelector notFullDayEvent snapshot');
    });
  });
});

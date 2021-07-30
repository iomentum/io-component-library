/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import React from 'react';
import { EventManagementContext } from '../../contexts/EventManagementContext';
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
    it('should match with previous DateSelector', () => {
      const startDate = new Date('2021-07-30');
      const endDate = new Date(startDate);
      endDate.setHours(1);
      const [displayStartDate, startHour] = formatDateAndHour(startDate);
      const [displayEndDate, endHour] = formatDateAndHour(endDate);
      const providerValue = {
        event: {
          content: 'Test',
          startDate,
          displayStartDate,
          endDate,
          displayEndDate,
          startHour,
          endHour,
        },
        dispatchEvent: jest.fn(),
      };
      const { asFragment } = eventManagementContextMock(
        <DateSelector dateType={DateType.Start} />,
        { providerValue }
      );

      expect(asFragment()).toMatchSnapshot('DateSelector snapshot');
    });
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { EventContext } from '../../contexts/EventContext';
import { EventType } from '../../reducers/EventReducer';
import { formatDateAndHour } from '../../utils/dateUtils';
import { DateSelector, DateType } from './DateSelector';

const eventContextMock = (component, providerValue) =>
  render(<EventContext.Provider value={providerValue}>{component}</EventContext.Provider>);

const providerValue = (dateType: DateType) => {
  const date = new Date('2021-07-30');
  const [displayDate, hour] = formatDateAndHour(date);

  if (dateType === DateType.Start) {
    return {
      event: {
        startDate: date,
        displayStartDate: displayDate,
        startHour: hour,
      },
      dispatchEvent: jest.fn(),
    };
  }
  return {
    event: {
      endDate: date,
      displayEndDate: displayDate,
      endHour: hour,
    },
    dispatchEvent: jest.fn(),
  };
};

describe('DateSelector component', () => {
  describe('@snapshots', () => {
    it('should match with previous DateType.Start DateSelector', () => {
      const { asFragment } = eventContextMock(
        <DateSelector dateType={DateType.Start} />,
        providerValue(DateType.Start)
      );

      expect(asFragment()).toMatchSnapshot('Start DateSelector snapshot');
    });

    it('should match with previous DateType.End DateSelector', () => {
      const { asFragment } = eventContextMock(
        <DateSelector dateType={DateType.End} />,
        providerValue(DateType.End)
      );

      expect(asFragment()).toMatchSnapshot('End DateSelector snapshot');
    });
  });

  describe('@props', () => {
    describe('should match the expected dateType', () => {
      it('dateType: Start', () => {
        eventContextMock(<DateSelector dateType={DateType.Start} />, providerValue(DateType.Start));

        expect(screen.getByDisplayValue('2021-07-30')).not.toBeNull();
      });

      it('dateType: End', () => {
        eventContextMock(<DateSelector dateType={DateType.End} />, providerValue(DateType.End));

        expect(screen.getByDisplayValue('2021-07-30')).not.toBeNull();
      });
    });
  });

  describe('@events', () => {
    it('should be dispatched with the right startDate', () => {
      const providedValue = providerValue(DateType.Start);
      const component = eventContextMock(<DateSelector dateType={DateType.Start} />, providedValue);

      const input = component.getByTestId('startDate') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '2021-07-26' } });

      expect(providedValue.dispatchEvent).toHaveBeenCalledWith({
        type: EventType.UpdateStartDate,
        startDate: new Date('2021-07-26'),
      });
    });

    it('should be dispatched with the right endDate', () => {
      const valueProvided = providerValue(DateType.End);
      const component = eventContextMock(<DateSelector dateType={DateType.End} />, valueProvided);

      const input = component.getByTestId('endDate') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '2021-07-26' } });

      expect(valueProvided.dispatchEvent).toHaveBeenCalledWith({
        type: EventType.UpdateEndDate,
        endDate: new Date('2021-07-26'),
      });
    });
  });
});

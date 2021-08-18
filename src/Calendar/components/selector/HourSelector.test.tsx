import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { EventContext } from '../../contexts/EventContext';
import { HourSelector, computeNewHours, EventHourType } from './HourSelector';
import { EventType } from '../../reducers/EventReducer';

const eventManagementContextMock = (component, providerValue) =>
  render(<EventContext.Provider value={providerValue}>{component}</EventContext.Provider>);

const providerValue = {
  event: {
    startHour: '00:00',
    endHour: '01:00',
  },
  dispatchEvent: jest.fn(),
};

describe('HourSelector component', () => {
  describe('@snapshots', () => {
    it('should match with the previous HourSelector', () => {
      const { asFragment } = eventManagementContextMock(<HourSelector />, providerValue);

      expect(asFragment()).toMatchSnapshot('HourSelector snapshot');
    });
  });

  describe('@events', () => {
    it('should be dispatched with the right startHour', () => {
      const component = eventManagementContextMock(<HourSelector />, providerValue);

      const input = component.getByTestId('startTime') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '01:10' } });

      expect(providerValue.dispatchEvent).toHaveBeenCalledWith({
        type: EventType.UpdateHours,
        startHour: '01:10',
        endHour: '02:10',
      });
    });

    it('should be dispatched with the right endHour', () => {
      const component = eventManagementContextMock(<HourSelector />, providerValue);

      const input = component.getByTestId('endTime') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '01:10' } });

      expect(providerValue.dispatchEvent).toHaveBeenCalledWith({
        type: EventType.UpdateHours,
        startHour: '00:00',
        endHour: '01:10',
      });
    });
  });
});

describe('computeNewHours functions', () => {
  it('should not change startHour and endHour, EventHourType.Start', () => {
    const startHour = '00:00';
    const endHour = '00:50';
    const [computedStartHour, computedEndHour] = computeNewHours(
      startHour,
      endHour,
      EventHourType.Start
    );

    expect(computedStartHour).toEqual(startHour);
    expect(computedEndHour).toEqual(endHour);
  });

  it('should not change startHour and endHour, EventHourType.End', () => {
    const startHour = '00:00';
    const endHour = '00:50';
    const [computedStartHour, computedEndHour] = computeNewHours(
      startHour,
      endHour,
      EventHourType.End
    );

    expect(computedStartHour).toEqual(startHour);
    expect(computedEndHour).toEqual(endHour);
  });

  it('should change startHour, EventHourType.End', () => {
    const startHour = '03:00';
    const endHour = '01:50';
    const [computedStartHour, computedEndHour] = computeNewHours(
      startHour,
      endHour,
      EventHourType.End
    );

    expect(computedStartHour).toEqual('00:50');
    expect(computedEndHour).toEqual(endHour);
  });

  it('should change endHour, EventHourType.Start', () => {
    const startHour = '03:00';
    const endHour = '01:50';
    const [computedStartHour, computedEndHour] = computeNewHours(
      startHour,
      endHour,
      EventHourType.Start
    );

    expect(computedStartHour).toEqual(startHour);
    expect(computedEndHour).toEqual('04:00');
  });

  it('should change startHour to 00:00, EventHourType.End', () => {
    const startHour = '03:00';
    const endHour = '00:50';
    const [computedStartHour, computedEndHour] = computeNewHours(
      startHour,
      endHour,
      EventHourType.End
    );

    expect(computedStartHour).toEqual('00:00');
    expect(computedEndHour).toEqual(endHour);
  });

  it('should change endHour to 23:59, EventHourType.Start', () => {
    const startHour = '23:23';
    const endHour = '00:50';
    const [computedStartHour, computedEndHour] = computeNewHours(
      startHour,
      endHour,
      EventHourType.Start
    );

    expect(computedStartHour).toEqual(startHour);
    expect(computedEndHour).toEqual('23:59');
  });
});

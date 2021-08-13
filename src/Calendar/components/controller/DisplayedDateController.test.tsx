/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { CalendarContext } from '../../contexts/CalendarContext';
import {
  computeNewDate,
  ControlButton,
  DisplayedDateController,
  MathOperation,
} from './DisplayedDateController';

const calendarContextMock = (component, providerValue) =>
  render(<CalendarContext.Provider value={providerValue}>{component}</CalendarContext.Provider>);

const providerValue = {
  setDisplayedDate: jest.fn(),
};

describe('ControlButton component', () => {
  describe('@snapshots', () => {
    it('should match with previous ControlButton', () => {
      const { asFragment } = render(<ControlButton label="test" onClick={jest.fn()} />);

      expect(asFragment()).toMatchSnapshot('ControlButton snapshot');
    });
  });

  describe('@events', () => {
    it('should handle a click', () => {
      const handleOnClick = jest.fn();
      render(<ControlButton label="" onClick={handleOnClick} />);

      screen.getByRole('button').click();

      expect(handleOnClick).toHaveBeenCalledTimes(1);
    });
  });
});

describe('DisplayedDateController component', () => {
  describe('@snapshots', () => {
    it('should match with previous ', () => {
      const { asFragment } = calendarContextMock(<DisplayedDateController />, providerValue);

      expect(asFragment()).toMatchSnapshot('DisplayedDateController snapshot');
    });
  });

  describe('@events', () => {
    it('each buttons should trigger a setDisplayedDate on click', () => {
      calendarContextMock(<DisplayedDateController />, providerValue);

      screen.getAllByRole('button').forEach((button) => button.click());

      expect(providerValue.setDisplayedDate).toHaveBeenCalledTimes(3);
    });
  });
});

describe('computeNewDate function', () => {
  describe('should add', () => {
    it('1 day', () => {
      const date = new Date();
      const computedDate = computeNewDate(new Date(date), MathOperation.Addition, 1);

      date.setDate(date.getDate() + 1);
      expect(computedDate).toEqual(new Date(date));
    });

    it('7 days', () => {
      const date = new Date();
      const computedDate = computeNewDate(new Date(date), MathOperation.Addition, 7);

      date.setDate(date.getDate() + 7);
      expect(computedDate).toEqual(new Date(date));
    });

    it('30 days', () => {
      const date = new Date();
      const computedDate = computeNewDate(new Date(date), MathOperation.Addition, 30);

      date.setDate(date.getDate() + 30);
      expect(computedDate).toEqual(new Date(date));
    });
  });

  describe('should substract', () => {
    it('1 day', () => {
      const date = new Date();
      const computedDate = computeNewDate(new Date(date), MathOperation.Substraction, 1);

      date.setDate(date.getDate() - 1);
      expect(computedDate).toEqual(new Date(date));
    });

    it('7 days', () => {
      const date = new Date();
      const computedDate = computeNewDate(new Date(date), MathOperation.Substraction, 7);

      date.setDate(date.getDate() - 7);
      expect(computedDate).toEqual(new Date(date));
    });

    it('30 days', () => {
      const date = new Date();
      const computedDate = computeNewDate(new Date(date), MathOperation.Substraction, 30);

      date.setDate(date.getDate() - 30);
      expect(computedDate).toEqual(new Date(date));
    });
  });
});

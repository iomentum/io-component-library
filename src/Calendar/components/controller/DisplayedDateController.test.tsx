/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { CalendarContext } from '../../contexts/CalendarContext';
import { DisplayMode } from '../../utils';
import {
  computeNewDate,
  ControlButton,
  DisplayedDateController,
  MathOperation,
} from './DisplayedDateController';

const calendarContextMock = (component, { providerValue, ...renderOptions }) =>
  render(
    <CalendarContext.Provider value={providerValue}>{component}</CalendarContext.Provider>,
    renderOptions
  );

describe('ControlButton component', () => {
  describe('@snapshot', () => {
    it('should match with previous ControlButton', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const { asFragment } = render(<ControlButton label="test" onClick={() => {}} />);

      expect(asFragment()).toMatchSnapshot('global snapshot');
    });
  });

  describe('@event', () => {
    it('should handle a click', () => {
      const handleOnClick = jest.fn();
      render(<ControlButton label="" onClick={handleOnClick} />);

      screen.getByRole('button').click();

      expect(handleOnClick).toHaveBeenCalledTimes(1);
    });
  });
});

describe('DisplayedDateController component', () => {
  describe('@snapshot', () => {
    it('should match with previous ', () => {
      const providerValue = {
        displayMode: DisplayMode,
        setDisplayedDate: jest.fn(),
      };
      const { asFragment } = calendarContextMock(<DisplayedDateController />, {
        providerValue,
      });

      expect(asFragment()).toMatchSnapshot('global snapshot');
    });
  });

  describe('@event', () => {
    it('each buttons should trigger a setDisplayedDate on click', () => {
      const providerValue = {
        displayMode: DisplayMode,
        setDisplayedDate: jest.fn(),
      };
      calendarContextMock(<DisplayedDateController />, { providerValue });

      screen.getAllByRole('button').forEach((button) => button.click());

      expect(providerValue.setDisplayedDate).toHaveBeenCalledTimes(3);
    });
  });
});

describe('computeDate function', () => {
  describe('should add', () => {
    it('1 day', () => {
      const date = new Date();
      const computedDate = computeNewDate(new Date(date), MathOperation.Addition, 1);

      date.setDate(date.getDate() + 1);
      expect(computedDate).toEqual(new Date(date));
    });

    it('7 day', () => {
      const date = new Date();
      const computedDate = computeNewDate(new Date(date), MathOperation.Addition, 7);

      date.setDate(date.getDate() + 7);
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

    it('7 day', () => {
      const date = new Date();
      const computedDate = computeNewDate(new Date(date), MathOperation.Substraction, 7);

      date.setDate(date.getDate() - 7);
      expect(computedDate).toEqual(new Date(date));
    });
  });
});

/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { CalendarContext } from '../../contexts/CalendarContext';
import { Display } from '../../utils';
import { ControlButton, DateController } from './DateController';

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

      expect(asFragment()).toMatchSnapshot();
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

describe('DateController component', () => {
  describe('@snapshot', () => {
    it('should match with previous DateController', () => {
      const providerValue = {
        display: Display,
        setDate: jest.fn(),
      };
      const { asFragment } = calendarContextMock(<DateController />, {
        providerValue,
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('@event', () => {
    it('each buttons should trigger a setDate on click', () => {
      const providerValue = {
        display: Display,
        setDate: jest.fn(),
      };
      calendarContextMock(<DateController />, { providerValue });

      screen.getAllByRole('button').forEach((button) => button.click());

      expect(providerValue.setDate).toHaveBeenCalledTimes(3);
    });
  });
});

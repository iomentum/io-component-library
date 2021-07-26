/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { CalendarContext } from '../../contexts/CalendarContext';
import { Display } from '../../utils';
import { DisplayCheckbox, DisplayController } from './DisplayController';

const calendarContextMock = (component, { providerValue, ...renderOptions }) =>
  render(
    <CalendarContext.Provider value={providerValue}>{component}</CalendarContext.Provider>,
    renderOptions
  );

describe('DisplayCheckbox component', () => {
  describe('@snapshot', () => {
    it('should match with previous Week checkbox', () => {
      const providerValue = {
        display: Display,
        setDisplay: jest.fn(),
      };
      const { asFragment } = calendarContextMock(<DisplayCheckbox currentKey={Display.Week} />, {
        providerValue,
      });

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match with previous Day checkbox', () => {
      const providerValue = {
        display: Display,
        setDisplay: jest.fn(),
      };
      const { asFragment } = calendarContextMock(<DisplayCheckbox currentKey={Display.Day} />, {
        providerValue,
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('@event', () => {
    it('the Week checkbox should trigger a setDisplay on click', () => {
      const providerValue = {
        display: Display,
        setDisplay: jest.fn(),
      };
      calendarContextMock(<DisplayCheckbox currentKey={Display.Week} />, {
        providerValue,
      });

      const inputDisplayCheckbox = screen.getByRole('checkbox');
      inputDisplayCheckbox.click();
      expect(providerValue.setDisplay).toHaveBeenCalledTimes(1);
    });

    it('the Day checkbox should trigger a setDisplay on click', () => {
      const providerValue = {
        display: Display,
        setDisplay: jest.fn(),
      };
      calendarContextMock(<DisplayCheckbox currentKey={Display.Day} />, {
        providerValue,
      });

      const inputDisplayCheckbox = screen.getByRole('checkbox');
      inputDisplayCheckbox.click();
      expect(providerValue.setDisplay).toHaveBeenCalledTimes(1);
    });
  });
});

describe('DisplayController component', () => {
  describe('@snapshot', () => {
    it('should match with previous DisplayCheckbox', () => {
      const providerValue = {
        display: Display,
        setDisplay: jest.fn(),
      };
      const { asFragment } = calendarContextMock(<DisplayController />, {
        providerValue,
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });
});

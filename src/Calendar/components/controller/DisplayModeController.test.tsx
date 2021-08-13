/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { CalendarContext } from '../../contexts/CalendarContext';
import { DisplayMode } from '../../types';
import { DisplayCheckbox, DisplayModeController } from './DisplayModeController';

const calendarContextMock = (component, providerValue) =>
  render(<CalendarContext.Provider value={providerValue}>{component}</CalendarContext.Provider>);

const providerValue = {
  setDisplayMode: jest.fn(),
};

describe('DisplayCheckbox component', () => {
  describe('@snapshots', () => {
    it('should match with previous Month checkbox', () => {
      const { asFragment } = calendarContextMock(
        <DisplayCheckbox displayMode={DisplayMode.Month} />,
        providerValue
      );

      expect(asFragment()).toMatchSnapshot('DisplayCheckbox Month snapshot');
    });

    it('should match with previous Week checkbox', () => {
      const { asFragment } = calendarContextMock(
        <DisplayCheckbox displayMode={DisplayMode.Week} />,
        providerValue
      );

      expect(asFragment()).toMatchSnapshot('DisplayCheckbox Week snapshot');
    });

    it('should match with previous Day checkbox', () => {
      const { asFragment } = calendarContextMock(
        <DisplayCheckbox displayMode={DisplayMode.Day} />,
        providerValue
      );

      expect(asFragment()).toMatchSnapshot('DisplayCheckbox Day snapshot');
    });
  });

  describe('@events', () => {
    it('the Month checkbox should trigger a setDisplayMode on click', () => {
      calendarContextMock(<DisplayCheckbox displayMode={DisplayMode.Month} />, providerValue);

      const inputDisplayCheckbox = screen.getByRole('checkbox');
      inputDisplayCheckbox.click();
      expect(providerValue.setDisplayMode).toHaveBeenCalledWith('month');
    });

    it('the Week checkbox should trigger a setDisplayMode on click', () => {
      calendarContextMock(<DisplayCheckbox displayMode={DisplayMode.Week} />, providerValue);

      const inputDisplayCheckbox = screen.getByRole('checkbox');
      inputDisplayCheckbox.click();
      expect(providerValue.setDisplayMode).toHaveBeenCalledWith('week');
    });

    it('the Day checkbox should trigger a setDisplayMode on click', () => {
      calendarContextMock(<DisplayCheckbox displayMode={DisplayMode.Day} />, providerValue);

      const inputDisplayCheckbox = screen.getByRole('checkbox');
      inputDisplayCheckbox.click();
      expect(providerValue.setDisplayMode).toHaveBeenCalledWith('day');
    });
  });
});

describe('DisplayModeController component', () => {
  describe('@snapshots', () => {
    it('should match with previous DisplayCheckbox', () => {
      const { asFragment } = calendarContextMock(<DisplayModeController />, providerValue);

      expect(asFragment()).toMatchSnapshot('DisplayModeController snapshot');
    });
  });
});

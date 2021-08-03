/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import React from 'react';
import { CalendarContext } from '../contexts/CalendarContext';
import { DisplayMode } from '../utils';
import { CalendarHeader } from './CalendarHeader';

const calendarContextMock = (component, providerValue) =>
  render(<CalendarContext.Provider value={providerValue}>{component}</CalendarContext.Provider>);

describe('DisplayCheckbox component', () => {
  describe('@snapshots', () => {
    it('should match with previous CalendarHeader', () => {
      const providerValue = {
        displayMode: DisplayMode,
      };
      const { asFragment } = calendarContextMock(<CalendarHeader />, {
        providerValue,
      });

      expect(asFragment()).toMatchSnapshot('CalendarHeader snapshot');
    });
  });
});

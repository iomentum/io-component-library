/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import React from 'react';
import { CalendarContext, CalendarContextInterface } from '../contexts/CalendarContext';
import { CalendarHeader } from './CalendarHeader';

describe('DisplayCheckbox component', () => {
  describe('@snapshots', () => {
    it('should match with previous CalendarHeader', () => {
      const { asFragment } = render(
        <CalendarContext.Provider value={{} as CalendarContextInterface}>
          <CalendarHeader />
        </CalendarContext.Provider>
      );

      expect(asFragment()).toMatchSnapshot('CalendarHeader snapshot');
    });
  });
});

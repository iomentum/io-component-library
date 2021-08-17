/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { EventContext } from '../contexts/EventContext';
import { SideModal } from './SideModal';

const eventContextMock = (component, providerValue) =>
  render(<EventContext.Provider value={providerValue}>{component}</EventContext.Provider>);

const providerValue = (eventManagementOpened) => ({
  eventManagementOpened,
  setEventManagementOpened: jest.fn(),
});

describe('SideModal component', () => {
  describe('@snapshots', () => {
    it('should match with previous opened SideModal', () => {
      const { baseElement } = eventContextMock(
        <SideModal>
          <div />
          <div />
        </SideModal>,
        providerValue(true)
      );
      expect(baseElement).toMatchSnapshot('SideModal snapshot opened');
    });

    it('should match with previous closed SideModal', () => {
      const { baseElement } = eventContextMock(
        <SideModal>
          <div />
          <div />
        </SideModal>,
        providerValue(false)
      );
      expect(baseElement).toMatchSnapshot('SideModal snapshot closed');
    });
  });

  describe('@props', () => {
    it('should have children when opened', () => {
      eventContextMock(
        <SideModal>
          <div data-testid="test" />
          <div />
        </SideModal>,
        providerValue(true)
      );

      expect(screen.queryByTestId('test')).not.toBeNull();
    });

    it('should not have children when closed', () => {
      eventContextMock(
        <SideModal>
          <div data-testid="test" />
          <div />
        </SideModal>,
        providerValue(false)
      );

      expect(screen.queryByTestId('test')).toBeNull();
    });
  });
});

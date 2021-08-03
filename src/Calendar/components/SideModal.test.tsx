/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { EventContext } from '../contexts/EventContext';
import { SideModal } from './SideModal';

const eventContextMock = (component, { providerValue, ...renderOptions }) =>
  render(
    <EventContext.Provider value={providerValue}>{component}</EventContext.Provider>,
    renderOptions
  );

const providerValue = (eventManagementOpened) => ({
  eventManagementOpened,
  setEventManagementOpened: jest.fn(),
});

describe('SideModal component', () => {
  describe('@snapshots', () => {
    it('should match with previous opened SideModal', () => {
      const { baseElement } = eventContextMock(
        <SideModal onSave={jest.fn()}>
          <div />
          <div />
        </SideModal>,
        {
          providerValue: providerValue(true),
        }
      );

      expect(baseElement).toMatchSnapshot('SideModal snapshot opened');
    });

    it('should match with previous closed SideModal', () => {
      const { baseElement } = eventContextMock(
        <SideModal onSave={jest.fn()}>
          <div />
          <div />
        </SideModal>,
        {
          providerValue: providerValue(false),
        }
      );

      expect(baseElement).toMatchSnapshot('SideModal snapshot closed');
    });
  });

  describe('@props', () => {
    it('should have children when opened', () => {
      eventContextMock(
        <SideModal onSave={jest.fn()}>
          <div data-testid="test" />
          <div />
        </SideModal>,
        {
          providerValue: providerValue(true),
        }
      );

      expect(screen.queryByTestId('test')).not.toBeNull();
    });

    it('should not have children when closed', () => {
      eventContextMock(
        <SideModal onSave={jest.fn()}>
          <div data-testid="test" />
          <div />
        </SideModal>,
        {
          providerValue: providerValue(false),
        }
      );

      expect(screen.queryByTestId('test')).toBeNull();
    });
  });

  describe('@events', () => {
    it('should handle save', () => {
      const onSave = jest.fn();
      const generatedProviderValue = providerValue(true);

      eventContextMock(
        <SideModal onSave={onSave}>
          <div data-testid="test" />
          <div />
        </SideModal>,
        {
          providerValue: generatedProviderValue,
        }
      );

      screen.getByRole('button').click();

      expect(onSave).toHaveBeenCalledTimes(1);
      expect(generatedProviderValue.setEventManagementOpened).toHaveBeenCalledWith(false);
    });
  });
});

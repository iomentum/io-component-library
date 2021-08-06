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
    it('should match with previous opened SideModal on new event', () => {
      const { baseElement } = eventContextMock(
        <SideModal onSave={jest.fn()} onDelete={jest.fn()} isEventExisting={false}>
          <div />
          <div />
        </SideModal>,
        providerValue(true)
      );

      expect(baseElement).toMatchSnapshot('SideModal snapshot opened on new event');
    });

    it('should match with previous opened SideModal on update event', () => {
      const { baseElement } = eventContextMock(
        <SideModal onSave={jest.fn()} onDelete={jest.fn()} isEventExisting>
          <div />
          <div />
        </SideModal>,
        providerValue(true)
      );

      expect(baseElement).toMatchSnapshot('SideModal snapshot opened on update event');
    });

    it('should match with previous closed SideModal', () => {
      const { baseElement } = eventContextMock(
        <SideModal onSave={jest.fn()} onDelete={jest.fn()} isEventExisting>
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
        <SideModal onSave={jest.fn()} onDelete={jest.fn()} isEventExisting>
          <div data-testid="test" />
          <div />
        </SideModal>,
        providerValue(true)
      );

      expect(screen.queryByTestId('test')).not.toBeNull();
    });

    it('should not have children when closed', () => {
      eventContextMock(
        <SideModal onSave={jest.fn()} onDelete={jest.fn()} isEventExisting={false}>
          <div data-testid="test" />
          <div />
        </SideModal>,
        providerValue(false)
      );

      expect(screen.queryByTestId('test')).toBeNull();
    });
  });

  describe('@events', () => {
    it('should handle save', () => {
      const onSave = jest.fn();
      const generatedProviderValue = providerValue(true);

      eventContextMock(
        <SideModal onSave={onSave} onDelete={jest.fn()} isEventExisting={false}>
          <div data-testid="test" />
          <div />
        </SideModal>,
        generatedProviderValue
      );

      screen.getByRole('button').click();

      expect(onSave).toHaveBeenCalledTimes(1);
      expect(generatedProviderValue.setEventManagementOpened).toHaveBeenCalledWith(false);
    });

    it('should handle delete', () => {
      const onDelete = jest.fn();
      const generatedProviderValue = providerValue(true);

      eventContextMock(
        <SideModal onSave={jest.fn()} onDelete={onDelete} isEventExisting>
          <div data-testid="test" />
          <div />
        </SideModal>,
        generatedProviderValue
      );

      screen.getAllByRole('button')[1].click();

      expect(onDelete).toHaveBeenCalledTimes(1);
      expect(generatedProviderValue.setEventManagementOpened).toHaveBeenCalledWith(false);
    });
  });
});

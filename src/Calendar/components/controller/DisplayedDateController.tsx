import React, { MouseEventHandler, useCallback, useContext, useMemo } from 'react';
import { Button } from '@material-ui/core';
import { CalendarContext } from '../../contexts/CalendarContext';
import { DisplayMode } from '../../types';

export enum MathOperation {
  Addition,
  Substraction,
}

interface ControlButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const ControlButton = (props: ControlButtonProps) => (
  <Button onClick={props.onClick}>{props.label}</Button>
);

export const computeNewDate = (
  date: Date,
  mathOperation: MathOperation,
  displayMode: DisplayMode
) => {
  if (displayMode === DisplayMode.Day) {
    if (mathOperation === MathOperation.Addition) {
      date.setDate(date.getDate() + 1);
    } else {
      date.setDate(date.getDate() - 1);
    }
  }
  if (displayMode === DisplayMode.Week) {
    if (mathOperation === MathOperation.Addition) {
      date.setDate(date.getDate() + 7);
    } else {
      date.setDate(date.getDate() - 7);
    }
  }
  if (displayMode === DisplayMode.Month) {
    if (mathOperation === MathOperation.Addition) {
      date.setMonth(date.getMonth() + 1);
    } else {
      date.setMonth(date.getMonth() - 1);
    }
  }
  return new Date(date);
};

export const DisplayedDateController = () => {
  const { displayMode, setDisplayedDate } = useContext(CalendarContext);

  const handleSubstractButton = useCallback(
    () => setDisplayedDate((date) => computeNewDate(date, MathOperation.Substraction, displayMode)),
    [displayMode]
  );

  const handleTodayButton = useCallback(
    () => setDisplayedDate(() => new Date()),
    [setDisplayedDate]
  );

  const handleAddButton = useCallback(
    () => setDisplayedDate((date) => computeNewDate(date, MathOperation.Addition, displayMode)),
    [displayMode]
  );

  return (
    <>
      <ControlButton onClick={handleSubstractButton} label="<" />
      <ControlButton onClick={handleTodayButton} label="Today" />
      <ControlButton onClick={handleAddButton} label=">" />
    </>
  );
};

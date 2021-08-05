import React, { MouseEventHandler, useCallback, useContext, useMemo } from 'react';
import { Button } from '@material-ui/core';
import { CalendarContext } from '../../contexts/CalendarContext';
import { DisplayMode } from '../../utils';

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

export const computeNewDate = (date: Date, op: MathOperation, dayToCompute: number) => {
  if (op === MathOperation.Addition) {
    date.setDate(date.getDate() + dayToCompute);
  } else {
    date.setDate(date.getDate() - dayToCompute);
  }
  return new Date(date);
};

export const DisplayedDateController = () => {
  const { displayMode, setDisplayedDate } = useContext(CalendarContext);
  const dayToCompute = useMemo(
    // eslint-disable-next-line no-nested-ternary
    () => (displayMode === DisplayMode.Day ? 1 : displayMode === DisplayMode.Week ? 7 : 30),
    [displayMode]
  );

  const handleSubstractButton = useCallback(
    () =>
      setDisplayedDate((date) => computeNewDate(date, MathOperation.Substraction, dayToCompute)),
    [setDisplayedDate, dayToCompute]
  );

  const handleTodayButton = useCallback(
    () => setDisplayedDate(() => new Date()),
    [setDisplayedDate]
  );

  const handleAddButton = useCallback(
    () => setDisplayedDate((date) => computeNewDate(date, MathOperation.Addition, dayToCompute)),
    [setDisplayedDate, dayToCompute]
  );

  return (
    <>
      <ControlButton onClick={handleSubstractButton} label="<" />
      <ControlButton onClick={handleTodayButton} label="Today" />
      <ControlButton onClick={handleAddButton} label=">" />
    </>
  );
};

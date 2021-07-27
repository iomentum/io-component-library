import React, { MouseEventHandler, useCallback, useContext } from 'react';
import { Button } from '@material-ui/core';
import { CalendarContext } from '../../contexts/CalendarContext';
import { extendedMoment } from '../../utils';

interface ControlButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const ControlButton = (props: ControlButtonProps) => (
  <Button onClick={props.onClick}>{props.label}</Button>
);

export const DisplayedDateController = () => {
  const { displayMode, setDisplayedDate } = useContext(CalendarContext);

  const handleSubstractButton = useCallback(
    () => setDisplayedDate((date) => extendedMoment(date.subtract(1, displayMode))),
    [setDisplayedDate, displayMode]
  );

  const handleTodayButton = useCallback(
    () => setDisplayedDate(() => extendedMoment()),
    [setDisplayedDate]
  );

  const handleAddButton = useCallback(
    () => setDisplayedDate((date) => extendedMoment(date.add(1, displayMode))),
    [setDisplayedDate, displayMode]
  );

  return (
    <>
      <ControlButton onClick={handleSubstractButton} label="<" />
      <ControlButton onClick={handleTodayButton} label="Today" />
      <ControlButton onClick={handleAddButton} label=">" />
    </>
  );
};

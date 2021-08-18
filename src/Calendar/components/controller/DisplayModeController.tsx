import React, { useContext } from 'react';
import { Checkbox } from '@material-ui/core';
import { CalendarContext } from '../../contexts/CalendarContext';
import { DisplayMode } from '../../types';
import { FormControlLabel } from './DisplayModeController.style';

interface DisplayCheckboxProps {
  displayMode: DisplayMode;
}

export const DisplayCheckbox = (props: DisplayCheckboxProps) => {
  const { displayMode: currentDisplayMode, setDisplayMode } = useContext(CalendarContext);

  return (
    <FormControlLabel
      control={
        <Checkbox
          color="primary"
          onChange={() => setDisplayMode(props.displayMode)}
          checked={currentDisplayMode === props.displayMode}
        />
      }
      label={props.displayMode}
      labelPlacement="start"
    />
  );
};

export const DisplayModeController = () => (
  <div className="tools">
    {Object.entries(DisplayMode).map(([key, value]) => (
      <DisplayCheckbox key={key} displayMode={value} />
    ))}
  </div>
);

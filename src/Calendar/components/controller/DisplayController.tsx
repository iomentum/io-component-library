import React, { useContext } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { CalendarContext } from '../../contexts/CalendarContext';
import { Display } from '../../utils';

interface DisplayCheckboxProps {
  currentKey: Display;
}

export const DisplayCheckbox = (props: DisplayCheckboxProps) => {
  const { displayMode, setDisplayMode } = useContext(CalendarContext);

  return (
    <FormControlLabel
      control={
        <Checkbox
          color="primary"
          onChange={() => setDisplayMode(props.currentKey)}
          checked={displayMode === props.currentKey}
        />
      }
      label={props.currentKey.charAt(0).toUpperCase() + props.currentKey.slice(1)}
      labelPlacement="start"
    />
  );
};

export const DisplayController = () => (
  <div className="tools">
    {Object.entries(Display).map(([key, value]) => (
      <DisplayCheckbox key={key} currentKey={value} />
    ))}
  </div>
);

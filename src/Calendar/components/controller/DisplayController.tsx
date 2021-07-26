import React, { useContext } from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { CalendarContext } from "../../contexts/CalendarContext";
import { Display } from "../../utils";

interface DisplayCheckboxProps {
  currentKey: Display;
}

export const DisplayCheckbox = (props: DisplayCheckboxProps) => {
  const { display, setDisplay } = useContext(CalendarContext);

  return (
    <FormControlLabel
      control={
        <Checkbox
          color="primary"
          onChange={() => setDisplay(props.currentKey)}
          checked={display === props.currentKey}
        />
      }
      label={
        props.currentKey.charAt(0).toUpperCase() + props.currentKey.slice(1)
      }
      labelPlacement="start"
    />
  );
};

export const DisplayController = () => (
  <div className="tools">
    {Object.keys(Display).map((key) => (
      <DisplayCheckbox key={key} currentKey={Display[key]} />
    ))}
  </div>
);

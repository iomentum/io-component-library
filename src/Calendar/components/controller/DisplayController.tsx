import React, { Dispatch, memo, SetStateAction } from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { Display } from "./../../MyCalendar";

interface DisplayCheckboxProps {
  setDisplay: Dispatch<SetStateAction<Display>>;
  display: Display;
  currentDisplay: Display;
}

const DisplayCheckbox = memo((props: DisplayCheckboxProps) => (
  <FormControlLabel
    control={
      <Checkbox
        color="primary"
        onChange={() => props.setDisplay(props.display)}
        checked={props.currentDisplay === props.display}
      />
    }
    label={props.display.charAt(0).toUpperCase() + props.display.slice(1)}
    labelPlacement="start"
  />
));

interface DisplayControllerProps {
  setDisplay: Dispatch<SetStateAction<Display>>;
  display: Display;
}

export const DisplayController = memo((props: DisplayControllerProps) => (
  <div className="tools">
    {Object.keys(Display).map((key) => (
      <DisplayCheckbox
        key={key}
        setDisplay={props.setDisplay}
        currentDisplay={props.display}
        display={Display[key]}
      />
    ))}
  </div>
));

import React, {
  Dispatch,
  memo,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import Dayz from "dayz";
import {
  DateRange,
  extendMoment,
  MomentRangeStaticMethods,
} from "moment-range";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";

import * as m from "moment";
const moment = extendMoment(m);

import "dayz/dist/dayz.css";
import "./MyCalendar.css";
import { CalendarHeader } from "./CalendarHeader";

export enum Display {
  Week = "week",
  Day = "day",
}

export type MomentRange = MomentRangeStaticMethods & m.Moment;

export interface EventsCollection {
  content: string;
  range: DateRange;
}

interface CalendarProps {
  date: MomentRange;
  display: Display;
  events: EventsCollection[];
}

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

export function MyCalendar(props: CalendarProps) {
  const [date, setDate] = useState(props.date);
  const [display, setDisplay] = useState(props.display);

  return (
    <div className="dayz-test-wrapper">
      <CalendarHeader setDate={setDate} date={date} setDisplay={setDisplay} display={display} />
      <Dayz
        date={date}
        events={props.events}
        display={display}
        dayEventHandlers={{ onClick: (y, yo) => console.log(yo) }}
      />
    </div>
  );
}

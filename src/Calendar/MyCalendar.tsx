import React, { useState } from "react";
import Dayz from "dayz";
import { DateRange, MomentRangeStaticMethods } from "moment-range";

import * as m from "moment";

import "dayz/dist/dayz.css";
import "./MyCalendar.css";
import { CalendarHeader } from "./CalendarHeader";
import { EVENTS } from "./buildEvents";

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
  events?: EventsCollection[];
}

export function MyCalendar(props: CalendarProps) {
  const [date, setDate] = useState(props.date);
  const [display, setDisplay] = useState(props.display);

  return (
    <div className="dayz-test-wrapper">
      <CalendarHeader
        setDate={setDate}
        date={date}
        setDisplay={setDisplay}
        display={display}
      />
      <Dayz
        date={date}
        events={props.events || EVENTS}
        display={display}
        dayEventHandlers={{ onClick: (y, yo) => console.log(yo) }}
      />
    </div>
  );
}

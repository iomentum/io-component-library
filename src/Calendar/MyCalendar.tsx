import React, { useState } from "react";
import Dayz from "dayz";
import { DateRange, MomentRangeStaticMethods } from "moment-range";
import { CalendarHeader } from "./CalendarHeader";
import { EVENTS } from "./buildEvents";
import * as m from "moment";

import "dayz/dist/dayz.css";
import "./MyCalendar.css";
import { CreateEvent } from "./CreateEvent";

export enum Display {
  Week = "week",
  Day = "day",
}

export type MomentRange = MomentRangeStaticMethods & m.Moment;

interface Event {
  content: string;
  range: DateRange;
}

export interface EventsCollection {
  events: Event[];
  add: (eventAttrs: any, options?: {}) => void;
}

interface CalendarProps {
  date: MomentRange;
  display: Display;
  events?: EventsCollection;
}

export function MyCalendar(props: CalendarProps) {
  const [date, setDate] = useState(props.date);
  const [display, setDisplay] = useState(props.display);
  const [events, setEvents] = useState(props.events || EVENTS);

  const [createEvent, setCreateEvent] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(date.toDate());

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
        events={events}
        display={display}
        dayEventHandlers={{
          onClick: (_, date) => {
            setCreateEvent(true);
            setSelectedStartDate(date._d);
          },
        }}
      />
      <CreateEvent
        openState={[createEvent, setCreateEvent]}
        eventsState={[events, setEvents]}
        selectedStartDate={selectedStartDate}
      />
    </div>
  );
}

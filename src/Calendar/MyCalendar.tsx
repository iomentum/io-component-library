import React, { useState } from "react";
import Dayz from "dayz";
import { DateRange, MomentRangeStaticMethods } from "moment-range";
import { CalendarHeader } from "./components/CalendarHeader";
import { CreateEvent } from "./components/CreateEvent";
import { findEvent, getDefaultEvent, EVENTS } from "./utils";
import * as m from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(m);

import "dayz/dist/dayz.css";
import "./MyCalendar.css";

export enum Display {
  Week = "week",
  Day = "day",
}

export type MomentRange = MomentRangeStaticMethods & m.Moment;

export interface Event {
  content: string;
  range: () => DateRange;
}

export interface SelectedEvent {
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
  const [currentEvent, setCurrentEvent] = useState(getDefaultEvent(moment()));

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
            setCurrentEvent(getDefaultEvent(moment(date._d)));
          },
        }}
        onEventClick={(_, layout) => {
          const currEvent = findEvent(layout.attributes, events);
          setCurrentEvent(currEvent);
          if (currEvent) {
            setCreateEvent(true);
          }
        }}
      />
      <CreateEvent
        openState={[createEvent, setCreateEvent]}
        eventsState={[events, setEvents]}
        currentEvent={currentEvent}
      />
    </div>
  );
}

import React, { useState } from "react";
import Dayz from "dayz";
import { DateRange, MomentRangeStaticMethods } from "moment-range";
import { CalendarHeader } from "./components/CalendarHeader";
import { EVENTS } from "./buildEvents";
import * as m from "moment";

import "dayz/dist/dayz.css";
import "./MyCalendar.css";
import { CreateEvent } from "./components/modal/CreateEvent";
import { UpdateEvent } from "./components/modal/UpdateEvent";
import { findEvent, getDefaultEvent } from "./utils";

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
  const [updateEvent, setUpdateEvent] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(date.toDate());
  const [selectedEvent, setSelectedEvent] = useState<Event>(getDefaultEvent());

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
        onEventClick={(_, layout) => {
          const currEvent = findEvent(layout.attributes, events);
          setSelectedEvent(currEvent);
          if (currEvent) {
            setUpdateEvent(true);
          }
        }}
      />
      <CreateEvent
        openState={[createEvent, setCreateEvent]}
        eventsState={[events, setEvents]}
        selectedStartDate={selectedStartDate}
      />
      <UpdateEvent
        openState={[updateEvent, setUpdateEvent]}
        eventsState={[events, setEvents]}
        eventToUpdateState={[selectedEvent, setSelectedEvent]}
      />
    </div>
  );
}

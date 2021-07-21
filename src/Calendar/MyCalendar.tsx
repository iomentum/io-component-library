import React, { useCallback, useMemo, useState } from "react";
import Dayz from "dayz";
import { CalendarHeader } from "./components/CalendarHeader";
import { EventManagement } from "./components/EventManagement";
import {
  findEvent,
  getDefaultEvent,
  EVENTS,
  MomentRangeExtended,
  extendedMoment,
  Display,
  EventsCollection,
} from "./utils";

import "dayz/dist/dayz.css";
import "./MyCalendar.css";
import {
  CalendarContext,
  CalendarContextInterface,
} from "./contexts/CalendarContext";
import { EventContext, EventContextInterface } from "./contexts/EventContext";

interface CalendarProps {
  date: MomentRangeExtended;
  display: Display;
  events?: EventsCollection;
}

export function MyCalendar(props: CalendarProps) {
  const [date, setDate] = useState(props.date);
  const [display, setDisplay] = useState(props.display);
  const [eventsCollection, setEventsCollection] = useState(
    props.events || EVENTS
  );
  const [openEventManagement, setOpenEventManagement] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(
    getDefaultEvent(extendedMoment())
  );

  const calendarContextValue = useMemo<CalendarContextInterface>(
    () => ({
      display,
      setDisplay,
      setDate,
      openEventManagement,
      setOpenEventManagement,
    }),
    [display, setDisplay, setDate, openEventManagement, setOpenEventManagement]
  );

  const eventContextValue = useMemo<EventContextInterface>(
    () => ({
      eventsCollection,
      setEventsCollection,
      currentEvent,
    }),
    [eventsCollection, setEventsCollection, currentEvent]
  );

  const handleEventClick = useCallback((_, layout) => {
    setCurrentEvent(findEvent(layout.attributes, eventsCollection));
    setOpenEventManagement(true);
  },[eventsCollection]);

  const handleDayEventClick = useMemo(() => ({
    onClick: (_, date) => {
      setOpenEventManagement(true);
      setCurrentEvent(getDefaultEvent(extendedMoment(date._d)));
    },
  }), []);

  return (
    <CalendarContext.Provider value={calendarContextValue}>
      <EventContext.Provider value={eventContextValue}>
        <CalendarHeader />
        <Dayz
          date={date}
          events={eventsCollection}
          display={display}
          dayEventHandlers={handleDayEventClick}
          onEventClick={handleEventClick}
        />
        <EventManagement />
      </EventContext.Provider>
    </CalendarContext.Provider>
  );
}

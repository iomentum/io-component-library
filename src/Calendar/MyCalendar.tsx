import React, { useCallback, useMemo, useState } from 'react';
import Dayz from 'dayz';
import { CalendarHeader } from './components/CalendarHeader';
import { EventManagement } from './components/EventManagement';
import {
  findEvent,
  getDefaultEvent,
  EVENTS,
  MomentRangeExtended,
  extendedMoment,
  Display,
  EventsCollection,
} from './utils';

import 'dayz/dist/dayz.css';
import './MyCalendar.css';
import { CalendarContext, CalendarContextInterface } from './contexts/CalendarContext';
import { EventContext, EventContextInterface } from './contexts/EventContext';

export interface CalendarProps {
  date: MomentRangeExtended;
  display: Display;
  events?: EventsCollection;
}

export function MyCalendar(props: CalendarProps) {
  const [date, setDate] = useState(props.date);
  const [display, setDisplay] = useState(props.display);
  const [eventsCollection, setEventsCollection] = useState(props.events || EVENTS);
  const [openEventManagement, setOpenEventManagement] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(getDefaultEvent(extendedMoment()));

  const calendarContextValue = useMemo<CalendarContextInterface>(
    () => ({
      display,
      setDisplay,
      setDate,
    }),
    [display, setDisplay, setDate]
  );

  const eventContextValue = useMemo<EventContextInterface>(
    () => ({
      eventsCollection,
      setEventsCollection,
      currentEvent,
      openEventManagement,
      setOpenEventManagement,
    }),
    [
      eventsCollection,
      setEventsCollection,
      currentEvent,
      openEventManagement,
      setOpenEventManagement,
    ]
  );

  const handleEventClick = useCallback(
    (_, layout) => {
      setCurrentEvent(findEvent(layout.attributes, eventsCollection));
      setOpenEventManagement(true);
    },
    [eventsCollection]
  );

  const handleDayEventClick = useMemo(
    () => ({
      onClick: (_, eventDate) => {
        setOpenEventManagement(true);
        // eslint-disable-next-line no-underscore-dangle
        setCurrentEvent(getDefaultEvent(extendedMoment(eventDate._d)));
      },
    }),
    []
  );

  return (
    <>
      <CalendarContext.Provider value={calendarContextValue}>
        <CalendarHeader />
      </CalendarContext.Provider>
      <EventContext.Provider value={eventContextValue}>
        <Dayz
          date={date}
          events={eventsCollection}
          display={display}
          dayEventHandlers={handleDayEventClick}
          onEventClick={handleEventClick}
        />
        <EventManagement />
      </EventContext.Provider>
    </>
  );
}

MyCalendar.defaultProps = {
  events: null,
};

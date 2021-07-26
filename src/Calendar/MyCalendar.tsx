import React, { useMemo, useState } from 'react';
import { CalendarHeader } from './components/CalendarHeader';
import { EventManagement } from './components/EventManagement';
import {
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
import { DayzWrapper } from './components/DayzWrapper';

export interface CalendarProps {
  date: MomentRangeExtended;
  display: Display;
  events?: EventsCollection;
}

export function MyCalendar(props: CalendarProps) {
  const [date, setDate] = useState(props.date);
  const [display, setDisplay] = useState(props.display);
  const [eventsCollection, setEventsCollection] = useState(props.events);
  const [eventManagementOpened, setEventManagementOpened] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(getDefaultEvent(extendedMoment()));

  const calendarContextValue = useMemo<CalendarContextInterface>(
    () => ({
      display,
      setDisplay,
      date,
      setDate,
    }),
    [display, date]
  );

  const eventContextValue = useMemo<EventContextInterface>(
    () => ({
      eventsCollection,
      setEventsCollection,
      currentEvent,
      setCurrentEvent,
      eventManagementOpened,
      setEventManagementOpened,
    }),
    [eventsCollection, currentEvent, eventManagementOpened]
  );

  return (
    <>
      <CalendarContext.Provider value={calendarContextValue}>
        <CalendarHeader />
        <EventContext.Provider value={eventContextValue}>
          <DayzWrapper />
          <EventManagement />
        </EventContext.Provider>
      </CalendarContext.Provider>
    </>
  );
}

MyCalendar.defaultProps = {
  events: EVENTS,
};

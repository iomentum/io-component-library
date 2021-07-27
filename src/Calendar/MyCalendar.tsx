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
  displayedDate: MomentRangeExtended;
  displayMode: Display;
  events?: EventsCollection;
}

export function MyCalendar(props: CalendarProps) {
  const [displayedDate, setDisplayedDate] = useState(props.displayedDate);
  const [displayMode, setDisplayMode] = useState(props.displayMode);
  const [eventsCollection, setEventsCollection] = useState(props.events);
  const [eventManagementOpened, setEventManagementOpened] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(getDefaultEvent(extendedMoment()));

  const calendarContextValue = useMemo<CalendarContextInterface>(
    () => ({
      displayMode,
      setDisplayMode,
      displayedDate,
      setDisplayedDate,
    }),
    [displayMode, displayedDate]
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

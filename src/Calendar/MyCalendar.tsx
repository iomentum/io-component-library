import React, { useMemo, useState } from 'react';
import { CalendarHeader } from './components/CalendarHeader';
import { EventManagement } from './components/EventManagement';
import { DisplayMode, WeekStartsOn, MyCalendarEvent } from './types';

import 'dayz/dist/dayz.css';
import './MyCalendar.css';
import { CalendarContext, CalendarContextInterface } from './contexts/CalendarContext';
import { EventContext, EventContextInterface } from './contexts/EventContext';
import { DayzWrapper } from './components/DayzWrapper';
import { createDefaultMyCalendarEvent } from './utils/eventUtils';

interface MyCalendarOptions {
  displayMode: DisplayMode;
  displayedHours: [number, number];
  timeFormat: string;
  locale: string;
  weekStartsOn: WeekStartsOn;
}

export interface MyCalendarProps {
  displayedDate: Date;
  events: MyCalendarEvent[];
  onCreate: (event: MyCalendarEvent) => MyCalendarEvent[];
  onUpdate: (event: MyCalendarEvent) => MyCalendarEvent[];
  onDelete: (event: MyCalendarEvent) => MyCalendarEvent[];
  options: MyCalendarOptions;
}

export function MyCalendar(props: MyCalendarProps) {
  const [displayedDate, setDisplayedDate] = useState(props.displayedDate);
  const [displayMode, setDisplayMode] = useState(props.options.displayMode);
  const [eventsCollection, setEventsCollection] = useState(props.events);
  const [eventManagementOpened, setEventManagementOpened] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(createDefaultMyCalendarEvent(displayedDate));

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
    <CalendarContext.Provider value={calendarContextValue}>
      <CalendarHeader />
      <EventContext.Provider value={eventContextValue}>
        <DayzWrapper />
        <EventManagement />
      </EventContext.Provider>
    </CalendarContext.Provider>
  );
}

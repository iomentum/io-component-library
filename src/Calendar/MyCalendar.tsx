import React, { useMemo, useReducer, useState } from 'react';
import { CalendarHeader } from './components/CalendarHeader';
import { DayzWrapper } from './components/DayzWrapper';
import { EventManagement } from './components/EventManagement';
import { CalendarContext, CalendarContextInterface } from './contexts/CalendarContext';
import { EventContext, EventContextInterface } from './contexts/EventContext';
import { Event, eventReducer } from './reducers/EventReducer';
import { createDefaultEvent } from './utils/eventUtils';
import { DisplayMode, WeekStartsOn } from './types';

import 'dayz/dist/dayz.css';
import './MyCalendar.css';

type HandleEvent = (event: Event) => Event[];

interface MyCalendarOptions {
  displayMode: DisplayMode;
  displayedHours: [number, number];
  timeFormat: string;
  locale: string;
  weekStartsOn: WeekStartsOn;
}

export interface MyCalendarProps {
  displayedDate: Date;
  events: Event[];
  onCreate: HandleEvent;
  onUpdate: HandleEvent;
  onDelete: HandleEvent;
  options: MyCalendarOptions;
}

export function MyCalendar(props: MyCalendarProps) {
  const [displayedDate, setDisplayedDate] = useState(props.displayedDate);
  const [displayMode, setDisplayMode] = useState(props.options.displayMode);
  const [eventsCollection, setEventsCollection] = useState(props.events);
  const [eventManagementOpened, setEventManagementOpened] = useState(false);

  const defaultEvent = useMemo(() => createDefaultEvent(displayedDate), [displayedDate]);

  const [event, dispatchEvent] = useReducer(eventReducer, defaultEvent);

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
      eventManagementOpened,
      setEventManagementOpened,
      event,
      dispatchEvent,
    }),
    [eventsCollection, eventManagementOpened, event]
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

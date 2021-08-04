import React, { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import Dayz from 'dayz';
import { TextField } from './EventManagement.style';
import {
  DayzEventsCollection,
  formatDateAndHour,
  computeIsFullDayEvent,
  convertEventIntoDayzEvent,
} from '../utils';
import { SideModal } from './SideModal';
import { DurationSelector } from './selector/DurationSelector';
import { eventReducer, EventType } from '../reducers/EventReducer';
import { EventContext } from '../contexts/EventContext';
import { EventManagementContext } from '../contexts/EventManagementContext';
import { DateSelector, DateType } from './selector/DateSelector';
import {
  createEvent,
  deleteEvent,
  isEventExisting as isEventExistingFunction,
} from '../utils/eventUtils';

export function EventManagement() {
  const { eventsCollection, setEventsCollection, currentEvent } = useContext(EventContext);

  const [isFullDayEvent, setIsFullDayEvent] = useState(
    computeIsFullDayEvent(currentEvent.dateRange)
  );

  const [displayStartDate, startHour] = useCallback(
    () => formatDateAndHour(currentEvent.dateRange.eventStart),
    [currentEvent]
  )();

  const [displayEndDate, endHour] = useCallback(
    () => formatDateAndHour(currentEvent.dateRange.eventEnd),
    [currentEvent]
  )();

  const [event, dispatchEvent] = useReducer(eventReducer, {
    content: currentEvent.content,
    startDate: currentEvent.dateRange.eventStart,
    displayStartDate,
    endDate: currentEvent.dateRange.eventEnd,
    displayEndDate,
    startHour,
    endHour,
  });

  const eventManagementContextValue = useMemo<EventManagementContext>(
    () => ({
      isFullDayEvent,
      setIsFullDayEvent,
      event,
      dispatchEvent,
    }),
    [isFullDayEvent, event]
  );

  const isEventExisting = useMemo(
    () => isEventExistingFunction(eventsCollection, currentEvent),
    [eventsCollection, currentEvent]
  );

  useEffect(
    () =>
      dispatchEvent({
        type: EventType.Reset,
        content: currentEvent.content || '',
        startDate: currentEvent.dateRange.eventStart,
        displayStartDate,
        endDate: currentEvent.dateRange.eventEnd,
        displayEndDate,
        startHour,
        endHour,
      }),
    [currentEvent]
  );

  const handleSaveEvent = useCallback(() => {
    if (isEventExisting) {
      deleteEvent(eventsCollection, currentEvent);
    }

    const newEvents: DayzEventsCollection = new Dayz.EventsCollection([...eventsCollection.events]);
    const newDayzEvent = convertEventIntoDayzEvent(createEvent(event, isFullDayEvent));

    newEvents.add({ content: newDayzEvent.content, range: newDayzEvent.range() });
    setEventsCollection(newEvents);
  }, [eventsCollection, currentEvent, isEventExisting, event, isFullDayEvent]);

  const handleDeleteEvent = useCallback(
    () => deleteEvent(eventsCollection, currentEvent),
    [currentEvent, eventsCollection]
  );

  const handleTitleChange = useCallback(
    (nativeEvent) =>
      dispatchEvent({
        type: EventType.UpdateContent,
        content: nativeEvent.target.value,
      }),
    []
  );

  return (
    <SideModal
      onSave={handleSaveEvent}
      onDelete={handleDeleteEvent}
      isEventExisting={isEventExisting}>
      <TextField fullWidth label="Add a title" value={event.content} onChange={handleTitleChange} />
      <EventManagementContext.Provider value={eventManagementContextValue}>
        <DateSelector dateType={DateType.Start} />
        <DurationSelector />
      </EventManagementContext.Provider>
    </SideModal>
  );
}

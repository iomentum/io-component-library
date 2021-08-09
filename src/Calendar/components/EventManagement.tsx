import React, { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { TextField } from './EventManagement.style';
import { formatDateAndHour } from '../utils/dateUtils';
import { SideModal } from './SideModal';
import { DurationSelector } from './selector/DurationSelector';
import { eventReducer, EventType } from '../reducers/EventReducer';
import { EventContext } from '../contexts/EventContext';
import { EventManagementContext } from '../contexts/EventManagementContext';
import { DateSelector, DateType } from './selector/DateSelector';
import { createEvent, getMyCalendarEventIndex, updateEvent } from '../utils/eventUtils';

export function EventManagement() {
  const { eventsCollection, setEventsCollection, currentEvent } = useContext(EventContext);

  const [isFullDayEvent, setIsFullDayEvent] = useState(true);

  const [displayStartDate, startHour] = useCallback(
    () => formatDateAndHour(currentEvent.startDate),
    [currentEvent]
  )();

  const [displayEndDate, endHour] = useCallback(
    () => formatDateAndHour(currentEvent.endDate),
    [currentEvent]
  )();

  const [event, dispatchEvent] = useReducer(eventReducer, {
    content: currentEvent.title,
    startDate: currentEvent.startDate,
    displayStartDate,
    endDate: currentEvent.endDate,
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
    () => getMyCalendarEventIndex(currentEvent, eventsCollection) !== -1,
    [eventsCollection, currentEvent]
  );

  console.log(isEventExisting, getMyCalendarEventIndex(currentEvent, eventsCollection));

  useEffect(
    () =>
      dispatchEvent({
        type: EventType.Reset,
        content: currentEvent.title || '',
        startDate: currentEvent.startDate,
        displayStartDate,
        endDate: currentEvent.endDate,
        displayEndDate,
        startHour,
        endHour,
      }),
    [currentEvent]
  );

  const handleSaveEvent = useCallback(() => {
    if (isEventExisting) {
      const updatedEvent = updateEvent(event, currentEvent);
      setEventsCollection((prevEvents) => {
        const newEventsCollection = [...prevEvents];
        newEventsCollection[getMyCalendarEventIndex(updatedEvent, prevEvents)] = updatedEvent;
        return newEventsCollection;
      });
    } else {
      setEventsCollection((prevEvents) => [...prevEvents, createEvent(event)]);
    }
  }, [currentEvent, isEventExisting, event]);

  const handleDeleteEvent = useCallback(
    () =>
      setEventsCollection((prevEvents) => {
        const newEventsCollection = [...prevEvents];
        newEventsCollection.splice(getMyCalendarEventIndex(currentEvent, prevEvents), 1);
        return newEventsCollection;
      }),
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

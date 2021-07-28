import React, { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import Dayz from 'dayz';
import { TextField } from '@material-ui/core';
import { extendedMoment, EventsCollection, formatDateAndHour } from '../utils';
import { SideModal } from './SideModal';
import { DurationSelector } from './selector/DurationSelector';
import { eventReducer, EventType } from '../reducers/EventReducer';
import { EventContext } from '../contexts/EventContext';
import { EventManagementContext } from '../contexts/EventManagementContext';

export function EventManagement() {
  const { eventsCollection, setEventsCollection, currentEvent } = useContext(EventContext);

  const [fullDayEvent, setFullDayEvent] = useState(
    extendedMoment.range(currentEvent.range().start, currentEvent.range().end).diff('days') >= 1
  );

  const [displayStartDate, startHour] = useCallback(
    () => formatDateAndHour(currentEvent.range().start),
    [currentEvent]
  )();

  const [displayEndDate, endHour] = useCallback(
    () => formatDateAndHour(currentEvent.range().end),
    [currentEvent]
  )();

  const [event, dispatchEvent] = useReducer(eventReducer, {
    content: currentEvent.content,
    startDate: currentEvent.range().start.toDate(),
    displayStartDate,
    endDate: currentEvent.range().end.toDate(),
    displayEndDate,
    startHour,
    endHour,
  });

  const eventManagementContextValue = useMemo<EventManagementContext>(
    () => ({
      fullDayEvent,
      setFullDayEvent,
      event,
      dispatchEvent,
    }),
    [fullDayEvent, event]
  );

  useEffect(
    () =>
      dispatchEvent({
        type: EventType.Reset,
        content: currentEvent.content || '',
        startDate: currentEvent.range().start.toDate(),
        displayStartDate,
        endDate: currentEvent.range().end.toDate(),
        displayEndDate,
        startHour,
        endHour,
      }),
    [currentEvent, startHour, endHour, displayEndDate, displayStartDate]
  );

  const handleSaveEvent = useCallback(() => {
    const currEventIndex = eventsCollection.events.findIndex(
      (evnt) => evnt.content === currentEvent.content && evnt.range().isSame(currentEvent.range())
    );
    if (currEventIndex !== -1) {
      eventsCollection.events.splice(currEventIndex, 1);
    }

    const newEvents: EventsCollection = new Dayz.EventsCollection([...eventsCollection.events]);
    const [newEventStartHour, newEventStartMinutes] = event.startHour.split(':');
    const [newEventEndHour, newEventEndMinutes] = event.endHour.split(':');

    newEvents.add({
      content: event.content,
      range: extendedMoment.range(
        extendedMoment(event.startDate)
          .hour(+newEventStartHour)
          .minutes(+newEventStartMinutes),
        fullDayEvent
          ? extendedMoment(event.endDate).endOf('day')
          : extendedMoment(event.startDate)
              .hour(+newEventEndHour)
              .minutes(+newEventEndMinutes)
      ),
    });
    setEventsCollection(newEvents);
  }, [eventsCollection, setEventsCollection, currentEvent, event, fullDayEvent]);

  const handleTitleChange = useCallback(
    (nativeEvent) =>
      dispatchEvent({
        type: EventType.UpdateContent,
        content: nativeEvent.target.value,
      }),
    []
  );

  const handleDateChange = useCallback(
    (nativeEvent) =>
      dispatchEvent({
        type: EventType.UpdateStartDate,
        startDate: nativeEvent.target.value ? new Date(nativeEvent.target.value) : new Date(),
      }),
    []
  );

  return (
    <SideModal onSave={handleSaveEvent}>
      <TextField fullWidth label="Add a title" value={event.content} onChange={handleTitleChange} />
      <TextField type="date" value={event.displayStartDate} onChange={handleDateChange} />
      <EventManagementContext.Provider value={eventManagementContextValue}>
        <DurationSelector />
      </EventManagementContext.Provider>
    </SideModal>
  );
}

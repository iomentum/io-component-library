import React, { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import Dayz from 'dayz';
import { TextField } from '@material-ui/core';
import { extendedMoment, EventsCollection, formatDateAndHour, dateDiff } from '../utils';
import { SideModal } from './SideModal';
import { DurationSelector } from './selector/DurationSelector';
import { eventReducer, EventType } from '../reducers/EventReducer';
import { EventContext } from '../contexts/EventContext';
import { EventManagementContext } from '../contexts/EventManagementContext';
import { DateSelector, DateType } from './selector/DateSelector';

export function EventManagement() {
  const { eventsCollection, setEventsCollection, currentEvent } = useContext(EventContext);

  const [isFullDayEvent, setIsFullDayEvent] = useState(dateDiff(currentEvent.dateRange));

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
        isFullDayEvent
          ? extendedMoment(event.endDate).endOf('day')
          : extendedMoment(event.startDate)
              .hour(+newEventEndHour)
              .minutes(+newEventEndMinutes)
      ),
    });
    setEventsCollection(newEvents);
  }, [eventsCollection, setEventsCollection, currentEvent, event, isFullDayEvent]);

  const handleTitleChange = useCallback(
    (nativeEvent) =>
      dispatchEvent({
        type: EventType.UpdateContent,
        content: nativeEvent.target.value,
      }),
    []
  );

  return (
    <SideModal onSave={handleSaveEvent}>
      <TextField fullWidth label="Add a title" value={event.content} onChange={handleTitleChange} />
      <EventManagementContext.Provider value={eventManagementContextValue}>
        <DateSelector dateType={DateType.Start} />
        <DurationSelector />
      </EventManagementContext.Provider>
    </SideModal>
  );
}

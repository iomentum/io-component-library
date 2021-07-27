import React, { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import Dayz from 'dayz';
import { TextField } from '@material-ui/core';
import { hours, getHours, extendedMoment, EventsCollection } from '../utils';
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

  const startHour = useCallback(
    () => getHours(currentEvent.range().start.toDate()),
    [currentEvent]
  )();

  const [event, dispatchEvent] = useReducer(eventReducer, {
    content: currentEvent.content,
    startDate: currentEvent.range().start.toDate(),
    displayStartDate: currentEvent.range().start.toDate().toISOString().replace(/T.*/, ''),
    endDate: currentEvent.range().end.toDate(),
    displayEndDate: currentEvent.range().end.toDate().toISOString().replace(/T.*/, ''),
    startHour,
    endHour: hours[hours.indexOf(startHour) + 4],
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
        displayStartDate: currentEvent.range().start.toDate().toISOString().replace(/T.*/, ''),
        endDate: currentEvent.range().end.toDate(),
        displayEndDate: currentEvent.range().end.toDate().toISOString().replace(/T.*/, ''),
        startHour,
        endHour: hours[hours.indexOf(startHour) + 4],
      }),
    [currentEvent, startHour]
  );

  useEffect(() => {
    if (event.startDate > event.endDate) {
      dispatchEvent({
        type: EventType.UpdateEndDate,
        endDate: new Date(event.startDate.setHours(event.startDate.getHours() + 1)),
      });
      dispatchEvent({
        type: EventType.UpdateStartDate,
        startDate: new Date(event.endDate.setHours(event.endDate.getHours() - 1)),
      });
    }
  }, [event.startDate, event.endDate]);

  useEffect(() => {
    if (hours.indexOf(event.startHour) + 4 > hours.length - 1) {
      dispatchEvent({
        type: EventType.UpdateEndHour,
        endHour: hours[hours.length - 1],
      });
    } else {
      dispatchEvent({
        type: EventType.UpdateEndHour,
        endHour: hours[hours.indexOf(event.startHour) + 4],
      });
    }
  }, [event.startHour]);

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

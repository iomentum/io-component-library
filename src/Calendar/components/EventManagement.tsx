import React, { useCallback, useContext, useMemo, useState } from 'react';
import { TextField } from './EventManagement.style';
import { SideModal } from './SideModal';
import { DurationSelector } from './selector/DurationSelector';
import { EventType } from '../reducers/EventReducer';
import { EventContext } from '../contexts/EventContext';
import { EventManagementContext } from '../contexts/EventManagementContext';
import { DateSelector, DateType } from './selector/DateSelector';
import { getEventIndex } from '../utils/eventUtils';

export function EventManagement() {
  const { eventsCollection, setEventsCollection, event, dispatchEvent } = useContext(EventContext);

  const [isFullDayEvent, setIsFullDayEvent] = useState(true);

  const eventManagementContextValue = useMemo<EventManagementContext>(
    () => ({
      isFullDayEvent,
      setIsFullDayEvent,
    }),
    [isFullDayEvent]
  );

  const isEventExisting = useMemo(
    () => getEventIndex(event, eventsCollection) !== -1,
    [eventsCollection, event]
  );

  const handleSaveEvent = useCallback(() => {
    if (isEventExisting) {
      const updatedEvent = event;

      setEventsCollection((prevEvents) => {
        const newEventsCollection = [...prevEvents];
        newEventsCollection[getEventIndex(updatedEvent, prevEvents)] = updatedEvent;
        return newEventsCollection;
      });
    } else {
      setEventsCollection((prevEvents) => [...prevEvents, event]);
    }
  }, [isEventExisting, event]);

  const handleDeleteEvent = useCallback(
    () =>
      setEventsCollection((prevEvents) => {
        const newEventsCollection = [...prevEvents];
        newEventsCollection.splice(getEventIndex(event, prevEvents), 1);
        return newEventsCollection;
      }),
    [event]
  );

  const handleTitleChange = useCallback(
    (nativeEvent) =>
      dispatchEvent({
        type: EventType.UpdateTitle,
        title: nativeEvent.target.value,
      }),
    []
  );

  return (
    <SideModal
      onSave={handleSaveEvent}
      onDelete={handleDeleteEvent}
      isEventExisting={isEventExisting}>
      <TextField
        fullWidth
        label="Add a title"
        value={event.title}
        onChange={handleTitleChange}
        inputProps={{
          'data-testid': 'addTitle',
        }}
      />
      <EventManagementContext.Provider value={eventManagementContextValue}>
        <DateSelector dateType={DateType.Start} />
        <DurationSelector />
      </EventManagementContext.Provider>
    </SideModal>
  );
}

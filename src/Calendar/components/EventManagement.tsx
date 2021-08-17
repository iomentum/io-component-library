import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Button } from '@material-ui/core';
import { TextField } from './EventManagement.style';
import { SideModal } from './SideModal';
import { DurationSelector } from './selector/DurationSelector';
import { EventType } from '../reducers/EventReducer';
import { EventContext } from '../contexts/EventContext';
import { EventManagementContext } from '../contexts/EventManagementContext';
import { DateSelector, DateType } from './selector/DateSelector';
import { getEventIndex } from '../utils/eventUtils';
import { PrimaryButton } from './SideModal.style';
import { Gap, Row } from './common.style';

export function EventManagement() {
  const { eventsCollection, setEventsCollection, event, dispatchEvent } = useContext(EventContext);
  const { setEventManagementOpened } = useContext(EventContext);

  const [isFullDayEvent, setIsFullDayEvent] = useState(true);

  const eventManagementContextValue = useMemo<EventManagementContext>(
    () => ({
      isFullDayEvent,
      setIsFullDayEvent,
    }),
    [isFullDayEvent]
  );

  const hasEvent = useMemo(
    () => getEventIndex(event, eventsCollection) !== -1,
    [eventsCollection, event]
  );

  const handleSaveEvent = useCallback(() => {
    if (hasEvent) {
      const updatedEvent = event;

      setEventsCollection((prevEvents) => {
        const newEventsCollection = [...prevEvents];
        newEventsCollection[getEventIndex(updatedEvent, prevEvents)] = updatedEvent;
        return newEventsCollection;
      });
    } else {
      setEventsCollection((prevEvents) => [...prevEvents, event]);
    }
    setEventManagementOpened(false);
  }, [hasEvent, event]);

  const handleDeleteEvent = useCallback(() => {
    setEventsCollection((prevEvents) => {
      const newEventsCollection = [...prevEvents];
      newEventsCollection.splice(getEventIndex(event, prevEvents), 1);
      return newEventsCollection;
    });
    setEventManagementOpened(false);
  }, [event]);

  const handleTitleChange = useCallback(
    (nativeEvent) =>
      dispatchEvent({
        type: EventType.UpdateTitle,
        title: nativeEvent.target.value,
      }),
    []
  );

  return (
    <SideModal>
      <div>
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
      </div>
      <Row>
        <PrimaryButton variant="contained" color="primary" onClick={handleSaveEvent}>
          Save
        </PrimaryButton>
        {hasEvent && (
          <>
            <Gap />
            <Button variant="contained" color="secondary" onClick={handleDeleteEvent}>
              Delete
            </Button>
          </>
        )}
      </Row>
    </SideModal>
  );
}

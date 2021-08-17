import React, { useCallback, useContext, useMemo } from 'react';
import Dayz from 'dayz';
import { DayzBox } from './DayzWrapper.style';
import { CalendarContext } from '../contexts/CalendarContext';
import { EventContext } from '../contexts/EventContext';
import {
  findEvent,
  convertEventsIntoDayzEventsCollection,
  createDefaultEvent,
} from '../utils/eventUtils';
import { createExtendedMomentFromDate, createDateFromMoment } from '../utils/momentUtils';
import { Event, EventType } from '../reducers/EventReducer';

export const DayzWrapper = () => {
  const { displayedDate, displayMode } = useContext(CalendarContext);
  const { eventsCollection, setEventManagementOpened, dispatchEvent } = useContext(EventContext);

  const displayedDayzDate = useMemo(
    () => createExtendedMomentFromDate(displayedDate),
    [displayedDate]
  );

  const dayzEventsCollection = useMemo(
    () => convertEventsIntoDayzEventsCollection(eventsCollection),
    [eventsCollection]
  );

  const handleCommonBehavior = useCallback((event: Event) => {
    const { uuid, title, startDate, endDate, startHour, endHour, metadata } = event;

    dispatchEvent({
      type: EventType.UpdateEvent,
      uuid,
      title,
      startDate,
      endDate,
      startHour,
      endHour,
      metadata,
    });
    setEventManagementOpened(true);
  }, []);

  const handleEventClick = useCallback(
    (_, layout) => handleCommonBehavior(findEvent(layout.attributes, eventsCollection)),
    [eventsCollection]
  );

  const handleDayEventClick = useMemo(
    () => ({
      onClick: (_, eventDate) =>
        handleCommonBehavior(createDefaultEvent(createDateFromMoment(eventDate))),
    }),
    []
  );

  return (
    <DayzBox>
      <Dayz
        date={displayedDayzDate}
        events={dayzEventsCollection}
        display={displayMode}
        displayHours={[0, 24]}
        timeFormat="HH:mm"
        dayEventHandlers={handleDayEventClick}
        onEventClick={handleEventClick}
      />
    </DayzBox>
  );
};

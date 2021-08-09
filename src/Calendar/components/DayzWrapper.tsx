import React, { useCallback, useContext, useMemo } from 'react';
import Dayz from 'dayz';
import { DayzBox } from './DayzWrapper.style';
import { CalendarContext } from '../contexts/CalendarContext';
import { EventContext } from '../contexts/EventContext';
import {
  findEvent,
  convertMyCalendarEventsIntoDayzEventsCollection,
  createDefaultMyCalendarEvent,
} from '../utils/eventUtils';
import { createExtendedMomentFromDate, createDateFromMoment } from '../utils/momentUtils';

export const DayzWrapper = () => {
  const { displayedDate, displayMode } = useContext(CalendarContext);
  const { eventsCollection, setCurrentEvent, setEventManagementOpened } = useContext(EventContext);

  const displayedDayzDate = useMemo(
    () => createExtendedMomentFromDate(displayedDate),
    [displayedDate]
  );

  const dayzEventsCollection = useMemo(
    () => convertMyCalendarEventsIntoDayzEventsCollection(eventsCollection),
    [eventsCollection]
  );

  const handleEventClick = useCallback(
    (_, layout) => {
      setCurrentEvent(findEvent(layout.attributes, eventsCollection));
      setEventManagementOpened(true);
    },
    [dayzEventsCollection]
  );

  const handleDayEventClick = useMemo(
    () => ({
      onClick: (_, eventDate) => {
        setCurrentEvent(createDefaultMyCalendarEvent(createDateFromMoment(eventDate)));
        setEventManagementOpened(true);
      },
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

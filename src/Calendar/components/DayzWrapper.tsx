import React, { useCallback, useContext, useMemo } from 'react';
import Dayz from 'dayz';
import { DayzBox } from './DayzWrapper.style';
import { CalendarContext } from '../contexts/CalendarContext';
import { EventContext } from '../contexts/EventContext';
import { findEvent, createEvent, createExtendedMomentFromDate } from '../utils';

export const DayzWrapper = () => {
  const { displayedDate, displayMode } = useContext(CalendarContext);
  const { eventsCollection, setCurrentEvent, setEventManagementOpened } = useContext(EventContext);

  const displayedDayzDate = useMemo(
    () => createExtendedMomentFromDate(displayedDate),
    [displayedDate]
  );

  const handleEventClick = useCallback(
    (_, layout) => {
      setCurrentEvent(findEvent(layout.attributes, eventsCollection));
      setEventManagementOpened(true);
    },
    [eventsCollection, setCurrentEvent, setEventManagementOpened]
  );

  const handleDayEventClick = useMemo(
    () => ({
      onClick: (_, eventDate) => {
        setEventManagementOpened(true);
        // eslint-disable-next-line no-underscore-dangle
        setCurrentEvent(createEvent(eventDate._d));
      },
    }),
    [setCurrentEvent, setEventManagementOpened]
  );

  return (
    <DayzBox>
      <Dayz
        date={displayedDayzDate}
        events={eventsCollection}
        display={displayMode}
        displayHours={[0, 24]}
        timeFormat="HH:mm"
        dayEventHandlers={handleDayEventClick}
        onEventClick={handleEventClick}
      />
    </DayzBox>
  );
};

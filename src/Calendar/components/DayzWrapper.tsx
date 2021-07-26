import React, { useCallback, useContext, useMemo } from 'react';
import Dayz from 'dayz';
import { CalendarContext } from '../contexts/CalendarContext';
import { EventContext } from '../contexts/EventContext';
import { findEvent, getDefaultEvent, extendedMoment } from '../utils';

export const DayzWrapper = () => {
  const { date, display } = useContext(CalendarContext);
  const { eventsCollection, setCurrentEvent, setEventManagementOpened } = useContext(EventContext);

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
        setCurrentEvent(getDefaultEvent(extendedMoment(eventDate._d)));
      },
    }),
    [setCurrentEvent, setEventManagementOpened]
  );

  return (
    <Dayz
      date={date}
      events={eventsCollection}
      display={display}
      dayEventHandlers={handleDayEventClick}
      onEventClick={handleEventClick}
    />
  );
};

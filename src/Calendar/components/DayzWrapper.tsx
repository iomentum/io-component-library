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
import { EventType } from '../reducers/EventReducer';
import { formatDateAndHour } from '../utils/dateUtils';

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

  const handleEventClick = useCallback(
    (_, layout) => {
      const { uuid, title, startDate, endDate, metadata } = findEvent(
        layout.attributes,
        eventsCollection
      );
      const [, startHour] = formatDateAndHour(startDate);
      const [, endHour] = formatDateAndHour(endDate);

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
    },
    [eventsCollection]
  );

  const handleDayEventClick = useMemo(
    () => ({
      onClick: (_, eventDate) => {
        const { uuid, title, startDate, endDate, metadata } = createDefaultEvent(
          createDateFromMoment(eventDate)
        );
        const [, startHour] = formatDateAndHour(startDate);
        const [, endHour] = formatDateAndHour(endDate);

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

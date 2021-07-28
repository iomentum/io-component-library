import React, { useContext, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { EventManagementContext } from '../../contexts/EventManagementContext';
import { EventType } from '../../reducers/EventReducer';

export const HourSelector = () => {
  const { event, dispatchEvent } = useContext(EventManagementContext);

  useEffect(() => {
    if (event.endHour < '01:00') {
      dispatchEvent({
        type: EventType.UpdateStartHour,
        startHour: '00:00',
      });
    } else if (event.startHour > event.endHour) {
      const [tensHour, unitHour, separator, tensMinut, unitMinute] = event.endHour.split('');
      dispatchEvent({
        type: EventType.UpdateStartHour,
        startHour: `${tensHour}${+unitHour - 1}${separator}${tensMinut}${unitMinute}`,
      });
    }
  }, [event.endHour]);

  useEffect(() => {
    if (event.startHour > '23:00') {
      dispatchEvent({
        type: EventType.UpdateEndHour,
        endHour: '23:59',
      });
    } else if (event.startHour > event.endHour) {
      const [tensHour, unitHour, separator, tensMinut, unitMinute] = event.startHour.split('');
      dispatchEvent({
        type: EventType.UpdateEndHour,
        endHour: `${tensHour}${+unitHour + 1}${separator}${tensMinut}${unitMinute}`,
      });
    }
  }, [event.startHour]);

  return (
    <>
      <TextField
        label="Start"
        type="time"
        value={event.startHour}
        onChange={(onChangeEvent) =>
          dispatchEvent({
            type: EventType.UpdateStartHour,
            startHour: onChangeEvent.target.value as string,
          })
        }
      />
      <TextField
        label="End"
        type="time"
        value={event.endHour}
        onChange={(onChangeEvent) =>
          dispatchEvent({
            type: EventType.UpdateEndHour,
            endHour: onChangeEvent.target.value as string,
          })
        }
      />
    </>
  );
};

import React, { Dispatch, useContext, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { EventManagementContext } from '../../contexts/EventManagementContext';
import { EventAction, EventType } from '../../reducers/EventReducer';

export const computeStartHourChanges = (
  startHour: string,
  endHour: string,
  dispatchEvent: Dispatch<EventAction>
) => {
  if (startHour > endHour) {
    if (startHour > '23:00') {
      dispatchEvent({
        type: EventType.UpdateEndHour,
        endHour: '23:59',
      });
    } else {
      const [tensHour, unitHour, separator, tensMinut, unitMinute] = startHour.split('');
      dispatchEvent({
        type: EventType.UpdateEndHour,
        endHour: `${tensHour}${+unitHour + 1}${separator}${tensMinut}${unitMinute}`,
      });
    }
  }
};

export const computeEndHourChanges = (
  startHour: string,
  endHour: string,
  dispatchEvent: Dispatch<EventAction>
) => {
  if (startHour > endHour) {
    if (endHour < '01:00') {
      dispatchEvent({
        type: EventType.UpdateStartHour,
        startHour: '00:00',
      });
    } else {
      const [tensHour, unitHour, separator, tensMinut, unitMinute] = endHour.split('');
      dispatchEvent({
        type: EventType.UpdateStartHour,
        startHour: `${tensHour}${+unitHour - 1}${separator}${tensMinut}${unitMinute}`,
      });
    }
  }
};

export const HourSelector = () => {
  const { event, dispatchEvent } = useContext(EventManagementContext);

  useEffect(() => {
    computeEndHourChanges(event.startHour, event.endHour, dispatchEvent);
  }, [event.endHour]);

  useEffect(() => {
    computeStartHourChanges(event.startHour, event.endHour, dispatchEvent);
  }, [event.startHour]);

  return (
    <>
      <TextField
        label="Start"
        type="time"
        value={event.startHour}
        inputProps={{
          'data-testid': 'startTime',
        }}
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
        inputProps={{
          'data-testid': 'endTime',
        }}
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

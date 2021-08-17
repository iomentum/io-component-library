import React, { useContext } from 'react';
import { TextField } from '@material-ui/core';
import { EventContext } from '../../contexts/EventContext';
import { EventType } from '../../reducers/EventReducer';
import { Row, Gap } from '../common.style';

export enum EventHourType {
  Start,
  End,
}

export const computeNewHours = (
  startHour: string,
  endHour: string,
  hourChanged: EventHourType
): [string, string] => {
  if (startHour > endHour) {
    if (startHour > '23:00') {
      return [startHour, '23:59'];
    }
    if (endHour < '01:00') {
      return ['00:00', endHour];
    }
    if (hourChanged === EventHourType.Start) {
      const [tensHours, unitHours, separator, tensMinutes, unitMinutes] = startHour.split('');
      return [startHour, `${tensHours}${+unitHours + 1}${separator}${tensMinutes}${unitMinutes}`];
    }
    if (hourChanged === EventHourType.End) {
      const [tensHours, unitHours, separator, tensMinutes, unitMinutes] = endHour.split('');
      return [`${tensHours}${+unitHours - 1}${separator}${tensMinutes}${unitMinutes}`, endHour];
    }
  }
  return [startHour, endHour];
};

export const HourSelector = () => {
  const { event, dispatchEvent } = useContext(EventContext);

  return (
    <Row>
      <TextField
        fullWidth
        label="Start"
        type="time"
        value={event.startHour}
        inputProps={{
          'data-testid': 'startTime',
        }}
        onChange={(onChangeEvent) => {
          const [startHour, endHour] = computeNewHours(
            onChangeEvent.target.value,
            event.endHour,
            EventHourType.Start
          );
          dispatchEvent({
            type: EventType.UpdateHours,
            startHour,
            endHour,
          });
        }}
      />
      <Gap />
      <TextField
        fullWidth
        label="End"
        type="time"
        value={event.endHour}
        inputProps={{
          'data-testid': 'endTime',
        }}
        onChange={(onChangeEvent) => {
          const [startHour, endHour] = computeNewHours(
            event.startHour,
            onChangeEvent.target.value,
            EventHourType.End
          );
          dispatchEvent({
            type: EventType.UpdateHours,
            startHour,
            endHour,
          });
        }}
      />
    </Row>
  );
};

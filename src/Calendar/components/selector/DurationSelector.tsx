import React, { Dispatch, useCallback, useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { HourSelector } from './HourSelector';
import { EventAction, EventModel, EventType } from '../../reducers/EventReducer';

interface DateSelectorProps {
  dispatchEvent: Dispatch<EventAction>;
  displayDate: string;
}

const DateSelector = (props: DateSelectorProps) => {
  return (
    <TextField
      type="date"
      value={props.displayDate}
      onChange={(event) =>
        props.dispatchEvent({
          type: EventType.UpdateEndDate,
          endDate: event.target.value ? new Date(event.target.value) : new Date(),
        })
      }
    />
  );
};

interface DurationControllerProps {
  allDayEventState: [boolean, Dispatch<boolean>];
  eventReducer: [EventModel, Dispatch<EventAction>];
}

export const DurationSelector = (props: DurationControllerProps) => {
  const [allDayEvent, setAllDayEvent] = props.allDayEventState;
  const [event, dispatchEvent] = props.eventReducer;

  const handleCheckboxChange = useCallback(
    () => setAllDayEvent(!allDayEvent),
    [allDayEvent, setAllDayEvent]
  );

  return (
    <>
      {allDayEvent ? (
        <DateSelector dispatchEvent={dispatchEvent} displayDate={event.displayEndDate} />
      ) : (
        <HourSelector eventReducer={props.eventReducer} />
      )}
      <FormControlLabel
        control={
          <Checkbox
            checked={allDayEvent}
            onChange={handleCheckboxChange}
            name="allDayEvent"
            color="primary"
          />
        }
        label="All day"
      />
    </>
  );
};

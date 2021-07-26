import React, { useCallback, useContext } from 'react';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { HourSelector } from './HourSelector';
import { EventType } from '../../reducers/EventReducer';
import { EventManagementContext } from '../../contexts/EventManagementContext';

const DateSelector = () => {
  const { event, dispatchEvent } = useContext(EventManagementContext);

  return (
    <TextField
      type="date"
      value={event.displayEndDate}
      onChange={(onChangeEvent) =>
        dispatchEvent({
          type: EventType.UpdateEndDate,
          endDate: onChangeEvent.target.value ? new Date(onChangeEvent.target.value) : new Date(),
        })
      }
    />
  );
};

export const DurationSelector = () => {
  const { fullDayEvent, setFullDayEvent } = useContext(EventManagementContext);

  const handleCheckboxChange = useCallback(
    () => setFullDayEvent(!fullDayEvent),
    [fullDayEvent, setFullDayEvent]
  );

  return (
    <>
      {fullDayEvent ? <DateSelector /> : <HourSelector />}
      <FormControlLabel
        control={
          <Checkbox
            checked={fullDayEvent}
            onChange={handleCheckboxChange}
            name="fullDayEvent"
            color="primary"
          />
        }
        label="All day"
      />
    </>
  );
};

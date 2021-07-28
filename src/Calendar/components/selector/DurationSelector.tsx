import React, { useCallback, useContext } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { EventManagementContext } from '../../contexts/EventManagementContext';
import { HourSelector } from './HourSelector';
import { DateSelector } from './DateSelector';

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

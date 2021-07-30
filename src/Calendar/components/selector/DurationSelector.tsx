import React, { useCallback, useContext } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { EventManagementContext } from '../../contexts/EventManagementContext';
import { HourSelector } from './HourSelector';
import { DateSelector, DateType } from './DateSelector';

export const DurationSelector = () => {
  const { isFullDayEvent, setIsFullDayEvent } = useContext(EventManagementContext);

  const handleCheckboxChange = useCallback(
    () => setIsFullDayEvent(!isFullDayEvent),
    [isFullDayEvent, setIsFullDayEvent]
  );

  return (
    <>
      {isFullDayEvent ? <DateSelector dateType={DateType.End} /> : <HourSelector />}
      <FormControlLabel
        control={
          <Checkbox
            checked={isFullDayEvent}
            onChange={handleCheckboxChange}
            name="isFullDayEvent"
            color="primary"
          />
        }
        label="All day"
      />
    </>
  );
};

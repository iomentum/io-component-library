import React, { useCallback, useContext } from 'react';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from './DurationSelector.style';
import { EventManagementContext } from '../../contexts/EventManagementContext';
import { HourSelector } from './HourSelector';
import { DateSelector, DateType } from './DateSelector';

export const DurationSelector = () => {
  const { isFullDayEvent, setIsFullDayEvent } = useContext(EventManagementContext);

  const handleCheckboxChange = useCallback(
    () => setIsFullDayEvent(!isFullDayEvent),
    [isFullDayEvent]
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

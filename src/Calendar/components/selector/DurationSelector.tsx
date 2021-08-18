import React, { useCallback, useContext, useEffect } from 'react';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from './DurationSelector.style';
import { EventManagementContext } from '../../contexts/EventManagementContext';
import { HourSelector } from './HourSelector';
import { DateSelector, DateType } from './DateSelector';
import { EventType } from '../../reducers/EventReducer';
import { EventContext } from '../../contexts/EventContext';

export const DurationSelector = () => {
  const { event, dispatchEvent } = useContext(EventContext);
  const { isFullDayEvent, setIsFullDayEvent } = useContext(EventManagementContext);

  useEffect(() => {
    if (isFullDayEvent) {
      dispatchEvent({
        type: EventType.UpdateHours,
        startHour: '00:01',
        endHour: '23:59',
      });
    } else {
      dispatchEvent({
        type: EventType.UpdateEndDate,
        endDate: event.startDate,
      });
    }
  }, [isFullDayEvent]);

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

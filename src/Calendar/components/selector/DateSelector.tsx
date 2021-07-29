import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { TextField } from '@material-ui/core';
import { EventManagementContext } from '../../contexts/EventManagementContext';
import { EventType } from '../../reducers/EventReducer';

export enum DateType {
  Start,
  End,
}
interface DateSelectorProps {
  dateType: DateType;
}

export const DateSelector = (props: DateSelectorProps) => {
  const { dateType } = props;
  const { event, dispatchEvent } = useContext(EventManagementContext);

  const displayedValue = useMemo(
    () => (dateType === DateType.Start ? event.displayStartDate : event.displayEndDate),
    [dateType, event]
  );

  useEffect(() => {
    if (event.startDate > event.endDate) {
      dispatchEvent({
        type: EventType.UpdateEndDate,
        endDate: new Date(event.startDate.setHours(event.startDate.getHours() + 1)),
      });
    }
  }, [event.startDate]);

  useEffect(() => {
    if (event.startDate > event.endDate) {
      dispatchEvent({
        type: EventType.UpdateStartDate,
        startDate: new Date(event.endDate.setHours(event.endDate.getHours() - 1)),
      });
    }
  }, [event.endDate]);

  const handleOnChange = useCallback(
    (onChangeEvent) =>
      dateType === DateType.Start
        ? dispatchEvent({
            type: EventType.UpdateStartDate,
            startDate: onChangeEvent.target.value
              ? new Date(onChangeEvent.target.value)
              : new Date(),
          })
        : dispatchEvent({
            type: EventType.UpdateEndDate,
            endDate: onChangeEvent.target.value ? new Date(onChangeEvent.target.value) : new Date(),
          }),
    []
  );

  return <TextField type="date" value={displayedValue} onChange={handleOnChange} />;
};

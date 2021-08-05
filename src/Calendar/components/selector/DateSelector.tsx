import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { TextField } from './DateSelector.style';
import { EventContext } from '../../contexts/EventContext';
import { EventType } from '../../reducers/EventReducer';

export enum DateType {
  Start = 'start',
  End = 'end',
}

interface DateSelectorProps {
  dateType: DateType;
}

export const DateSelector = (props: DateSelectorProps) => {
  const { dateType } = props;
  const { event, dispatchEvent } = useContext(EventContext);

  const displayedValue = useMemo(
    () => (dateType === DateType.Start ? event.displayStartDate : event.displayEndDate),
    [dateType, event]
  );

  const label = useMemo(() => `${dateType === DateType.Start ? 'Start' : 'End'} day`, [dateType]);

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

  return (
    <TextField
      fullWidth
      label={label}
      type="date"
      value={displayedValue}
      onChange={handleOnChange}
      inputProps={{
        'data-testid': `${dateType}Date`,
      }}
    />
  );
};

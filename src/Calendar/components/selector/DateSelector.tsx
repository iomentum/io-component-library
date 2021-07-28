import React, { useContext, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { EventManagementContext } from '../../contexts/EventManagementContext';
import { EventType } from '../../reducers/EventReducer';

export const DateSelector = () => {
  const { event, dispatchEvent } = useContext(EventManagementContext);

  useEffect(() => {
    if (event.startDate > event.endDate) {
      dispatchEvent({
        type: EventType.UpdateEndDate,
        endDate: new Date(event.startDate.setHours(event.startDate.getHours() + 1)),
      });
      dispatchEvent({
        type: EventType.UpdateStartDate,
        startDate: new Date(event.endDate.setHours(event.endDate.getHours() - 1)),
      });
    }
  }, [event.startDate, event.endDate, dispatchEvent]);

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

import { Select, MenuItem } from '@material-ui/core';
import React, { useContext } from 'react';
import { EventManagementContext } from '../../contexts/EventManagementContext';
import { EventType } from '../../reducers/EventReducer';
import { hours } from '../../utils';

export const HourSelector = () => {
  const { event, dispatchEvent } = useContext(EventManagementContext);

  return (
    <>
      <Select
        value={event.startHour}
        onChange={(onChangeEvent) =>
          dispatchEvent({
            type: EventType.UpdateStartHour,
            startHour: onChangeEvent.target.value as string,
          })
        }
        displayEmpty>
        <MenuItem value="" disabled>
          Start
        </MenuItem>
        {hours.map((hour) => (
          <MenuItem key={hour} value={hour}>
            {hour}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={event.endHour}
        onChange={(onChangeEvent) =>
          dispatchEvent({
            type: EventType.UpdateEndHour,
            endHour: onChangeEvent.target.value as string,
          })
        }
        displayEmpty>
        <MenuItem value="" disabled>
          End
        </MenuItem>
        {hours
          .filter((_, i) => hours.indexOf(event.startHour) < i)
          .map((hour) => (
            <MenuItem key={hour} value={hour}>
              {hour}
            </MenuItem>
          ))}
      </Select>
    </>
  );
};

import { Select, MenuItem } from "@material-ui/core";
import React, { Dispatch, memo } from "react";
import {
  EventAction,
  EventModel,
  EventType,
} from "../../reducers/EventReducer";
import { hours } from "./../../utils";

interface HourSelectorProps {
  eventReducer: [EventModel, Dispatch<EventAction>];
}

export const HourSelector = memo((props: HourSelectorProps) => {
  const [event, dispatchEvent] = props.eventReducer;

  return (
    <>
      <Select
        value={event.startHour}
        onChange={(event) =>
          dispatchEvent({
            type: EventType.UpdateStartHour,
            startHour: event.target.value as string,
          })
        }
        displayEmpty
      >
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
        onChange={(event) =>
          dispatchEvent({
            type: EventType.UpdateEndHour,
            endHour: event.target.value as string,
          })
        }
        displayEmpty
      >
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
});

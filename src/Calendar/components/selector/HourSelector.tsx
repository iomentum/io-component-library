import { Select, MenuItem } from "@material-ui/core";
import React, { Dispatch, memo } from "react";
import {
  SelectedHourAction,
  SelectedHour,
  SelectedHourType,
} from "./../../reducers/SelectedHour";
import { hours } from "./../../utils";

interface HourSelectorProps {
  selectedHourReducer: [SelectedHour, Dispatch<SelectedHourAction>];
}

export const HourSelector = memo((props: HourSelectorProps) => {
  const [selectedHour, dispatchSelectedHour] = props.selectedHourReducer;

  return (
    <>
      <Select
        value={selectedHour.startHour}
        onChange={(event) =>
          dispatchSelectedHour({
            type: SelectedHourType.UpdateStartHour,
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
        value={selectedHour.endHour}
        onChange={(event) =>
          dispatchSelectedHour({
            type: SelectedHourType.UpdateEndHour,
            endHour: event.target.value as string,
          })
        }
        displayEmpty
      >
        <MenuItem value="" disabled>
          End
        </MenuItem>
        {hours
          .filter((_, i) => hours.indexOf(selectedHour.startHour) < i)
          .map((hour) => (
            <MenuItem key={hour} value={hour}>
              {hour}
            </MenuItem>
          ))}
      </Select>
    </>
  );
});

import React, { Dispatch, memo } from "react";
import { TextField } from "@material-ui/core";
import { HourSelector } from "./HourSelector";
import { SelectedDateAction, SelectedDateType } from "./reducers/SelectedDate";
import { SelectedHour, SelectedHourAction } from "./reducers/SelectedHour";
import { DisplayDate } from "./reducers/DisplayDate";

interface DateSelectorProps {
  dispatchSelectedDate: Dispatch<SelectedDateAction>;
  displayDate: DisplayDate;
}

const DateSelector = memo((props: DateSelectorProps) => {
  return (
    <TextField
      id="date"
      type="date"
      value={props.displayDate.endDate}
      onChange={(event) =>
        props.dispatchSelectedDate({
          type: SelectedDateType.UpdateEndDate,
          endDate: event.target.value
            ? new Date(event.target.value)
            : new Date(),
        })
      }
    />
  );
});

interface DurationControllerProps {
  allDayEvent: boolean;
  dispatchSelectedDate: Dispatch<SelectedDateAction>;
  displayDate: DisplayDate;
  selectedHourReducer: [SelectedHour, Dispatch<SelectedHourAction>];
}

export const DurationController = memo((props: DurationControllerProps) => {
  return props.allDayEvent ? (
    <DateSelector
      dispatchSelectedDate={props.dispatchSelectedDate}
      displayDate={props.displayDate}
    />
  ) : (
    <HourSelector selectedHourReducer={props.selectedHourReducer} />
  );
});

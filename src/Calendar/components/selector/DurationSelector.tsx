import React, { Dispatch } from "react";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import { HourSelector } from "./HourSelector";
import {
  EventAction,
  EventModel,
  EventType,
} from "../../reducers/EventReducer";

interface DateSelectorProps {
  dispatchEvent: Dispatch<EventAction>;
  displayDate: string;
}

const DateSelector = (props: DateSelectorProps) => {
  return (
    <TextField
      id="date"
      type="date"
      value={props.displayDate}
      onChange={(event) =>
        props.dispatchEvent({
          type: EventType.UpdateEndDate,
          endDate: event.target.value
            ? new Date(event.target.value)
            : new Date(),
        })
      }
    />
  );
};

interface DurationControllerProps {
  allDayEventState: [boolean, Dispatch<boolean>];
  eventReducer: [EventModel, Dispatch<EventAction>];
}

export const DurationSelector = (props: DurationControllerProps) => {
  const [allDayEvent, setAllDayEvent] = props.allDayEventState;
  const [event, dispatchEvent] = props.eventReducer;

  return (
    <>
      {allDayEvent ? (
        <DateSelector
          dispatchEvent={dispatchEvent}
          displayDate={event.endDate.toISOString().replace(/T.*/, "")}
        />
      ) : (
        <HourSelector eventReducer={props.eventReducer} />
      )}
      <FormControlLabel
        control={
          <Checkbox
            checked={allDayEvent}
            onChange={() => setAllDayEvent((prev) => !prev)}
            name="allDayEvent"
            color="primary"
          />
        }
        label="All day"
      />
    </>
  );
};

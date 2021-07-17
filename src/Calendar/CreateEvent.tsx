import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import Dayz from "dayz";
import { TextField } from "@material-ui/core";
import { hours, fromDateForHours } from "./utils";
import * as m from "moment";
import { extendMoment } from "moment-range";
import { EventsCollection } from "./MyCalendar";
import { displayDateReducer, DisplayDateType } from "./reducers/DisplayDate";
import { selectedDateReducer, SelectedDateType } from "./reducers/SelectedDate";
import { selectedHourReducer, SelectedHourType } from "./reducers/SelectedHour";
import { OpeningDirection, SideModal } from "./SideModal";
import { DurationController } from "./DurationController";
const moment = extendMoment(m);

interface CreateEventProps {
  openState: [boolean, Dispatch<SetStateAction<boolean>>];
  eventsState: [EventsCollection, Dispatch<SetStateAction<EventsCollection>>];
  selectedStartDate: Date;
}

export function CreateEvent(props: CreateEventProps) {
  const selectedStartDate = props.selectedStartDate;
  const [events, setEvents] = props.eventsState;

  const [allDayEvent, setAllDayEvent] = useState(false);
  const [eventTitle, setEventTitle] = useState("");

  const [selectedDate, dispatchSelectedDate] = useReducer(selectedDateReducer, {
    startDate: selectedStartDate,
    endDate: selectedStartDate,
  });
  const [displayDate, dispatchDisplayDate] = useReducer(displayDateReducer, {
    startDate: selectedDate.startDate.toISOString().replace(/T.*/, ""),
    endDate: selectedDate.endDate.toISOString().replace(/T.*/, ""),
  });
  const startHour = fromDateForHours(selectedDate.startDate);
  const [selectedHour, dispatchSelectedHour] = useReducer(selectedHourReducer, {
    startHour: startHour,
    endHour: hours[hours.indexOf(startHour) + 4],
  });

  useEffect(
    () =>
      dispatchSelectedDate({
        type: SelectedDateType.UpdateStartDate,
        startDate: selectedStartDate,
      }),
    [selectedStartDate]
  );

  useEffect(() => {
    dispatchDisplayDate({
      type: DisplayDateType.UpdateStartDate,
      startDate: selectedDate.startDate.toISOString().replace(/T.*/, ""),
    });
    dispatchSelectedHour({
      type: SelectedHourType.UpdateStartHour,
      startHour: fromDateForHours(selectedDate.startDate),
    });
    if (selectedDate.startDate > selectedDate.endDate) {
      dispatchSelectedDate({
        type: SelectedDateType.UpdateEndDate,
        endDate: selectedDate.startDate,
      });
    }
  }, [selectedDate.startDate]);

  useEffect(() => {
    dispatchDisplayDate({
      type: DisplayDateType.UpdateEndDate,
      endDate: selectedDate.endDate.toISOString().replace(/T.*/, ""),
    });
    if (selectedDate.endDate < selectedDate.startDate) {
      dispatchSelectedDate({
        type: SelectedDateType.UpdateStartDate,
        startDate: selectedDate.endDate,
      });
    }
  }, [selectedDate.endDate]);

  useEffect(() => {
    if (hours.indexOf(selectedHour.startHour) + 4 > hours.length - 1) {
      dispatchSelectedHour({
        type: SelectedHourType.UpdateEndHour,
        endHour: hours[hours.length - 1],
      });
    } else {
      dispatchSelectedHour({
        type: SelectedHourType.UpdateEndHour,
        endHour: hours[hours.indexOf(selectedHour.startHour) + 4],
      });
    }
  }, [selectedHour.startHour]);

  const saveEvent = () => {
    let newEvents: EventsCollection = new Dayz.EventsCollection([
      ...events.events,
    ]);
    let splittedSelectedStartHour = selectedHour.startHour.split(":");
    let splittedSelectedEndHour = selectedHour.endHour.split(":");

    newEvents.add({
      content: eventTitle,
      range: moment.range(
        moment(selectedDate.startDate)
          .hour(+splittedSelectedStartHour[0])
          .minutes(+splittedSelectedStartHour[1]),
        allDayEvent
          ? moment(selectedDate.endDate).endOf("day")
          : moment(selectedDate.startDate)
              .hour(+splittedSelectedEndHour[0])
              .minutes(+splittedSelectedEndHour[1])
      ),
    });
    setEvents(newEvents);
  };

  return (
    <SideModal
      openState={props.openState}
      openingDirection={OpeningDirection.Left}
      onSave={saveEvent}
    >
      <TextField
        fullWidth
        label="Add a title"
        onChange={(event) => setEventTitle(event.target.value)}
      />
      <TextField
        id="date"
        type="date"
        value={displayDate.startDate}
        onChange={(event) =>
          dispatchSelectedDate({
            type: SelectedDateType.UpdateStartDate,
            startDate: event.target.value
              ? new Date(event.target.value)
              : new Date(),
          })
        }
      />
      <DurationController
        allDayEventState={[allDayEvent, setAllDayEvent]}
        dispatchSelectedDate={dispatchSelectedDate}
        displayDate={displayDate}
        selectedHourReducer={[selectedHour, dispatchSelectedHour]}
      />
    </SideModal>
  );
}

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import Dayz from "dayz";
import {
  Modal,
  Slide,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import { hours, fromDateForHours } from "./utils";
import * as m from "moment";
import { extendMoment } from "moment-range";
import { EventsCollection } from "./MyCalendar";
import { displayDateReducer, DisplayDateType } from "./reducers/DisplayDate";
import { selectedDateReducer, SelectedDateType } from "./reducers/SelectedDate";
import { selectedHourReducer, SelectedHourType } from "./reducers/SelectedHour";
const moment = extendMoment(m);

interface CreateEventProps {
  openState: [boolean, Dispatch<SetStateAction<boolean>>];
  eventsState: [EventsCollection, Dispatch<SetStateAction<EventsCollection>>];
  selectedStartDate: Date;
}

export function CreateEvent(props: CreateEventProps) {
  const selectedStartDate = props.selectedStartDate;
  const [openModal, setOpenModal] = props.openState;
  const [events, setEvents] = props.eventsState;
  
  const [allDayEvent, setAllDayEvent] = useState(false);
  const [eventTitle, setEventTitle] = useState("");

  const [selectedDate, dispatchSelectedDate] = useReducer(selectedDateReducer, {
    startDate: selectedStartDate,
    endDate: selectedStartDate,
  });
  const [displayDate, dispatchDisplayDate] = useReducer(displayDateReducer, {
    startDate: selectedDate.startDate.toISOString().split("T")[0],
    endDate: selectedDate.endDate.toISOString().split("T")[0],
  });
  const startHour = fromDateForHours(selectedDate.startDate);
  const [selectedHour, dispatchSelectedHour] = useReducer(selectedHourReducer, {
    startHour: startHour,
    endHour: hours[hours.indexOf(startHour) + 4],
  });

  useEffect(() => {
    dispatchDisplayDate({
      type: DisplayDateType.UpdateStartDate,
      startDate: selectedDate.startDate.toISOString().split("T")[0],
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
      endDate: selectedDate.endDate.toISOString().split("T")[0],
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
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Slide direction="left" in={openModal}>
        <Paper
          style={{
            width: 250,
            height: "100%",
            margin: "0 0 0 auto",
            padding: "0 20px",
          }}
          elevation={1}
        >
          <TextField
            fullWidth
            label="Ajouter un titre"
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
          {allDayEvent ? (
            <TextField
              id="date"
              type="date"
              value={displayDate.endDate}
              onChange={(event) =>
                dispatchSelectedDate({
                  type: SelectedDateType.UpdateEndDate,
                  endDate: event.target.value
                    ? new Date(event.target.value)
                    : new Date(),
                })
              }
            />
          ) : (
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => saveEvent()}
          >
            Save
          </Button>
        </Paper>
      </Slide>
    </Modal>
  );
}

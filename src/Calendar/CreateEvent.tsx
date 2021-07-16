import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { hours } from "./utils";
import * as m from "moment";
import { extendMoment } from "moment-range";
import { EventsCollection, MomentRange } from "./MyCalendar";
const moment = extendMoment(m);

interface CreateEventProps {
  openState: [boolean, Dispatch<SetStateAction<boolean>>];
  date: MomentRange;
  eventsState: [EventsCollection, Dispatch<SetStateAction<EventsCollection>>];
  selectedStartDateState: [Date, React.Dispatch<React.SetStateAction<Date>>];
}

const fromDateHourForHours = (dateHour: Date) => {
  const min = dateHour.getMinutes();

  if (min <= 15) {
    return hours[dateHour.getHours() * 4];
  } else if (min <= 30) {
    return hours[dateHour.getHours() * 4 + 1];
  } else if (min <= 45) {
    return hours[dateHour.getHours() * 4 + 2];
  } else {
    return hours[dateHour.getHours() * 4 + 3];
  }
};

export function CreateEvent(props: CreateEventProps) {
  const [openModal, setOpenModal] = props.openState;
  const [events, setEvents] = props.eventsState;
  const [
    selectedStartDate,
    setSelectedStartDate,
  ] = props.selectedStartDateState;

  const [eventTitle, setEventTitle] = useState("");
  const [selectedStartHour, setSelectedStartHour] = useState(
    fromDateHourForHours(selectedStartDate)
  );
  const [selectedEndDate, setSelectedEndDate] = useState(props.date.toDate());
  const [selectedEndHour, setSelectedEndHour] = useState(hours[4]);
  const [allDayEvent, setAllDayEvent] = useState(false);
  const [displayedStartDate, setDisplayedStartDate] = useState(
    selectedStartDate.toISOString().split("T")[0]
  );
  const [displayedEndDate, setDisplayedEndDate] = useState(
    selectedEndDate.toISOString().split("T")[0]
  );

  useEffect(() => {
    setDisplayedStartDate(selectedStartDate.toISOString().split("T")[0]);
    setSelectedStartHour(fromDateHourForHours(selectedStartDate));
    if (selectedStartDate > selectedEndDate) {
      setSelectedEndDate(selectedStartDate);
    }
  }, [selectedStartDate]);

  useEffect(
    () => setDisplayedEndDate(selectedEndDate.toISOString().split("T")[0]),
    [selectedEndDate]
  );

  useEffect(() => {
    if (hours.indexOf(selectedStartHour) + 4 > hours.length - 1) {
      setSelectedEndHour(hours[hours.length - 1]);
    } else {
      setSelectedEndHour(hours[hours.indexOf(selectedStartHour) + 4]);
    }
  }, [JSON.stringify(selectedStartHour)]);

  const saveEvent = () => {
    let newEvents: EventsCollection = new Dayz.EventsCollection([
      ...events.events,
    ]);
    let splittedSelectedStartHour = selectedStartHour.split(":");
    let splittedSelectedEndHour = selectedEndHour.split(":");

    newEvents.add({
      content: eventTitle,
      range: moment.range(
        moment(selectedStartDate)
          .hour(+splittedSelectedStartHour[0])
          .minutes(+splittedSelectedStartHour[1]),
        allDayEvent
          ? moment(selectedEndDate).endOf("day")
          : moment(selectedStartDate)
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
            value={displayedStartDate}
            onChange={(event) =>
              setSelectedStartDate(
                event.target.value ? new Date(event.target.value) : new Date()
              )
            }
          />
          {allDayEvent ? (
            <TextField
              id="date"
              type="date"
              value={displayedEndDate}
              onChange={(event) =>
                setSelectedEndDate(
                  event.target.value ? new Date(event.target.value) : new Date()
                )
              }
            />
          ) : (
            <>
              <Select
                value={selectedStartHour}
                onChange={(event) =>
                  setSelectedStartHour(event.target.value as string)
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
                value={selectedEndHour}
                onChange={(event) =>
                  setSelectedEndHour(event.target.value as string)
                }
                displayEmpty
              >
                <MenuItem value="" disabled>
                  End
                </MenuItem>
                {hours
                  .filter((_, i) => hours.indexOf(selectedStartHour) < i)
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

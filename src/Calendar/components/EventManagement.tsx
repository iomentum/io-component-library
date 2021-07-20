import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import Dayz from "dayz";
import { TextField } from "@material-ui/core";
import { hours, fromDateForHours } from "../utils";
import * as m from "moment";
import { extendMoment } from "moment-range";
import { EventsCollection, Event } from "../MyCalendar";
import { SideModal } from "./SideModal";
import { DurationSelector } from "./selector/DurationSelector";
import { eventReducer, EventType } from "../reducers/EventReducer";
const moment = extendMoment(m);

interface EventManagementProps {
  openState: [boolean, Dispatch<SetStateAction<boolean>>];
  eventsState: [EventsCollection, Dispatch<SetStateAction<EventsCollection>>];
  currentEvent: Event;
}

export function EventManagement(props: EventManagementProps) {
  const currentEvent = props.currentEvent;
  const [events, setEvents] = props.eventsState;

  const [allDayEvent, setAllDayEvent] = useState(
    moment
      .range(currentEvent.range().start, currentEvent.range().end)
      .diff("days") >= 1
  );

  const startHour = useCallback(
    () => fromDateForHours(currentEvent.range().start.toDate()),
    [currentEvent]
  )();

  const [event, dispatchEvent] = useReducer(eventReducer, {
    content: currentEvent.content,
    startDate: currentEvent.range().start.toDate(),
    endDate: currentEvent.range().end.toDate(),
    startHour,
    endHour: hours[hours.indexOf(startHour) + 4],
  });

  useEffect(
    () =>
      dispatchEvent({
        type: EventType.Reset,
        content: currentEvent.content || "",
        startDate: currentEvent.range().start.toDate(),
        endDate: currentEvent.range().end.toDate(),
        startHour,
        endHour: hours[hours.indexOf(startHour) + 4],
      }),
    [currentEvent]
  );

  useEffect(() => {
    if (event.startDate > event.endDate) {
      dispatchEvent({
        type: EventType.UpdateEndDate,
        endDate: new Date(event.startDate.setHours(event.startDate.getHours() + 1)),
      });
    }
    if (event.endDate < event.startDate) {
      dispatchEvent({
        type: EventType.UpdateStartDate,
        startDate: new Date(event.endDate.setHours(event.endDate.getHours() - 1)),
      });
    }
  }, [event.startDate, event.endDate]);

  useEffect(() => {
    if (hours.indexOf(event.startHour) + 4 > hours.length - 1) {
      dispatchEvent({
        type: EventType.UpdateEndHour,
        endHour: hours[hours.length - 1],
      });
    } else {
      dispatchEvent({
        type: EventType.UpdateEndHour,
        endHour: hours[hours.indexOf(event.startHour) + 4],
      });
    }
  }, [event.startHour]);

  const saveEvent = () => {
    const currEventIndex = events.events.findIndex(
      (event) =>
        event.content === currentEvent.content &&
        event.range().isSame(currentEvent.range())
    );
    if (currEventIndex !== -1) {
      events.events.splice(currEventIndex, 1);
    }

    let newEvents: EventsCollection = new Dayz.EventsCollection([
      ...events.events,
    ]);
    let splittedSelectedStartHour = event.startHour.split(":");
    let splittedSelectedEndHour = event.endHour.split(":");

    newEvents.add({
      content: event.content,
      range: moment.range(
        moment(event.startDate)
          .hour(+splittedSelectedStartHour[0])
          .minutes(+splittedSelectedStartHour[1]),
        allDayEvent
          ? moment(event.endDate).endOf("day")
          : moment(event.startDate)
              .hour(+splittedSelectedEndHour[0])
              .minutes(+splittedSelectedEndHour[1])
      ),
    });
    setEvents(newEvents);
  };

  return (
    <SideModal openState={props.openState} onSave={saveEvent}>
      <TextField
        fullWidth
        label="Add a title"
        value={event.content}
        onChange={(nativeEvent) =>
          dispatchEvent({
            type: EventType.UpdateContent,
            content: nativeEvent.target.value,
          })
        }
      />
      <TextField
        id="date"
        type="date"
        value={event.startDate.toISOString().replace(/T.*/, "")}
        onChange={(nativeEvent) =>
          dispatchEvent({
            type: EventType.UpdateStartDate,
            startDate: nativeEvent.target.value
              ? new Date(nativeEvent.target.value)
              : new Date(),
          })
        }
      />
      <DurationSelector
        allDayEventState={[allDayEvent, setAllDayEvent]}
        eventReducer={[event, dispatchEvent]}
      />
    </SideModal>
  );
}

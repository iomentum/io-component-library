import React, { Dispatch, SetStateAction } from "react";
import { TextField } from "@material-ui/core";
import { EventsCollection, Event } from "../../MyCalendar";
import { OpeningDirection, SideModal } from "../SideModal";

interface UpdateEventProps {
  openState: [boolean, Dispatch<SetStateAction<boolean>>];
  eventsState: [EventsCollection, Dispatch<SetStateAction<EventsCollection>>];
  eventToUpdateState: [Event, Dispatch<SetStateAction<Event>>];
}

export function UpdateEvent(props: UpdateEventProps) {
  const [eventToUpdate, setEventToUpdate] = props.eventToUpdateState;

  return (
    <SideModal
      openState={props.openState}
      openingDirection={OpeningDirection.Right}
      onSave={console.log}
    >
      <TextField
        fullWidth
        label="Add a title"
        onChange={(event) =>
          setEventToUpdate({ ...eventToUpdate, content: event.target.value })
        }
      />
      <TextField
        fullWidth
        label="Add a title"
        onChange={(event) =>
          setEventToUpdate({ ...eventToUpdate, content: event.target.value })
        }
      />
    </SideModal>
  );
}

import { createContext, Dispatch, SetStateAction } from "react";
import { EventsCollection, Event } from "../utils";

export interface EventContextInterface {
  eventsCollection: EventsCollection;
  setEventsCollection: Dispatch<SetStateAction<EventsCollection>>;
  currentEvent: Event;
}

export const EventContext = createContext<EventContextInterface>(null);

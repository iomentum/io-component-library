import { createContext, Dispatch, SetStateAction } from "react";
import { EventsCollection, Event } from "../utils";

export interface EventContextInterface {
  eventsCollection: EventsCollection;
  currentEvent: Event;
  setEventsCollection: Dispatch<SetStateAction<EventsCollection>>;
}

export const EventContext = createContext<EventContextInterface>(null);

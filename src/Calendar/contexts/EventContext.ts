import { createContext, Dispatch, SetStateAction } from 'react';
import { EventsCollection, Event } from '../utils';

export interface EventContextInterface {
  eventsCollection: EventsCollection;
  currentEvent: Event;
  eventManagementOpened: boolean;
  setEventsCollection: Dispatch<SetStateAction<EventsCollection>>;
  setCurrentEvent: Dispatch<SetStateAction<Event>>;
  setEventManagementOpened: Dispatch<SetStateAction<boolean>>;
}

export const EventContext = createContext<EventContextInterface>(null);

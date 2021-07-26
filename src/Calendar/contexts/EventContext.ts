import { createContext, Dispatch, SetStateAction } from 'react';
import { EventsCollection, Event } from '../utils';

export interface EventContextInterface {
  eventsCollection: EventsCollection;
  currentEvent: Event;
  openEventManagement: boolean;
  setEventsCollection: Dispatch<SetStateAction<EventsCollection>>;
  setOpenEventManagement: Dispatch<SetStateAction<boolean>>;
}

export const EventContext = createContext<EventContextInterface>(null);

import { createContext, Dispatch, SetStateAction } from 'react';
import { DayzEventsCollection, Event } from '../utils';

export interface EventContextInterface {
  eventsCollection: DayzEventsCollection;
  currentEvent: Event;
  eventManagementOpened: boolean;
  setEventsCollection: Dispatch<SetStateAction<DayzEventsCollection>>;
  setCurrentEvent: Dispatch<SetStateAction<Event>>;
  setEventManagementOpened: Dispatch<SetStateAction<boolean>>;
}

export const EventContext = createContext<EventContextInterface>(null);

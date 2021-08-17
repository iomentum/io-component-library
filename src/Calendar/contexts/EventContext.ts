import { createContext, Dispatch, SetStateAction } from 'react';
import { EventAction, Event } from '../reducers/EventReducer';

export interface EventContextInterface {
  eventsCollection: Event[];
  setEventsCollection: Dispatch<SetStateAction<Event[]>>;
  eventManagementOpened: boolean;
  setEventManagementOpened: Dispatch<SetStateAction<boolean>>;
  event: Event;
  dispatchEvent: Dispatch<EventAction>;
}

export const EventContext = createContext<EventContextInterface>(null);

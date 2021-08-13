import { createContext, Dispatch, SetStateAction } from 'react';
import { MyCalendarEvent } from '../types';

export interface EventContextInterface {
  eventsCollection: MyCalendarEvent[];
  currentEvent: MyCalendarEvent;
  eventManagementOpened: boolean;
  setEventsCollection: Dispatch<SetStateAction<MyCalendarEvent[]>>;
  setCurrentEvent: Dispatch<SetStateAction<MyCalendarEvent>>;
  setEventManagementOpened: Dispatch<SetStateAction<boolean>>;
}

export const EventContext = createContext<EventContextInterface>(null);

import { createContext, Dispatch, SetStateAction } from 'react';
import { EventAction, EventModel } from '../reducers/EventReducer';

export interface EventManagementContext {
  fullDayEvent: boolean;
  event: EventModel;
  setFullDayEvent: Dispatch<SetStateAction<boolean>>;
  dispatchEvent: Dispatch<EventAction>;
}

export const EventManagementContext = createContext<EventManagementContext>(null);

import { createContext, Dispatch, SetStateAction } from 'react';
import { EventAction, EventModel } from '../reducers/EventReducer';

export interface EventManagementContext {
  isFullDayEvent: boolean;
  event: EventModel;
  setIsFullDayEvent: Dispatch<SetStateAction<boolean>>;
  dispatchEvent: Dispatch<EventAction>;
}

export const EventManagementContext = createContext<EventManagementContext>(null);

import { createContext, Dispatch, SetStateAction } from 'react';

export interface EventManagementContext {
  isFullDayEvent: boolean;
  setIsFullDayEvent: Dispatch<SetStateAction<boolean>>;
}

export const EventManagementContext = createContext<EventManagementContext>(null);

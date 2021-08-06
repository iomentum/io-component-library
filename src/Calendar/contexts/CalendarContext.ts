import { createContext, Dispatch, SetStateAction } from 'react';
import { DisplayMode } from '../utils';

export interface CalendarContextInterface {
  displayMode: DisplayMode;
  displayedDate: Date;
  setDisplayMode: Dispatch<SetStateAction<DisplayMode>>;
  setDisplayedDate: Dispatch<SetStateAction<Date>>;
}

export const CalendarContext = createContext<CalendarContextInterface>(null);

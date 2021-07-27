import { createContext, Dispatch, SetStateAction } from 'react';
import { Display, MomentRangeExtended } from '../utils';

export interface CalendarContextInterface {
  displayMode: Display;
  displayedDate: MomentRangeExtended;
  setDisplayMode: Dispatch<SetStateAction<Display>>;
  setDisplayedDate: Dispatch<SetStateAction<MomentRangeExtended>>;
}

export const CalendarContext = createContext<CalendarContextInterface>(null);

import { createContext, Dispatch, SetStateAction } from 'react';
import { DisplayMode, MomentRangeExtended } from '../utils';

export interface CalendarContextInterface {
  displayMode: DisplayMode;
  displayedDate: MomentRangeExtended;
  setDisplayMode: Dispatch<SetStateAction<DisplayMode>>;
  setDisplayedDate: Dispatch<SetStateAction<MomentRangeExtended>>;
}

export const CalendarContext = createContext<CalendarContextInterface>(null);

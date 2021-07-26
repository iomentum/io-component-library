import { createContext, Dispatch, SetStateAction } from 'react';
import { Display, MomentRangeExtended } from '../utils';

export interface CalendarContextInterface {
  display: Display;
  date: MomentRangeExtended;
  setDisplay: Dispatch<SetStateAction<Display>>;
  setDate: Dispatch<SetStateAction<MomentRangeExtended>>;
}

export const CalendarContext = createContext<CalendarContextInterface>(null);

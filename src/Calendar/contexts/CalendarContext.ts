import { createContext, Dispatch, SetStateAction } from "react";
import { Display, MomentRangeExtended } from "../utils";

export interface CalendarContextInterface {
  display: Display;
  setDisplay: Dispatch<SetStateAction<Display>>;
  setDate: Dispatch<SetStateAction<MomentRangeExtended>>;
  openEventManagement: boolean;
  setOpenEventManagement: Dispatch<SetStateAction<boolean>>;
}

export const CalendarContext = createContext<CalendarContextInterface>(null);

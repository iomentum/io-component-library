import { createContext, Dispatch, SetStateAction } from "react";
import { Display, MomentRangeExtended } from "../utils";

export interface CalendarContextInterface {
  display: Display;
  openEventManagement: boolean;
  setDisplay: Dispatch<SetStateAction<Display>>;
  setOpenEventManagement: Dispatch<SetStateAction<boolean>>;
  setDate: Dispatch<SetStateAction<MomentRangeExtended>>;
}

export const CalendarContext = createContext<CalendarContextInterface>(null);

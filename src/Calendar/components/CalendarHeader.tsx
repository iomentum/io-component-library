import React, { Dispatch, memo, SetStateAction } from "react";
import { Display, MomentRange } from "../MyCalendar";
import { DateController } from "./controller/DateController";
import { DisplayController } from "./controller/DisplayController";

interface CalendarHeaderProps {
  setDate: Dispatch<SetStateAction<MomentRange>>;
  date: MomentRange;
  setDisplay: Dispatch<SetStateAction<Display>>;
  display: Display;
}

export const CalendarHeader = memo((props: CalendarHeaderProps) => (
  <>
    <DisplayController {...props} />
    <DateController {...props} />
  </>
));
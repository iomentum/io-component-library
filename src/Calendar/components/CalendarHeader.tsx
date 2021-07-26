import React, { memo } from "react";
import { DateController } from "./controller/DateController";
import { DisplayController } from "./controller/DisplayController";

export const CalendarHeader = memo(() => (
  <>
    <DisplayController />
    <DateController />
  </>
));

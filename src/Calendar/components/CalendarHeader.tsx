import React from "react";
import { DateController } from "./controller/DateController";
import { DisplayController } from "./controller/DisplayController";

export const CalendarHeader = () => (
  <>
    <DisplayController />
    <DateController />
  </>
);

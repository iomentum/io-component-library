import Dayz from "dayz";
import { EventsCollection } from "./MyCalendar";
import * as m from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(m);

const date = moment();

export const EVENTS: EventsCollection[] = new Dayz.EventsCollection([
  {
    content: "Weeklong",
    range: moment.range(date.clone(), date.clone().endOf("day")),
  },
  {
    content: "9am - 2pm",
    range: moment.range(date.clone().hour(9), date.clone().hour(14)),
  },
  {
    content: "8am - 8pm",
    range: moment.range(date.clone().hour(8), date.clone().hour(21).minutes(40)),
  },
]);

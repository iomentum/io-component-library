import * as m from 'moment';
import { DateRange, extendMoment, MomentRangeStaticMethods } from 'moment-range';
import Dayz from 'dayz';

export const extendedMoment = extendMoment(m);

export type MomentRangeExtended = MomentRangeStaticMethods & m.Moment;

export interface EventDateRange {
  eventStart: Date;
  eventEnd: Date;
}

export enum DisplayMode {
  Week = 'week',
  Day = 'day',
}

export interface Event {
  content: string;
  range: () => DateRange;
}

export interface EventsCollection {
  events: Event[];
  add: (
    eventAttrs: {
      content: string;
      range: DateRange;
    },
    options?: Record<string, never>
  ) => void;
}

export const formatDateAndHour = (date: m.Moment) => date.format('YYYY-MM-DD HH:mm').split(' ');

export const createExtendedMomentFromDate = (date: Date) => extendedMoment(date);

export const createRangeEvent = (start: MomentRangeExtended): Event => ({
  content: '',
  range: () => extendedMoment.range(extendedMoment(start), extendedMoment(start).add(1, 'hour')),
});

export const createMomentDateRangeFromDate = (start: Date, end: Date) =>
  extendedMoment.range(extendedMoment(start), extendedMoment(end));

// export const extractMomentRangeIntoDateRange;

interface SelectedEvent {
  content: string;
  range: DateRange;
}

export const findEvent = (event: SelectedEvent, events: EventsCollection) =>
  events.events.find(
    (currEvent) => event.content === currEvent.content && event.range.isSame(currEvent.range())
  );

// const date = extendedMoment();

export const EVENTS: EventsCollection = new Dayz.EventsCollection([
  // {
  //   content: "Weeklong",
  //   range: extendedMoment.range(date.clone(), date.clone().endOf("day")),
  // },
  // {
  //   content: "9am - 2pm",
  //   range: extendedMoment.range(date.clone().hour(9), date.clone().hour(14)),
  // },
  // {
  //   content: "8am - 8pm",
  //   range: extendedMoment.range(date.clone().hour(8), date.clone().hour(21).minutes(40)),
  // },
]);

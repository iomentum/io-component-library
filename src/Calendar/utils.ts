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
  dateRange: EventDateRange;
}

export interface DayzEvent {
  content: string;
  range: () => DateRange;
}

export interface DayzEventsCollection {
  events: DayzEvent[];
  add: (
    eventAttrs: {
      content: string;
      range: DateRange;
    },
    options?: Record<string, never>
  ) => void;
}

export const getFormattedDate = (date: Date) => date.toISOString().replace(/T.*/, '');

export const computeIsFullDayEvent = (range: EventDateRange): boolean =>
  getFormattedDate(range.eventStart) !== getFormattedDate(range.eventEnd);

export const formatDateAndHour = (dateToFormat: Date) => {
  const timeZoneOffset = dateToFormat.getTimezoneOffset() * 60000;
  const [date, hour] = new Date(dateToFormat.getTime() - timeZoneOffset).toISOString().split('T');
  return [date, hour.slice(0, 5)];
};

export const createExtendedMomentFromDate = (date: Date) => extendedMoment(date);

export const createEvent = (eventStart: Date): Event => {
  const eventEnd = new Date(eventStart);
  eventEnd.setHours(eventEnd.getHours() + 1);

  return {
    content: '',
    dateRange: {
      eventStart,
      eventEnd,
    },
  };
};

export const createMomentDateRangeFromDate = (start: Date, end: Date) =>
  extendedMoment.range(extendedMoment(start), extendedMoment(end));

interface SelectedEvent {
  content: string;
  range: DateRange;
}

export const convertEventIntoDayzEvent = (event: Event): DayzEvent => ({
  content: event.content,
  range: () =>
    extendedMoment.range(
      extendedMoment(event.dateRange.eventStart),
      extendedMoment(event.dateRange.eventEnd)
    ),
});

export const convertDayzEventIntoEvent = (dayzEvent: DayzEvent): Event => ({
  content: dayzEvent.content,
  dateRange: {
    eventStart: dayzEvent.range().start.toDate(),
    eventEnd: dayzEvent.range().end.toDate(),
  },
});

export const findEvent = (event: SelectedEvent, events: DayzEventsCollection) =>
  convertDayzEventIntoEvent(
    events.events.find(
      (currEvent) => event.content === currEvent.content && event.range.isSame(currEvent.range())
    )
  );

// const date = extendedMoment();

export const EVENTS: DayzEventsCollection = new Dayz.EventsCollection([
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

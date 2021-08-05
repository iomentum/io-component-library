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
  Month = 'month',
  Week = 'week',
  Day = 'day',
}

export enum WeekStartsOn {
  Sunday,
  Monday,
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

export const formatDateAndHour = (dateToFormat: Date): [string, string] => {
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

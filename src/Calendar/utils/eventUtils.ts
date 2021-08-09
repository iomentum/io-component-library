import { DateRange } from 'moment-range';
import Dayz from 'dayz';
import { EventModel } from '../reducers/EventReducer';
import { MyCalendarEvent } from '../types';
import { createMomentRange } from './momentUtils';

export interface DayzEvent {
  content: string;
  range: DateRange;
  uuid: string;
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

export const getMyCalendarEventIndex = (
  myCalendarEvent: MyCalendarEvent,
  myCalendarEvents: MyCalendarEvent[]
) => myCalendarEvents.findIndex((event) => event.uuid === myCalendarEvent.uuid);

const computeEventDate = (event: EventModel): [Date, Date] => {
  const [newEventStartHour, newEventStartMinutes] = event.startHour.split(':');
  const [newEventEndHour, newEventEndMinutes] = event.endHour.split(':');

  const startDate = new Date(event.startDate);
  startDate.setHours(+newEventStartHour, +newEventStartMinutes);

  const endDate = new Date(event.endDate);
  endDate.setHours(+newEventEndHour, +newEventEndMinutes);

  return [startDate, endDate];
};

export const createEvent = (event: EventModel): MyCalendarEvent => {
  const [startDate, endDate] = computeEventDate(event);

  return {
    uuid: `awdaw1-${Math.floor(Math.random() * 1000)}`,
    title: event.content,
    startDate,
    endDate,
    metadata: {},
  };
};

export const updateEvent = (event: EventModel, eventToUpdate: MyCalendarEvent): MyCalendarEvent => {
  const [startDate, endDate] = computeEventDate(event);

  return {
    uuid: eventToUpdate.uuid,
    title: event.content,
    startDate,
    endDate,
    metadata: eventToUpdate.metadata,
  };
};

export const deleteEvent = (
  myCalendarEvents: MyCalendarEvent[],
  myCalendarEvent: MyCalendarEvent
) => myCalendarEvents.splice(getMyCalendarEventIndex(myCalendarEvent, myCalendarEvents), 1);

const convertMyCalendarEventIntoDayzEvent = (myCalendarEvent: MyCalendarEvent): DayzEvent => ({
  content: myCalendarEvent.title,
  range: createMomentRange(myCalendarEvent.startDate, myCalendarEvent.endDate),
  uuid: myCalendarEvent.uuid,
});

export const convertMyCalendarEventsIntoDayzEventsCollection = (
  myCalendarEvents: MyCalendarEvent[]
): DayzEventsCollection =>
  new Dayz.EventsCollection([...myCalendarEvents.map(convertMyCalendarEventIntoDayzEvent)]);

export const createDefaultMyCalendarEvent = (startDate: Date): MyCalendarEvent => {
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 1);

  return {
    uuid: `awdawd`,
    title: '',
    startDate,
    endDate,
    metadata: {},
  };
};

export const findEvent = (event: DayzEvent, myCalendarEvents: MyCalendarEvent[]) =>
  myCalendarEvents.find((myCalendarEvent) => myCalendarEvent.uuid === event.uuid);

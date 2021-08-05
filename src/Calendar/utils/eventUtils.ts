import { DateRange } from 'moment-range';
import Dayz from 'dayz';
import { EventModel } from '../reducers/EventReducer';
import { Event, extendedMoment } from '../utils';

export interface MyCalendarEvent {
  uuid: string;
  title: string;
  startDate: Date;
  endDate: Date;
  metadata: Record<string, unknown>;
}

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

export const currentEventIndex = (
  myCalendarEvents: MyCalendarEvent[],
  myCalendarEvent: MyCalendarEvent
) => myCalendarEvents.findIndex((event) => event.uuid === myCalendarEvent.uuid);

export const deleteEvent = (
  myCalendarEvents: MyCalendarEvent[],
  myCalendarEvent: MyCalendarEvent
) => {
  const eventToDeleteIndex = currentEventIndex(myCalendarEvents, myCalendarEvent);

  myCalendarEvents.splice(eventToDeleteIndex, 1);
};

export const isEventExisting = (
  eventsCollection: MyCalendarEvent[],
  myCalendarEvent: MyCalendarEvent
) => currentEventIndex(eventsCollection, myCalendarEvent) !== -1;

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
    uuid: 'awdawd',
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

const convertMyCalendarEventIntoDayzEvent = (myCalendarEvent: MyCalendarEvent): DayzEvent => ({
  content: myCalendarEvent.title,
  range: extendedMoment.range(
    extendedMoment(new Date(myCalendarEvent.startDate)),
    extendedMoment(new Date(myCalendarEvent.endDate))
  ),
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

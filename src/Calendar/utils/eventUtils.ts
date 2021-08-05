import Dayz from 'dayz';
import { Event } from '../reducers/EventReducer';
import { createMomentRange, DayzEvent, DayzEventsCollection } from './momentUtils';
import { formatDateAndHour } from './dateUtils';

export const getEventIndex = (event: Event, events: Event[]) =>
  events.findIndex((evnt) => evnt.uuid === event.uuid);

export const findEvent = (event: DayzEvent, events: Event[]) =>
  events.find((evnt) => evnt.uuid === event.uuid);

const convertEventIntoDayzEvent = (event: Event): DayzEvent => ({
  content: event.title,
  range: createMomentRange(event.startDate, event.endDate),
  uuid: event.uuid,
});

export const convertEventsIntoDayzEventsCollection = (events: Event[]): DayzEventsCollection =>
  new Dayz.EventsCollection([...events.map(convertEventIntoDayzEvent)]);

export const createDefaultEvent = (startDate: Date): Event => {
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 1);

  const [displayStartDate, startHour] = formatDateAndHour(startDate);
  const [displayEndDate, endHour] = formatDateAndHour(endDate);

  return {
    uuid: `default-event-${Math.floor(Math.random() * 1000)}`,
    title: '',
    startDate,
    endDate,
    displayStartDate,
    displayEndDate,
    startHour,
    endHour,
    metadata: {},
  };
};

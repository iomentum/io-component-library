import { EventModel } from '../reducers/EventReducer';
import { DayzEventsCollection, Event, convertEventIntoDayzEvent } from '../utils';

const currentEventIndex = (eventsCollection: DayzEventsCollection, currentEvent: Event) =>
  eventsCollection.events.findIndex(
    (evnt) =>
      evnt.content === currentEvent.content &&
      evnt.range().isSame(convertEventIntoDayzEvent(currentEvent).range())
  );

export const deleteEvent = (eventsCollection: DayzEventsCollection, eventToDelete: Event) => {
  const eventToDeleteIndex = currentEventIndex(eventsCollection, eventToDelete);

  eventsCollection.events.splice(eventToDeleteIndex, 1);
};

export const isEventExisting = (eventsCollection: DayzEventsCollection, currentEvent: Event) =>
  currentEventIndex(eventsCollection, currentEvent) !== -1;

export const createEvent = (event: EventModel, isFullDayEvent: boolean): Event => {
  const [newEventStartHour, newEventStartMinutes] = event.startHour.split(':');
  const [newEventEndHour, newEventEndMinutes] = event.endHour.split(':');

  const newEventStartDate = new Date(event.startDate);
  newEventStartDate.setHours(+newEventStartHour, +newEventStartMinutes);

  const newEventEndDate = new Date(event.endDate);
  if (isFullDayEvent) {
    newEventEndDate.setHours(23, 59);
  } else {
    newEventEndDate.setHours(+newEventEndHour, +newEventEndMinutes);
  }

  return {
    content: event.content,
    dateRange: {
      eventStart: newEventStartDate,
      eventEnd: newEventEndDate,
    },
  };
};

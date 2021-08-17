import { getFormattedDate } from '../utils/dateUtils';

export enum EventType {
  UpdateTitle,
  UpdateStartDate,
  UpdateEndDate,
  UpdateStartHour,
  UpdateEndHour,
  UpdateEvent,
  Reset,
}

export type EventAction =
  | {
      type: EventType.UpdateTitle;
      title: string;
    }
  | {
      type: EventType.UpdateStartDate;
      startDate: Date;
    }
  | {
      type: EventType.UpdateEndDate;
      endDate: Date;
    }
  | {
      type: EventType.UpdateStartHour;
      startHour: string;
    }
  | {
      type: EventType.UpdateEndHour;
      endHour: string;
    }
  | {
      type: EventType.UpdateEvent;
      uuid: string;
      title: string;
      startDate: Date;
      endDate: Date;
      startHour: string;
      endHour: string;
      metadata: Record<string, unknown>;
    };

export interface Event {
  uuid: string;
  title: string;
  startDate: Date;
  displayStartDate: string;
  endDate: Date;
  displayEndDate: string;
  startHour: string;
  endHour: string;
  metadata: Record<string, unknown>;
}

export const eventReducer = (state: Event, action: EventAction): Event => {
  switch (action.type) {
    case EventType.UpdateTitle:
      return { ...state, title: action.title };
    case EventType.UpdateStartDate:
      return {
        ...state,
        startDate: action.startDate,
        displayStartDate: getFormattedDate(action.startDate),
      };
    case EventType.UpdateEndDate:
      return {
        ...state,
        endDate: action.endDate,
        displayEndDate: getFormattedDate(action.endDate),
      };
    case EventType.UpdateStartHour:
      return { ...state, startHour: action.startHour };
    case EventType.UpdateEndHour:
      return { ...state, endHour: action.endHour };
    case EventType.UpdateEvent:
      return {
        uuid: action.uuid,
        title: action.title,
        startDate: action.startDate,
        displayStartDate: getFormattedDate(action.startDate),
        endDate: action.endDate,
        displayEndDate: getFormattedDate(action.endDate),
        startHour: action.startHour,
        endHour: action.endHour,
        metadata: action.metadata,
      };
    default:
      throw Error('Unknow EventType');
  }
};

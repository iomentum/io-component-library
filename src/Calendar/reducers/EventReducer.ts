import { getFormattedDate } from '../utils/dateUtils';

export enum EventType {
  UpdateContent,
  UpdateStartDate,
  UpdateEndDate,
  UpdateStartHour,
  UpdateEndHour,
  Reset,
}

export type EventAction =
  | {
      type: EventType.UpdateContent;
      content: string;
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
      type: EventType.Reset;
      content: string;
      startDate: Date;
      displayStartDate: string;
      endDate: Date;
      displayEndDate: string;
      startHour: string;
      endHour: string;
    };

export interface EventModel {
  content: string;
  startDate: Date;
  displayStartDate: string;
  endDate: Date;
  displayEndDate: string;
  startHour: string;
  endHour: string;
}

export const eventReducer = (state: EventModel, action: EventAction): EventModel => {
  switch (action.type) {
    case EventType.UpdateContent:
      return { ...state, content: action.content };
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
    case EventType.Reset:
      return {
        content: action.content,
        startDate: action.startDate,
        displayStartDate: action.displayStartDate,
        endDate: action.endDate,
        displayEndDate: action.displayEndDate,
        startHour: action.startHour,
        endHour: action.endHour,
      };
    default:
      throw Error('Unknow EventType');
  }
};

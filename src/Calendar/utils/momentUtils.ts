import moment, * as m from 'moment';
import { MomentInput } from 'moment';
import { DateRange, extendMoment } from 'moment-range';

const extendedMoment = extendMoment(m);

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

export const createExtendedMomentFromDate = (date: Date) => extendedMoment(date);

export const createMomentRange = (startDate: Date, endDate: Date) =>
  extendedMoment.range(extendedMoment(new Date(startDate)), extendedMoment(new Date(endDate)));

export const createDateFromMoment = (momentInput: MomentInput) => moment(momentInput).toDate();

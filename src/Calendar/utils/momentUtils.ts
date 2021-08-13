import moment, * as m from 'moment';
import { MomentInput } from 'moment';
import { extendMoment } from 'moment-range';

const extendedMoment = extendMoment(m);

export const createExtendedMomentFromDate = (date: Date) => extendedMoment(date);

export const createMomentRange = (startDate: Date, endDate: Date) =>
  extendedMoment.range(extendedMoment(new Date(startDate)), extendedMoment(new Date(endDate)));

export const createDateFromMoment = (momentInput: MomentInput) => moment(momentInput).toDate();

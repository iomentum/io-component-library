import { formatDateAndHour } from './utils/dateUtils';
import { Event } from './reducers/EventReducer';

const dates = [
  { start: new Date('2021-08-05T11:00:00'), end: new Date('2021-08-05T12:00:00') },
  { start: new Date('2021-08-05T14:00:00'), end: new Date('2021-08-05T16:00:00') },
  { start: new Date('2021-08-05T18:00:00'), end: new Date('2021-08-05T19:00:00') },
];

export const displayedDate = new Date();

export const events: Event[] = dates.map((date, index) => {
  const [displayStartDate, startHour] = formatDateAndHour(date.start);
  const [displayEndDate, endHour] = formatDateAndHour(date.end);

  return {
    uuid: `awdaw1-123${index}`,
    title: `test ${index}`,
    startDate: date.start,
    endDate: date.end,
    displayStartDate,
    displayEndDate,
    startHour,
    endHour,
    metadata: {},
  };
});

export const onCreate = () => events;
export const onUpdate = () => events;
export const onDelete = () => events;

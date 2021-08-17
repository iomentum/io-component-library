import { formatDateAndHour } from '../utils/dateUtils';
import { Event } from '../reducers/EventReducer';

export const createDefaultEvent = (startDate: Date): Event => {
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 1);

  const [displayStartDate, startHour] = formatDateAndHour(startDate);
  const [displayEndDate, endHour] = formatDateAndHour(endDate);

  return {
    uuid: `default-event`,
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

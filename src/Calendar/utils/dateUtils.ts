const getTimezoneOffset = (date: Date) => date.getTimezoneOffset() * 60000;

export const getFormattedDate = (date: Date) =>
  new Date(date.getTime() - getTimezoneOffset(date)).toISOString().replace(/T.*/, '');

export const formatDateAndHour = (dateToFormat: Date): [string, string] => {
  const [date, hour] = new Date(dateToFormat.getTime() - getTimezoneOffset(dateToFormat))
    .toISOString()
    .split('T');
  return [date, hour.slice(0, 5)];
};

export const mergeDateAndHour = (date: Date, hour: string) => {
  const [hours, minutes] = hour.split(':');
  return new Date(date.setHours(+hours, +minutes));
};

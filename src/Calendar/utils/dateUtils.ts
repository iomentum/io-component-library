export const getFormattedDate = (date: Date) => date.toISOString().replace(/T.*/, '');

export const formatDateAndHour = (dateToFormat: Date): [string, string] => {
  const timeZoneOffset = dateToFormat.getTimezoneOffset() * 60000;
  const [date, hour] = new Date(dateToFormat.getTime() - timeZoneOffset).toISOString().split('T');
  return [date, hour.slice(0, 5)];
};

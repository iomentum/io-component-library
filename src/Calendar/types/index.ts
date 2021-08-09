export interface MyCalendarEvent {
  uuid: string;
  title: string;
  startDate: Date;
  endDate: Date;
  metadata: Record<string, unknown>;
}

export enum DisplayMode {
  Month = 'month',
  Week = 'week',
  Day = 'day',
}

export enum WeekStartsOn {
  Sunday,
  Monday,
}

/// <reference types="react" />
import { DateRange, MomentRangeStaticMethods } from "moment-range";
import * as m from "moment";
import "dayz/dist/dayz.css";
import "./MyCalendar.css";
export declare enum Display {
    Week = "week",
    Day = "day"
}
export declare type MomentRange = MomentRangeStaticMethods & m.Moment;
export interface EventsCollection {
    content: string;
    range: DateRange;
}
interface CalendarProps {
    date: MomentRange;
    display: Display;
    events: EventsCollection[];
}
export declare function MyCalendar(props: CalendarProps): JSX.Element;
export {};

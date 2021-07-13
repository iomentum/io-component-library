import React, { Dispatch, SetStateAction } from "react";
import { Display, MomentRange } from "./MyCalendar";
interface CalendarHeaderProps {
    setDate: Dispatch<SetStateAction<MomentRange>>;
    date: MomentRange;
    setDisplay: Dispatch<SetStateAction<Display>>;
    display: Display;
}
export declare const CalendarHeader: React.MemoExoticComponent<(props: CalendarHeaderProps) => JSX.Element>;
export {};

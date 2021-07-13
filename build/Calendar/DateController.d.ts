import React, { Dispatch, SetStateAction } from "react";
import { Display, MomentRange } from "./MyCalendar";
interface DateControllerProps {
    setDate: Dispatch<SetStateAction<MomentRange>>;
    date: MomentRange;
    display: Display;
}
export declare const DateController: React.MemoExoticComponent<(props: DateControllerProps) => JSX.Element>;
export {};

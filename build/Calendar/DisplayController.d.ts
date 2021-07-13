import React, { Dispatch, SetStateAction } from "react";
import { Display } from "./MyCalendar";
interface DisplayControllerProps {
    setDisplay: Dispatch<SetStateAction<Display>>;
    display: Display;
}
export declare const DisplayController: React.MemoExoticComponent<(props: DisplayControllerProps) => JSX.Element>;
export {};

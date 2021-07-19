import React, {
  Dispatch,
  memo,
  MouseEventHandler,
  SetStateAction,
} from "react";
import { extendMoment } from "moment-range";
import { Button } from "@material-ui/core";
import { Display, MomentRange } from "./../../MyCalendar";

import * as m from "moment";
const moment = extendMoment(m);

interface ControlButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ControlButton = memo((props: ControlButtonProps) => (
  <Button onClick={props.onClick}>{props.label}</Button>
));

interface DateControllerProps {
  setDate: Dispatch<SetStateAction<MomentRange>>;
  date: MomentRange;
  display: Display;
}

export const DateController = memo((props: DateControllerProps) => (
  <>
    <ControlButton
      onClick={() =>
        props.setDate((date) => moment(date.subtract(1, props.display)))
      }
      label={"<"}
    />
    <ControlButton onClick={() => props.setDate(moment())} label={"Today"} />
    <ControlButton
      onClick={() =>
        props.setDate((date) => moment(date.add(1, props.display)))
      }
      label={">"}
    />
  </>
));

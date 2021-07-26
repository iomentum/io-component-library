import React, {
  memo,
  MouseEventHandler,
  useCallback,
  useContext,
  useRef,
} from "react";
import { Button } from "@material-ui/core";
import { CalendarContext } from "../../contexts/CalendarContext";
import { extendedMoment } from "../../utils";

interface ControlButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const ControlButton = (props: ControlButtonProps) => (
  <Button onClick={props.onClick}>{props.label}</Button>
);

export const DateController = () => {
  const { display, setDate } = useContext(CalendarContext);

  const handleSubstractButton = useCallback(
    () => setDate((date) => extendedMoment(date.subtract(1, display))),
    [setDate, display]
  );

  const handleTodayButton = useCallback(() => setDate(() => extendedMoment()), [
    setDate,
  ]);

  const handleAddButton = useCallback(
    () => setDate((date) => extendedMoment(date.add(1, display))),
    [setDate, display]
  );

  return (
    <>
      <ControlButton onClick={handleSubstractButton} label={"<"} />
      <ControlButton onClick={handleTodayButton} label={"Today"} />
      <ControlButton onClick={handleAddButton} label={">"} />
    </>
  );
};

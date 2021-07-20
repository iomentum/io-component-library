import React, { MouseEventHandler, useContext } from "react";
import { Button } from "@material-ui/core";
import { CalendarContext } from "../../contexts/CalendarContext";
import { extendedMoment } from "../../utils";

interface ControlButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ControlButton = (props: ControlButtonProps) => (
  <Button onClick={props.onClick}>{props.label}</Button>
);

export const DateController = () => {
  const { display, setDate } = useContext(CalendarContext);

  return (
    <>
      <ControlButton
        onClick={() =>
          setDate((date) => extendedMoment(date.subtract(1, display)))
        }
        label={"<"}
      />
      <ControlButton
        onClick={() => setDate(extendedMoment())}
        label={"Today"}
      />
      <ControlButton
        onClick={() => setDate((date) => extendedMoment(date.add(1, display)))}
        label={">"}
      />
    </>
  );
};

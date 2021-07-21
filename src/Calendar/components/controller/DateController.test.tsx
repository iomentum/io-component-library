/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { CalendarContext } from "../../contexts/CalendarContext";
import { Display } from "../../utils";
import { ControlButton, DateController } from "./DateController";

describe("ControlButton component", () => {
  it("should display the label", () => {
    render(<ControlButton label="test" onClick={() => {}} />);

    expect(screen.getByText("test")).toBeInTheDocument;
  });

  it("should handle a click", () => {
    const handleOnClick = jest.fn();
    render(<ControlButton label="" onClick={handleOnClick} />);

    screen.getByRole("button").click();

    expect(handleOnClick.mock.calls.length).toEqual(1);
  });
});

const dateControllerMock = (component, { providerProps, ...renderOptions }) =>
  render(
    <CalendarContext.Provider value={providerProps}>
      {component}
    </CalendarContext.Provider>,
    renderOptions
  );

describe("DateController component", () => {
  it("should have 3 ControlButtons", () => {
    const providerProps = {
      display: Display,
      setDate: jest.fn(),
    };
    dateControllerMock(<DateController />, { providerProps });

    expect(screen.getAllByRole("button").length).toEqual(3);
  });

  it("each buttons should trigger a setDate on click", () => {
    const providerProps = {
      display: Display,
      setDate: jest.fn(),
    };
    dateControllerMock(<DateController />, { providerProps });

    screen.getAllByRole("button").forEach((button) => button.click());

    expect(providerProps.setDate.mock.calls.length).toEqual(3);
  });
});

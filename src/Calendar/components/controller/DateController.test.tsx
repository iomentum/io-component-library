/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { CalendarContext } from "../../contexts/CalendarContext";
import { Display } from "../../utils";
import { ControlButton, DateController } from "./DateController";

const calendarContextMock = (component, { providerProps, ...renderOptions }) =>
  render(
    <CalendarContext.Provider value={providerProps}>
      {component}
    </CalendarContext.Provider>,
    renderOptions
  );

describe("ControlButton component", () => {
  describe("@snapshot", () => {
    it("should match with previous ControlButton", () => {
      const { asFragment } = render(
        <ControlButton label="test" onClick={() => {}} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("@event", () => {
    it("should handle a click", () => {
      const handleOnClick = jest.fn();
      render(<ControlButton label="" onClick={handleOnClick} />);

      screen.getByRole("button").click();

      expect(handleOnClick.mock.calls.length).toEqual(1);
    });
  });
});

describe("DateController component", () => {
  describe("@snapshot", () => {
    it("should match with previous DateController", () => {
      const providerProps = {
        display: Display,
        setDate: jest.fn(),
      };
      const { asFragment } = calendarContextMock(<DateController />, {
        providerProps,
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("@event", () => {
    it("each buttons should trigger a setDate on click", () => {
      const providerProps = {
        display: Display,
        setDate: jest.fn(),
      };
      calendarContextMock(<DateController />, { providerProps });

      screen.getAllByRole("button").forEach((button) => button.click());

      expect(providerProps.setDate.mock.calls.length).toEqual(3);
    });
  });
});

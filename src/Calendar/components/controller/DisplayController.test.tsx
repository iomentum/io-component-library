/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { CalendarContext } from "../../contexts/CalendarContext";
import { Display } from "../../utils";
import { DisplayCheckbox, DisplayController } from "./DisplayController";

const calendarContextMock = (component, { providerProps, ...renderOptions }) =>
  render(
    <CalendarContext.Provider value={providerProps}>
      {component}
    </CalendarContext.Provider>,
    renderOptions
  );

describe("DisplayCheckbox component", () => {
  describe("@static", () => {
    it("should display the Week checkbox", () => {
      const providerProps = {
        display: Display,
        setDisplay: jest.fn(),
      };
      calendarContextMock(<DisplayCheckbox currentKey={Display.Week} />, {
        providerProps,
      });

      const displayCheckbox = screen.getByTestId("formDisplayCheckbox-week");
      expect(displayCheckbox).toBeInTheDocument;

      const displayCheckboxLabel = screen.getByText("Week");
      expect(displayCheckboxLabel).toBeInTheDocument;

      const inputDisplayCheckbox = screen.getByRole("checkbox");
      expect(inputDisplayCheckbox).toHaveProperty("checked", false);
    });

    it("should display the Day checkbox", () => {
      const providerProps = {
        display: Display,
        setDisplay: jest.fn(),
      };
      calendarContextMock(<DisplayCheckbox currentKey={Display.Day} />, {
        providerProps,
      });

      const formDisplayCheckbox = screen.getByTestId("formDisplayCheckbox-day");
      expect(formDisplayCheckbox).toBeInTheDocument;

      const displayCheckboxLabel = screen.getByText("Day");
      expect(displayCheckboxLabel).toBeInTheDocument;

      const inputDisplayCheckbox = screen.getByRole("checkbox");
      expect(inputDisplayCheckbox).toHaveProperty("checked", false);
    });
  });

  describe("@event", () => {
    it("the Week checkbox should trigger a setDisplay on click", () => {
      const providerProps = {
        display: Display,
        setDisplay: jest.fn(),
      };
      calendarContextMock(<DisplayCheckbox currentKey={Display.Week} />, {
        providerProps,
      });

      const inputDisplayCheckbox = screen.getByRole("checkbox");
      inputDisplayCheckbox.click();
      expect(providerProps.setDisplay.mock.calls.length).toEqual(1);
    });

    it("the Day checkbox should trigger a setDisplay on click", () => {
      const providerProps = {
        display: Display,
        setDisplay: jest.fn(),
      };
      calendarContextMock(<DisplayCheckbox currentKey={Display.Day} />, {
        providerProps,
      });

      const inputDisplayCheckbox = screen.getByRole("checkbox");
      inputDisplayCheckbox.click();
      expect(providerProps.setDisplay.mock.calls.length).toEqual(1);
    });
  });
});

describe("DisplayController component", () => {
  describe("@static", () => {
    it("should have 2 DisplayCheckbox", () => {
      const providerProps = {
        display: Display,
        setDisplay: jest.fn(),
      };
      calendarContextMock(<DisplayController />, {
        providerProps,
      });

      const displayCheckboxDay = screen.getByTestId("formDisplayCheckbox-week");
      expect(displayCheckboxDay).toBeInTheDocument;

      const displayCheckboxWeek = screen.getByTestId("formDisplayCheckbox-week");
      expect(displayCheckboxWeek).toBeInTheDocument;
    });
  });
});

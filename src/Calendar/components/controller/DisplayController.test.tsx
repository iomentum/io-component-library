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
  describe("@snapshot", () => {
    it("should match with previous Week checkbox", () => {
      const providerProps = {
        display: Display,
        setDisplay: jest.fn(),
      };
      const { asFragment } = calendarContextMock(
        <DisplayCheckbox currentKey={Display.Week} />,
        {
          providerProps,
        }
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it("should match with previous Day checkbox", () => {
      const providerProps = {
        display: Display,
        setDisplay: jest.fn(),
      };
      const { asFragment } = calendarContextMock(
        <DisplayCheckbox currentKey={Display.Day} />,
        {
          providerProps,
        }
      );

      expect(asFragment()).toMatchSnapshot();
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
  describe("@snapshot", () => {
    it("should match with previous DisplayCheckbox", () => {
      const providerProps = {
        display: Display,
        setDisplay: jest.fn(),
      };
      const { asFragment } = calendarContextMock(<DisplayController />, {
        providerProps,
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
